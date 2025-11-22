// controllers/GroomerController.js
const Groomer = require('../Models/GroomerDB');
const {
  Types: { ObjectId },
} = require('mongoose');
const { Int32 } = require('bson');
const bcrypt = require('bcrypt');
require('dotenv').config();
const normalizeTimings = require('../scripts/normalizeTimings');
const {
  maskFor,
  facilitiesFromMask,
  GROOMER_FACILITY_BITS,
} = require('../scripts/bitmask');


// ?facilities=grooming,home_service -> ["grooming","home_service"]
function parseFacilitiesQuery(q) {
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
    // assuming text index on name (and maybe other fields)
    filter.$text = { $search: name };
  }

  const facArr = parseFacilitiesQuery(facilities);
  if (facArr.length) {
    const maskNumber = Number(maskFor(facArr, GROOMER_FACILITY_BITS));

    filter.facMask =
      mode === 'all'
        ? { $bitsAllSet: maskNumber }
        : { $bitsAnySet: maskNumber };
  }

  return filter;
}

/* ------------ create ------------- */

/**
 * create – create a groomer document
 * Expects body shaped like the middleware validated payload, e.g.:
 * {
 *   name, email, phone, address, city, state, locality, zip,
 *   about, experience, rating?, ratingCount?, profilePic?, gallery?,
 *   languages?, timings: [["9:00 AM","12:00 PM"], ...],
 *   specialization, services?, facilities, approach?, achievements?,
 *   addons?, docs?, password
 * }
 */
const create = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      address,
      city,
      state,
      locality,
      zip,
      about,
      experience,
      rating,
      ratingCount,
      profilePic,
      gallery = [],
      languages = [],
      timings = [],
      specialization,
      services = [],
      facilities = [],
      approach = [],
      achievements = [],
      addons = [],
      docs = [],
      password: rawPassword,
    } = req.body || req.body.groomer || {};

    // unique email guard
    const existing = await Groomer.findOne({ email });
    if (existing) {
      return res
        .status(400)
        .json({ success: false, message: 'Groomer already exists' });
    }

    // hash password
    const saltRounds = Number(process.env.Salt_Rounds) || 12;
    const password = await bcrypt.hash(rawPassword, saltRounds);

    // facilities -> facMask
    const facMask = new Int32(Number(maskFor(facilities, GROOMER_FACILITY_BITS)));

    // timings normalization
    const normalizedTimings = normalizeTimings(timings);

    const doc = new Groomer({
      name,
      email,
      phone,
      address,
      city,
      state,
      locality,
      zip,
      about,
      experience,
      rating,
      ratingCount,
      profilePic,
      gallery,
      languages,
      timings: normalizedTimings,
      specialization,
      services,
      facMask,
      approach,
      achievements,
      addons,
      docs,
      password,
    });

    await doc.save();

    const out = doc.toObject();
    out.facilities = facilitiesFromMask(out.facMask ?? 0, GROOMER_FACILITY_BITS);
    delete out.facMask;
    delete out.password;

    return res.status(201).json({
      success: true,
      message: 'Groomer created successfully',
      data: out,
    });
  } catch (error) {
    console.error('create groomer error:', error);
    return res.status(500).json({
      success: false,
      message: error?.message || 'Internal server error',
    });
  }
};

/* ------------ getData (list with filters) ------------- */

/**
 * getData – list groomers with optional filters
 * Supports query params:
 *   ?city=Delhi
 *   &name=pet
 *   &facilities=grooming,home_service
 *   &mode=any|all   (default any)
 */
const getData = async (req, res) => {
  try {
    const { facilities, city, name, mode } = req.query || {};

    const filter = buildFilter({ facilities, city, name, mode });

    const groomers = await Groomer.find(filter, { password: 0 }).sort({
      createdAt: -1,
    });

    const data = groomers.map((g) => {
      const obj = g.toObject();
      obj.facilities = facilitiesFromMask(obj.facMask ?? 0, GROOMER_FACILITY_BITS);
      delete obj.facMask;
      return obj;
    });

    return res.status(200).json({
      success: true,
      message: 'Groomers fetched successfully',
      data,
    });
  } catch (error) {
    console.error('getData groomers error:', error);
    return res.status(500).json({
      success: false,
      message: error?.message || 'Internal server error',
    });
  }
};

