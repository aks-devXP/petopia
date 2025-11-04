// controllers/campaign.controller.js
const mongoose = require('../../Models/SetDB');
const Campaign = require('../../Models/NGO/CampaignDB'); 

// -------------------- CREATE --------------------
exports.createCampaign = async (req, res) => {
  try {
    // If you used Joi validator middleware, prefer req.body.campaign
    const payload = req.body.campaign ?? req.body;

    const newCampaign = await Campaign.create(payload);

    return res.status(201).json({
      success: true,
      message: 'Campaign created successfully',
      campaign: newCampaign,
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
    console.error('createCampaign error:', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// -------------------- GET ALL / GET (with filters) --------------------
/**
 * Query params supported:
 * - page, limit
 * - sort (e.g., -created_at, title)
 * - city, state
 * - category (comma separated)
 * - search (text search if text index exists)
 */
exports.getCampaign = async (req, res) => {
  try {
    const page  = parseInt(req.query.page, 10)  || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip  = (page - 1) * limit;

    const { sort = '-created_at', city, state, search, m_id } = req.query;

    const filter = {};
    if (city)  filter.city = city;
    if (state) filter.state = state;

    // filter by organizer (NGO) when m_id is provided
    if (m_id && /^[0-9a-fA-F]{24}$/.test(m_id)) {
      filter.organizer_id = new mongoose.Types.ObjectId(m_id);
    }

    // If you enable text index later:
    // if (search) filter.$text = { $search: search };

    // Fetch campaigns + populate NGO fields we want to expose
    const campaigns = await Campaign.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate('organizer_id', 'name email contact_no website'); // ref: 'NGO'

    // Shape output: remove organizer_id, flatten selected NGO fields onto each campaign
    const data = campaigns.map((doc) => {
      const obj = doc.toObject({ getters: true, virtuals: false });

      const org = obj.organizer_id || {};
      // add flat fields
      obj.name = org.name || null;
      obj.email = org.email || null;
      obj.contact_no = org.contact_no || null;
      obj.website = org.website || null;

      // remove organizer_id from element
      delete obj.organizer_id;

      return obj;
    });

    return res.status(200).json({
      success: true,
      message: 'Campaigns fetched successfully',
      data,
      // meta: { page, limit, count: await Campaign.countDocuments(filter) }
    });
  } catch (err) {
    console.error('getCampaign error:', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// -------------------  GET /api/campaigns/:id  -------------------
exports.getCampaignById = async (req, res) => {
  try {
    const { id } = req.params;                       // 1. read :id from URL

    /* 2. Validate the id so we don’t query MongoDB with an invalid ObjectId
          (saves one round-trip and avoids a cast error).                    */
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success : false,
        message : 'Invalid campaign id'
      });
    }

    /* 3. Query the database.  
          • If you need to join documents from a referenced collection
            (e.g. NGO info, user info) add .populate('fieldName')            */
    const campaign = await Campaign.findById(id /* .populate('ngo') */);

    /* 4. Handle not-found separately so the client gets a 404, not 200. */
    if (!campaign) {
      return res.status(404).json({
        success : false,
        message : 'Campaign not found'
      });
    }

    /* 5. Success response */
    return res.status(200).json({
      success : true,
      message : 'Campaign fetched successfully',
      data    : campaign
    });

  } catch (err) {
    console.error('getCampaignById error:', err);
    return res.status(500).json({
      success : false,
      message : 'Internal server error'
    });
  }
};


// -------------------- GET Page Count --------------------
/**
 * Query params supported:
 * - page, limit
 * - city, state
 */
exports.getTotalPageCount= async (req,res)=>{
  try {
    
    const { limit=10, city, state, search } = req.query;

    const filter = {};

    if (city) filter.city = city;
    if (state) filter.state = state;


    // Text search (if you created a text index on title/tagline/description)
    // if (search) {
    //   filter.$text = { $search: search };
    // }
    const [totalDocs] = await  Campaign.countDocuments(filter);

    const totalPages = Math.max(1,Math.ceil(totalDocs/limit));

  return res.status(200).json({
    success: true,
    message: "Successfully counted total number of pages",
    totalPages 
  })
  } 
  catch (error) {
    return res.status(500).json({success:false,message:"Something went wrong wile calculating number of pages",});
  }
}

// -------------------- GET CATEGORIES --------------------
/**
 * Returns a list of unique categories in all campaigns.

 */
exports.getCategories = async (req, res) => {
  try {
    const {fields} = req.query;
    if(!fields){
      return res.status(400).json({
        success: false,
        message: "Fields query parameter is required."
      });
    }
    const cate = fields.split(',');
    const result = {};
    for (const c of cate){
      const uniqueVal = await Campaign.distinct(c.trim());
      result[c.trim()]= uniqueVal;
  
    }
  
    return res.status(200).json({
      successs:true,
      message: "Categories Fetched Successfully",
      data: result
    });
  } 
  catch (error) {
    console.log("Error in Controller",error);
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
};

// -------------------- UPDATE --------------------
exports.updateCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ success: false, message: 'Invalid campaign id' });

    const payload = req.body.campaign ?? req.body;
    payload.updated_last = new Date();

    const updated = await Campaign.findByIdAndUpdate(id, payload, {
      new: true,
      // runValidators: true,
      // context: 'query',
    });

    if (!updated)
      return res.status(404).json({ success: false, message: 'Campaign not found' });

    return res.status(200).json({
      success: true,
      message: 'Campaign updated successfully',
      campaign: updated,
    });
  } catch (err) {
    console.error('updateCampaign error:', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// -------------------- DELETE --------------------
exports.deleteCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ success: false, message: 'Invalid campaign id' });

    const deleted = await Campaign.findByIdAndDelete(id);

    if (!deleted)
      return res.status(404).json({ success: false, message: 'Campaign not found' });

    return res.status(200).json({
      success: true,
      message: 'Campaign deleted successfully',
      campaign: deleted,
    });
  } catch (err) {
    console.error('deleteCampaign error:', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
