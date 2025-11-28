const Trainer = require('../Models/TrainerDB');
const {
  maskFor,
  facilitiesFromMask,
  TRAINER_FACILITY_BITS,
} = require('../scripts/bitmask');
const { Int32 } = require('bson');
const {
  Types: { ObjectId },
} = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const normalizeTimings = require('../scripts/normalizeTimings');
/**
 * Create a new trainer
 * Expects body as either:
 *  - { ...fields }
 *  - or { trainer: { ...fields } }
 *
 * Fields we care about (matching your new-style schema):
 *  name, email, phone, address, city, state, zip,
 *  profilePic, gallery, about, experience, rating,
 *  languages, timings, specialization,
 *  services, facilities, approach, achievements,
 *   addons, price, currency, password
 */
const createTrainer = async (req, res) => {
  try {
    const body = req.body?.trainer ? req.body.trainer : req.body || {};

    const {
      name,
      email,
      phone,
      address,
      city,
      state,
      zip,
      profilePic,
      gallery = [],
      about,
      experience,
      rating,
      languages = [],
      timings = [],
      specialization,
      services = [],
      facilities = [],
      approach = [],
      achievements = [],
      addons = [],
      price,
      currency,
      password,
      ...rest // any extra fields you might add later
    } = body;

    // 1) Unique email check
    const existingTrainer = await Trainer.findOne({ email });
    if (existingTrainer) {
      return res
        .status(400)
        .json({ message: 'Trainer already exists', success: false });
    }

    // 2) Hash password
    const saltRounds = Number(process.env.Salt_Rounds) || 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 3) Bitmask for facilities
    const facMask = new Int32(
      Number(maskFor(Array.isArray(facilities) ? facilities : [], TRAINER_FACILITY_BITS))
    );

    const normalizedTimings = normalizeTimings(timings);

    // 4) Create trainer doc
    const newTrainer = new Trainer({
      name,
      email,
      phone,
      address,
      city,
      state,
      zip,
      profilePic,
      gallery,
      about,
      experience,
      rating,
      languages,
      timings:normalizedTimings,
      specialization,
      services,
      facMask,
      approach,
      achievements,
      addons,
      price,
      currency,
      ...rest,
      password: hashedPassword,
    });

    await newTrainer.save();

    // 5) Prepare safe output (no password, decoded facilities)
    const out = newTrainer.toObject();
    out.facilities = facilitiesFromMask(out.facMask ?? 0, TRAINER_FACILITY_BITS);
    delete out.facMask;
    delete out.password;

    return res
      .status(201)
      .json({ message: 'Trainer created successfully', success: true, data: out });
  } catch (error) {
    console.error('Error creating trainer:', error);
    return res
      .status(500)
      .json({ message: 'Internal server error', success: false });
  }
};

/**
 * Get all trainers
 * (If you later want filters like vets, we can extend this similarly.)
 */
