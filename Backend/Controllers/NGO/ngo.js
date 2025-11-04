// controllers/ngo.controller.js
const mongoose = require('../../Models/SetDB');
const ObjectId = require('mongoose').Types.ObjectId;
const NGO = require('../../Models/NGO/ngoDB'); 
const bcrypt = require('bcrypt');
const generateToken = require('../../scripts/TokenGenerator');
require('dotenv').config();
// const {ObjectId} = require('mongoose').Types;

// Utility: parse ints safely
const toInt = (v, def) => {
  const n = parseInt(v, 10);
  return Number.isFinite(n) && n > 0 ? n : def;
};

// -------------------- CREATE --------------------
exports.createNGO = async (req, res, next) => {
  try {
    // Extract payload from validated request body
    const payload = req.body.ngo ?? req.body;
    // Validate password presence
    if (!payload.password) {
      return res.status(400).json({
        success: false,
        message: 'Password is required',
      });
    }

    // Hash password before storing
    const saltRounds = parseInt(process.env.SALT_ROUNDS, 10) || 10;
    const hashedPassword = await bcrypt.hash(payload.password, saltRounds);
    payload.password = hashedPassword;
    
    payload.is_verified=false;
    // Create NGO in database
    const newNGO = await NGO.create(payload);

    // Prepare token payload
    const tokenPayload = {
      id: newNGO._id,
      name: newNGO.name,
      email: newNGO.email,
      type: 'ngo',
    };

    // Generate authentication token
    const token = generateToken(tokenPayload);

    // Remove password from response
    // const ngoResponse = newNGO.toObject();
    // delete ngoResponse.password;

    // Send success response with token
    return res.status(201).json({
      success: true,
      message: 'NGO profile created successfully',
      data: {
        token,
        user_name: newNGO.name,
        logo: newNGO.logo,
      },
    });
    
  } catch (error) {
    return handleCreateNGOError(error, res);
  }
};
/**
 * Handles errors that occur during NGO creation
 * 
 * @param {Error} error - The error object
 * @param {Object} res - Express response object
 * @returns {Object} JSON error response
 */
const handleCreateNGOError = (error, res) => {
  // Handle MongoDB duplicate key errors (E11000)
  if (error.code === 11000) {
    const duplicateFields = Object.keys(error.keyValue || {});
    const fieldsList = duplicateFields.join(', ');
    
    return res.status(409).json({
      success: false,
      message: `An NGO with this ${fieldsList} already exists`,
      duplicateFields: error.keyValue,
    });
  }

  // Handle Mongoose validation errors
  if (error.name === 'ValidationError') {
    const validationErrors = Object.values(error.errors).map(err => ({
      field: err.path,
      message: err.message,
    }));

    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: validationErrors,
    });
  }

  // Handle token generation errors
  if (error.message && error.message.includes('token')) {
    console.error('Token generation error:', error);
    return res.status(500).json({
      success: false,
      message: 'NGO created but failed to generate authentication token',
    });
  }

  // Log unexpected errors
  console.error('createNGO error:', {
    message: error.message,
    stack: error.stack,
    name: error.name,
  });

  // Generic error response
  return res.status(500).json({
    success: false,
    message: 'Failed to create NGO profile',
    ...(process.env.NODE_ENV === 'development' && { error: error.message }),
  });
};