/* ------------ getById ------------- */

const getById = async (req, res) => {
  try {
    const id = req.params.id || req.verified?.id;

    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid ID format' });
    }

    const doc = await Groomer.findById(id, { password: 0 });
    if (!doc) {
      return res
        .status(404)
        .json({ success: false, message: 'Groomer not found' });
    }

    const out = doc.toObject();
    out.facilities = facilitiesFromMask(out.facMask ?? 0, GROOMER_FACILITY_BITS);
    delete out.facMask;

    return res.status(200).json({
      success: true,
      message: 'Groomer fetched successfully',
      data: out,
    });
  } catch (error) {
    console.error('getById groomer error:', error);
    return res.status(500).json({
      success: false,
      message: error?.message || 'Internal server error',
    });
  }
};

/* ------------ deleteById ------------- */

const deleteById = async (req, res) => {
  try {
    const id = req.params.id|| req.verified?.id;

    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid ID format' });
    }

    const doc = await Groomer.findByIdAndDelete(id);
    if (!doc) {
      return res
        .status(404)
        .json({ success: false, message: 'Groomer not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Groomer deleted successfully',
    });
  } catch (error) {
    console.error('deleteById groomer error:', error);
    return res.status(500).json({
      success: false,
      message: error?.message || 'Internal server error',
    });
  }
};

/* ------------ getCategories (facilities list) ------------- */

const getCategories = async (req, res) => {
  try {
    if (!GROOMER_FACILITY_BITS) {
      throw new Error('Groomer facility config not available');
    }

    const categories = Object.keys(GROOMER_FACILITY_BITS);

    return res.status(200).json({
      success: true,
      message: 'Successfully fetched groomer categories',
      data: categories,
    });
  } catch (error) {
    console.error('getCategories groomer error:', error);
    return res.status(500).json({
      success: false,
      message: error?.message || 'Unable to fetch groomer categories',
    });
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id || req.verified?.id;

    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid ID format' });
    }

    // Accept flat body or { groomer: {...} }
    const raw = req.body?.groomer ? req.body.groomer : (req.body || {});

    // Only allow these fields to be updated – no password/verified from client
    const ALLOWED = new Set([
      'name',
      'email',
      'phone',
      'address',
      'city',
      'state',
      'locality',
      'zip',
      'about',
      'experience',
      'rating',
      'ratingCount',
      'profilePic',
      'gallery',
      'languages',
      'timings',
      'specialization',
      'services',
      'facilities',
      'approach',
      'achievements',
      'addons',
      'docs',
    ]);

    const updateDoc = {};
    for (const [key, value] of Object.entries(raw)) {
      if (ALLOWED.has(key)) {
        updateDoc[key] = value;
      }
    }

    // Make extra sure no password sneaks in
    if ('password' in updateDoc) {
      delete updateDoc.password;
    }

    // Facilities -> facMask (and remove facilities from stored doc)
    if (Array.isArray(updateDoc.facilities)) {
      updateDoc.facMask = new Int32(
        Number(maskFor(updateDoc.facilities, GROOMER_FACILITY_BITS))
      );
      delete updateDoc.facilities;
    }

    // Timings normalization if provided as [["start","end"], ...]
    if (Array.isArray(updateDoc.timings)) {
      updateDoc.timings = normalizeTimings(updateDoc.timings);
    }

    const updated = await Groomer.findByIdAndUpdate(
      id,
      { $set: updateDoc },
      {
        new: true,
        runValidators: true,
        context: 'query',
        projection: { password: 0 }, // never return password
      }
    );

    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: 'Groomer not found' });
    }

    const out = updated.toObject();
    out.facilities = facilitiesFromMask(
      out.facMask ?? 0,
      GROOMER_FACILITY_BITS
    );
    delete out.facMask;

    return res.status(200).json({
      success: true,
      message: 'Groomer updated successfully',
      data: out,
    });
  } catch (error) {
    console.error('update groomer error:', error);
    return res.status(500).json({
      success: false,
      message: error?.message || 'Internal server error',
    });
  }
};


module.exports = {
  create,
  getData,
  getById,
  deleteById,
  getCategories,
  update,
};