const getTrainer = async (req, res) => {
  try {
    const { city, name, facilities, mode = "any" } = req.query;

    // Build filter
    const filter = { verified: true };

    // --- CITY FILTER ---
    if (city) {
      filter.city = { $regex: city, $options: "i" };
    }

    // --- NAME FILTER (text search) ---
    if (name) {
      filter.$text = { $search: name };
    }

    // --- FACILITIES (bitmask filter) ---
    if (facilities) {
      const facArr = String(facilities)
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean);

      if (facArr.length > 0) {
        const maskNumber = Number(
          maskFor(facArr, TRAINER_FACILITY_BITS)
        );

        filter.facMask =
          mode === "all"
            ? { $bitsAllSet: maskNumber }
            : { $bitsAnySet: maskNumber };
      }
    }

    // --- DB QUERY ---
    const trainers = await Trainer.find(filter, { password: 0, docs:0 }).sort({
      createdAt: -1,
    });

    // --- DECODE facilities ---
    const data = trainers.map((t) => {
      const obj = t.toObject();
      obj.facilities = facilitiesFromMask(
        obj.facMask ?? 0,
        TRAINER_FACILITY_BITS
      );
      delete obj.facMask;
      return obj;
    });

    return res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    console.error("getTrainer error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};


const getTrainerById = async (req, res) => {
  try {
    const id = req.params.id || req.verified?.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid trainer ID format",
      });
    }

    const trainer = await Trainer.findById(id, { password: 0, docs:0 });

    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: "Trainer not found",
      });
    }

    const out = trainer.toObject();
    out.facilities = facilitiesFromMask(
      out.facMask ?? 0,
      TRAINER_FACILITY_BITS
    );
    delete out.facMask;

    return res.status(200).json({
      success: true,
      data: out,
    });
  } catch (error) {
    console.error("getTrainerById error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


/**
 * Update trainer by :id
 * Accepts body as { ...fields } or { trainer: { ...fields } }
 * Password is NEVER updated here.
 */
const updateTrainer = async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ message: 'Invalid trainer ID format', success: false });
    }

    const raw = req.body?.trainer ? req.body.trainer : req.body || {};

    // Only allow whitelisted fields to be updated
    const ALLOWED = new Set([
      'name',
      'email',
      'phone',
      'address',
      'city',
      'state',
      'zip',
      'profilePic',
      'gallery',
      'about',
      'experience',
      'rating',
      'languages',
      'timings',
      'specialization',
      'services',
      'approach',
      'achievements',
      'addons',
      'price',
      'currency',
      'facilities', // logical list, converted to facMask
    ]);

    const update = {};
    for (const [k, v] of Object.entries(raw)) {
      if (ALLOWED.has(k)) update[k] = v;
    }

    // Hard block password here even if someone sneaks it in
    if ('password' in update) delete update.password;

    // Facilities → facMask
    if (Array.isArray(update.facilities)) {
      update.facMask = new Int32(
        Number(maskFor(update.facilities, TRAINER_FACILITY_BITS))
      );
      delete update.facilities;
    }
    if('timings' in update ){
      update.timings = normalizeTimings(update.timings);
    }

    const doc = await Trainer.findByIdAndUpdate(
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
        .json({ message: 'Trainer not found', success: false });
    }

    const out = doc.toObject();
    out.facilities = facilitiesFromMask(out.facMask ?? 0, TRAINER_FACILITY_BITS);
    delete out.facMask;

    return res.status(200).json({
      message: 'Trainer updated successfully',
      success: true,
      data: out,
    });
  } catch (error) {
    console.error('Error updating trainer:', error);
    return res
      .status(500)
      .json({ message: 'Internal server error', success: false });
  }
};
const getTrainerCategories = async (req, res) => {
  try {
    if (!TRAINER_FACILITY_BITS) {
      throw new Error('Not Able To Procure Vet Categories');
    }
    const categories = Object.keys(TRAINER_FACILITY_BITS);

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

const deleteTrainer = async (req,res)=>{
  try {
    const {id}= req.params||req.verified?.id;
    if(!ObjectId.isValid(id)){
      return res.status(400).json({
        message:"Invalid Trainer ID format",
        success: false,
      })
    }

    const result = await Trainer.findByIdAndDelete(id);
    if(!result){
      return res.status(400).json({
        message:"Trainer not found",
        message: false
      })
    }
    return res.status(200).json(
      {
        message:"Trainer Deleted Successfully",
        success: true
      }
    )
  } catch (error) {
    console.log("deleteTrainer error:",error);
    return res.status(500).json({
      message:"Internal server error",
      success: false
    })
  }
}

const trainerExists = async (id) => {
  const exists = await Trainer.findById(id);
  return !!exists;
}

const getProfile = async(req,res)=>{
  try {
    const id = req.verified?.id;
    
    const train =await Trainer.findById(id,{
      password:0
    });
     if (!train) {
      return res.status(404).json({
        message: "Could not find your profile",
        success: false,
        data: {},
      });
    }

    const out = train.toObject();
    out.facilities = facilitiesFromMask(out.facMask ?? 0, TRAINER_FACILITY_BITS);
    delete out.facMask;

    return res.status(200).json({
      message: "Successfully fetched profile",
      success: true,
      data: out,
    });
  } catch (error) {
    // console.error("getProfile error:", error);
    return res.status(500).json({
      message: error?.message || "Could not find your profile",
      success: false,
      data: {},
    });
  }
}

module.exports = {
  createTrainer,
  getTrainer,
  updateTrainer,
  getTrainerById,
  getTrainerCategories,
  deleteTrainer,
  trainerExists,
  getProfile
};
