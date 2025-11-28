const VetModel = require('../Models/VetDB');
const {
  Types: { ObjectId },
} = require('mongoose');
const { Int32 } = require('bson');
require('dotenv').config();

const {
  maskFor,
  facilitiesFromMask,
  VET_FACILITY_BITS,
} = require('../scripts/bitmask');


const normalizedTimings = require('../scripts/normalizeTimings');
/* -------------------- helpers -------------------- */
function parseFacilitiesQuery(q) {
  // supports: ?facilities=teleconsult,pharmacy
  if (!q) return [];
  return String(q)
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

function buildFilter({ facilities, city, name, mode = 'any' }) {
  const filter = { verified: true };

  if (city) {
    filter.city = { $regex: city, $options: 'i' };
  }

  if (name) {
    // uses text index on name
    filter.$text = { $search: name };
  }

  const facArr = parseFacilitiesQuery(facilities);
  if (facArr.length) {
    const maskNumber = Number(maskFor(facArr, VET_FACILITY_BITS));
    filter.facMask =
      mode === 'all'
        ? { $bitsAllSet: maskNumber }
        : { $bitsAnySet: maskNumber };
  }

  return filter;
}

// NEW: normalize timings to [{start,end}] for both new & legacy formats
// function normalizeTimings(timings) {
//   if (!timings) return [];
//   if (!Array.isArray(timings)) return [];

//   // Legacy: [["08:00 AM","10:00 AM"],["12:00 PM","2:00 PM"]]
//   if (Array.isArray(timings[0])) {
//     return timings
//       .filter((slot) => Array.isArray(slot) && slot.length >= 2)
//       .map(([start, end]) => ({ start, end }));
//   }

//   // Already in new shape: [{start,end}, ...]
//   if (typeof timings[0] === 'object' && timings[0] !== null) {
//     return timings.map((s) => ({
//       start: s.start,
//       end: s.end,
//     }));
//   }

//   return [];
// }

// NEW: normalize vet doc → API-safe object (experience/gallery/services etc.)
function toPublicVet(doc) {
  const obj = doc.toObject();

  // derive facilities array from facMask
  obj.facilities = facilitiesFromMask(obj.facMask ?? 0, VET_FACILITY_BITS);
  delete obj.facMask;

  // normalize gallery vs old image field
  if (!obj.gallery || obj.gallery.length === 0) {
    if (Array.isArray(obj.image) && obj.image.length) {
      obj.gallery = obj.image;
    } else {
      obj.gallery = [];
    }
  }
  delete obj.image;

  // ensure languages, approach, achievements, testimonials, addons exist as arrays
  if (!Array.isArray(obj.languages)) obj.languages = [];
  if (!Array.isArray(obj.approach)) obj.approach = [];
  if (!Array.isArray(obj.achievements)) obj.achievements = [];
  // if (!Array.isArray(obj.testimonials)) obj.testimonials = [];
  if (!Array.isArray(obj.addons)) obj.addons = [];


  return obj;
}

/* -------------------- controllers -------------------- */

const getAllVets = async (req, res) => {
  try {
    const { facilities, city, name, mode } = req.query;

    const filter = buildFilter({ facilities, city, name, mode });

    const vets = await VetModel.find(filter, { password: 0 ,docs:0}).sort({
      createdAt: -1,
    });

    const data = vets.map((v) => toPublicVet(v));

    res.status(200).json({ message: 'All vets', success: true, data });
  } catch (error) {
    console.error('getAllVets error:', error);
    res
      .status(500)
      .json({ message: 'Internal server error', success: false });
  }
};

const vetExists = async (id) => {
  try {
    if (!ObjectId.isValid(id)) return false;
    const v = await VetModel.findById(id).select({ _id: 1 });
    return !!v;
  } catch {
    return false;
  }
};

/*
  verified field is NOT taken from client; default stays false in schema.
*/
const createVet = async (req, res) => {
  try {
    const raw = req.body?.vet ? req.body.vet : req.body || {};

    const {
      name,
      email,
      phone,
      address,
      city,
      state,
      zip,
      about,
      rating,
      profilePic,
      locality,
      // new schema fields:
      experience,
      gallery,
      image, // legacy
      languages,
      price,
      currency,
      approach,
      achievements,
      testimonials,
      addons,
      timings,
      facilities = [],
      // any other fields we want to allow can live in rest:
      ...rest
    } = raw;

    // unique email guard
    const existing = await VetModel.findOne({ email });
    if (existing) {
      return res
        .status(400)
        .json({ message: 'Vet already exists', success: false });
    }

    // password from body is required (rest.password)
    const bcrypt = require('bcrypt');
    const saltRounds = Number(process.env.Salt_Rounds) || 12;
    const password = await bcrypt.hash(rest.password, saltRounds);

    // bitmask for facilities
    const facMask = new Int32(
      Number(maskFor(facilities, VET_FACILITY_BITS))
    );

    // normalize timings shape
    const normalizedTimings = normalizeTimings(timings);


    // normalize gallery vs image
    const galleryFinal =
      Array.isArray(gallery) && gallery.length
        ? gallery
        : Array.isArray(image)
        ? image
        : [];

    const newVet = new VetModel({
      type: 'vet',
      name,
      email,
      phone,
      address,
      city,
      state,
      zip,
      about,
      rating,
      profilePic,
      locality,
      experience,
      gallery: galleryFinal,
      languages,
      price,
      currency,
      approach,
      achievements,
      testimonials,
      addons,
      timings: normalizedTimings,
      facMask,
      ...rest,
      password,
    });

    await newVet.save();

    const out = toPublicVet(newVet);

    res
      .status(201)
      .json({ message: 'Vet created', success: true, data: out });
  } catch (error) {
    console.error('Error creating vet:', error);
    res
      .status(500)
      .json({ message: 'Internal server error', success: false });
  }
};

const updateVet = async (req, res) => {
  try {
    // const id = req.params.id || req.verified?.id;
    const id = req.verified?.id;
    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ message: 'Invalid ID format', success: false });
    }

    const raw = req.body?.vet ? req.body.vet : req.body || {};

    // Whitelist allowed updatable fields (NO password / verified / facMask from client)
    const ALLOWED = new Set([
      'name',
      'email',
      'phone',
      'address',
      'city',
      'state',
      'zip',
      'about',
      'experience', // NEW
      'rating',
      'ratingCount', // NEW
      'profilePic',
      'gallery', // NEW
      'image', // legacy
      'locality',
      'timings',
      'specialization',
      'facilities',
      'docs',
      'languages', // NEW
      'price', // NEW
      'currency', // NEW
      'approach', // NEW
      'achievements', // NEW
      'testimonials', // NEW
      'addons', // NEW
    ]);

    const update = {};
    for (const [k, v] of Object.entries(raw)) {
      if (ALLOWED.has(k)) update[k] = v;
    }

    // NEVER let password through
    if ('password' in update) delete update.password;
    if ('verified' in update) delete update.verified;
    if ('facMask' in update) delete update.facMask;


    // normalize gallery vs legacy image
    if (Array.isArray(update.gallery) && update.gallery.length) {
      // ok, use gallery as is
    } else if (Array.isArray(update.image)) {
      update.gallery = update.image;
    }
    delete update.image;

    // normalize timings shape if present
    if (update.timings) {
      update.timings = normalizeTimings(update.timings);
    }

    // bitmask translation for facilities (allow clearing with [])
    if (Array.isArray(update.facilities)) {
      update.facMask = new Int32(
        Number(maskFor(update.facilities, VET_FACILITY_BITS))
      );
      delete update.facilities;
    }

    const doc = await VetModel.findByIdAndUpdate(
      id,
      { $set: update },
      {
        new: true,
        runValidators: true,
        context: 'query',
        projection: { password: 0 },
      }
    );

    if (!doc) {
      return res
        .status(404)
        .json({ message: 'Vet not found', success: false });
    }

    const out = toPublicVet(doc);

    return res.status(200).json({
      message: 'Updated profile successfully',
      success: true,
      data: out,
    });
  } catch (error) {
    console.error('updateVet error:', error);
    return res.status(500).json({
      message: error?.message || 'Internal server error',
      success: false,
    });
  }
};

