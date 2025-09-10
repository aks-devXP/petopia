const router = require('express').Router();
const {getPets,
  getPetCount,
  getPetByID,
  getAllPetCategories}= require('../Controllers/guide');


// View Calls For Users
router.get("/total-count",getPetCount);
router.get("/pets/:start",getPets); // Limiting the number of pets returned for pagination upto 20
router.get("/all-categories", getAllPetCategories);
router.get("/get-pet/:id",getPetByID);

// Add,Update And Delete Calls For Admins






module.exports = router;