// -------------------- DELETE (by :id) --------------------
exports.deleteNGO = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ success: false, message: 'Invalid NGO id' });

    const deleted = await NGO.findByIdAndDelete(id);
    if (!deleted)
      return res.status(404).json({ success: false, message: 'NGO not found' });

    return res.status(200).json({
      success: true,
      message: 'NGO deleted successfully',
      ngo: deleted,
    });
  } catch (err) {
    console.error('deleteNGO error:', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// -------------------- UPDATE (by :id) --------------------
exports.updateNGO = async (req, res) => {
  try {
    const { id } = req.params || req.verified;
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ success: false, message: 'Invalid NGO id' });

    // Accept validated payload (if Joi middleware used)
    const payload = req.body.ngo ?? req.body;

    // Remove the password field if it exists in the payload
    if (payload.password) {
      delete payload.password;
    }

    // Maintain your "updated_last" audit field if present in schema
    payload.updated_last = new Date();

    const updated = await NGO.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true, // make mongoose apply schema validations
      context: 'query',
    });

    if (!updated)
      return res.status(404).json({ success: false, message: 'NGO not found' });

    const {password, ...update} = updated.toObject();

    return res.status(200).json({
      success: true,
      message: 'NGO updated successfully',
      ngo: update,
    });
  } catch (err) {
    if (err?.code === 11000) {
      const fields = Object.keys(err.keyValue || {}).join(', ');
      return res.status(409).json({
        success: false,
        message: `Duplicate value for unique field(s): ${fields}`,
        details: err.keyValue,
      });
    }
    console.error('updateNGO error:', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
// -------------------- GET ALL (filters + pagination + sort) --------------------
/**
 * Query params supported:
 *  - page (default 1), limit (default 10)
 *  - sort (e.g., "-created_at", "name")
 *  - q (text search on name/description/founder if you create a text index)
 *  - city, state, is_verified, established_in (exact matches)
 */
exports.getAllNGOs = async (req, res) => {
  try {
    const page  = toInt(req.query.page, 1);
    const limit = toInt(req.query.limit, 10);
    const skip  = (page - 1) * limit;

    const { sort = '-created_at', q, city, state, established_in } = req.query;
    const is_verified= true;

    const filter = {};

    // Optional free-text search (requires a text index on name/description/founder)
    // NGOSchema.index({ name: 'text', description: 'text', founder: 'text' });
    // if (q) {
    //   filter.$text = { $search: q };
    // }

    if (city) filter.city = city;
    if (state) filter.state = state;

    if (typeof is_verified !== 'undefined') {
      // accept "true"/"false" strings
      filter.is_verified = String(is_verified).toLowerCase() === 'true';
    }

    if (established_in) {
      const year = parseInt(established_in, 10);
      if (Number.isFinite(year)) filter.established_in = year;
    }

    // Execute
    const items  = await NGO.find(filter).sort(sort).skip(skip).limit(limit);

    const ngoData = items.map(ngo => {
      const { password, ...ngoObj } = ngo.toObject();
      return ngoObj;
    });

    return res.status(200).json({
      success: true,
      message: 'NGOs fetched successfully',
      data: ngoData,
    
    });
  } catch (err) {
    console.error('getAllNGOs error:', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

/**
 * Controller function to get all unique values for specified fields.
 * expects a string list of fields as comma separated string
 */
exports.getUniqueFieldValues = async (req, res) => {
  try {
    // Extract the fields to fetch unique values for
    const { fields } = req.query;

    if (!fields) {
      return res.status(400).json({
        success: false,
        message: 'Fields query parameter is required (e.g., fields=state,city)',
      });
    }

    // Split the fields into an array
    const fieldList = fields.split(',');

    // Prepare the result object
    const result = {};

    // Fetch unique values for each field
    for (const field of fieldList) {
      const uniqueValues = await NGO.distinct(field.trim());
      result[field.trim()] = uniqueValues;
    }

    // Return the unique values
    return res.status(200).json({
      success: true,
      message: 'Unique field values fetched successfully',
      data: result,
    });
  } catch (error) {
    console.error('Error fetching unique field values:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch unique field values',
      error: error.message,
    });
  }
};

exports.ngoExists = async(id)=>{
  try {
    const ngo = await NGO.findById(new ObjectId(id));
    // console.log(ngo)
    return ngo!==null;
  } catch (error) {
    // console.log(error)
    return false;
  }
}

/**
 * Controller function to calculate the total number of pages based on query filters.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
exports.getTotalPages = async (req, res) => {
  try {
    const { q, city, state, established_in, limit = 10 } = req.query;

    const filter = {};

    // Optional free-text search (requires a text index on name/description/founder)
    // if (q) {
    //   filter.$text = { $search: q };
    // }

    if (city) filter.city = city;
    if (state) filter.state = state;

    if (established_in) {
      const year = parseInt(established_in, 10);
      if (Number.isFinite(year)) filter.established_in = year;
    }

    // Count the total number of documents matching the filter
    const totalItems = await NGO.countDocuments(filter);

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalItems / limit);

    return res.status(200).json({
      success: true,
      message: 'Total pages calculated successfully',
      totalPages,
    });
  } catch (error) {
    console.error('Error calculating total pages:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to calculate total pages',
      error: error.message,
    });
  }
};