const getVet = async (req, res) => {
  try {
    const id = req.params.id || req.verified?.id;
    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ message: 'Invalid ID format', success: false });
    }

    const vet = await VetModel.findById(id, { password: 0, docs:0 });
    if (!vet) {
      return res
        .status(404)
        .json({ message: 'Vet not found', success: false });
    }

    const out = toPublicVet(vet);

    res.status(200).json({ message: 'Vet found', success: true, data: out });
  } catch (error) {
    console.error('getVet error:', error);
    res
      .status(500)
      .json({ message: 'Internal server error', success: false });
  }
};

const getVetByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const vet = await VetModel.findOne({ email }, { password: 0 });
    if (!vet) {
      return res
        .status(404)
        .json({ message: 'Vet not found', success: false });
    }

    const out = toPublicVet(vet);

    res
      .status(200)
      .json({ message: 'Vet found', success: true, data: out });
  } catch (error) {
    console.error('getVetByEmail error:', error);
    res
      .status(500)
      .json({ message: 'Internal server error', success: false });
  }
};

const getVetCategories = async (req, res) => {
  try {
    if (!VET_FACILITY_BITS) {
      throw new Error('Not Able To Procure Vet Categories');
    }
    const categories = Object.keys(VET_FACILITY_BITS);

    res.status(200).json({
      message: 'Successfully Fetched Vet Categories',
      data: categories,
      success: true,
    });
  } catch (error) {
    console.error('getVetCategories error:', error);
    res.status(500).json({
      message: error.message || 'Internal server error',
      success: false,
    });
  }
};

const getProfile = async (req,res)=>{
  try {
    const id = req.verified.id;
    
    const vet = await VetModel.findById(id).select('-password -__v -createdAt -updatedAt');
    // other way I could have written it
    // .select({
    // password:0, __v:0
    // })
    if(!vet){
      res.status(404).json({
        message:"User doesn't exist.",
        success:false,
        data:{},
      })
    }
    const data = toPublicVet(vet);
    res.status(200).json({
      success:true,
      data,
      message:"Successfully fetched Profile"

    })
  } catch (error) {
    console.log("Profile Controller",error);
    res.status(500).json({
      message:error.message,
      success:false,
      data:[]
    })
  }
}

module.exports = {
  getAllVets,
  createVet,
  getVet,
  getVetByEmail,
  vetExists,
  updateVet,
  getVetCategories,
  getProfile,
};
