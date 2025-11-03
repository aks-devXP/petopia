const router = require('express').Router();

// ------- ALL the middlewares-------
const {validateNGO} = require("../Middlewares/ngo");

// ------- ALL the controllers-------
//  NGO related controllers
const {createNGO,updateNGO,getAllNGOs,getUniqueFieldValues,deleteNGO} = require("../Controllers/NGO/ngo");
const TokenValidator = require('../Middlewares/TokenValidator');



// ***************NGO ROUTES******************
// ----- Create NGO ------
//  - Returns : data in ngo object
router.post('/Ncreate' ,TokenValidator,validateNGO, createNGO);


// ----- Get all NGOs ------
//  * Query params supported:
//  *  - page (default 1), limit (default 10)
//  *  - sort (e.g., "-created_at", "name")
//  *  - q (text search on name/description/founder if you create a text index)
//  *  - city, state, is_verified, established_in (exact matches)
router.get('/Nall',getAllNGOs);

// ----- Get NGO by field ------
/**
 * Get single or multiple NGOs by a field.
 * Example:
 *   /api/ngos/by-field?field=email&value=abc@ngo.org
 *   /api/ngos/by-field?field=city&value=Mumbai
 *
 * Only allow whitelisted fields to prevent arbitrary querying.
 * Allowed Query Fields:
      '_id',
      'name',
      'email',
      'contact_no',
      'founder',
      'city',
      'state',
      'website',
      'is_verified',
      'established_in'
 */
router.get('/Nby-field',getAllNGOs);

// Expects 
// fields = state,city
/*
returns {
  "success": true,
  "message": "Unique field values fetched successfully",
  "data": {
    "state": ["California", "Texas", "New York"],
    "city": ["Los Angeles", "Houston", "New York City"]
  }
}
*/ 
router.get('/Nunique-categories', getUniqueFieldValues)

router.put("/Nupdate/:id", TokenValidator,updateNGO)
// ------ Delete NGO by ID ------
router.delete('/Ndelete/:id',TokenValidator,deleteNGO);



// ***************CAMPAIGN ROUTES******************
//-----campaign related middlewares
const {validateCampaign} = require('../Middlewares/ngo')
// //-----campaign related controllers
const Campaign = require('../Controllers/NGO/campaign');


// ------------Create Campaign
// Expects a property Campaign Inside the requset-body
//  Returns {success, message, campaign} with status 200
router.post('/Cmcreate', TokenValidator,validateCampaign,Campaign.createCampaign);


// ------------Get All Campaigns 
//  Expects the following as query
// page: Page Number
// limit : Number of Campaigns to be shown over a page
router.get('/Cmall',Campaign.getCampaign);

// -------------Get Campaign By Category
// Expects the following as query
// page
// limit
// city
// state
// m_id: organizer_id
// sort : By default by created_at field in descending order
//        pass the sort value as "-parameter" if want to sort in descending order otherwise as "parameter"
// only one of city and state could be passed it will work fine
/*
Returns:
     success: true,
     message: 'Campaigns fetched successfully',
     data: campaigns,

*/  
router.get('/Cmby-field',Campaign.getCampaign);


// -------------Get Campaign By Id
//  Returns 
/*
     success : true,
     message : 'Campaign fetched successfully',
     data    : campaign
 */
router.get('/Cmby-id/:id',Campaign.getCampaignById);

// ---------------Get Total Page Count
/*
Expects the following in the query:
 * - page, limit
 * - city, state
returns :
     success: true,
     message: "Successfully counted total number of pages",
     totalPages 
*/
router.get('Cmby-id',Campaign.getCampaignById);


/* Get Unique Categories
* /api/ngo/Cm-category?fields=state,city,...(all other fields mentioned in the db)
* returns:
     successs:true,
     message: "Categories Fetched Successfully",
     data: result
*/ 
router.get("/Cm-category", Campaign.getCategories);
// ------------Update a Campaign
// Expects a property Campaign Inside the requset-body
router.put('/Cmupdate/:id',validateCampaign,Campaign.updateCampaign);

// -------------Delete a Campaign
router.delete('/Cmdelete/:id',TokenValidator,Campaign.deleteCampaign);

module.exports = router;





