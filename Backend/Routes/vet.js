const router = require('express').Router();
const {getAllVets,updateVet, getVet,createVet,getVetByEmail, getVetCategories, getProfile} = require('../Controllers/vet');
const TokenValidator = require('../Middlewares/TokenValidator');
const { UserValidation } = require('../Middlewares/user');
const {VetValidation} = require('../Middlewares/vet');

const allowed_users = require("../Middlewares/allowedUsers");
router.get('/all-data',getAllVets);
router.get('/categories',getVetCategories);
router.get('/data/:id',getVet);
router.put('/update-vet',TokenValidator,allowed_users(["vet"]),VetValidation,updateVet)
router.get('/get-profile',TokenValidator,allowed_users(["vet","admin"]),getProfile);
router.get('/data-email/:email',TokenValidator,getVetByEmail);
router.post('/create-vet',VetValidation,createVet);

module.exports = router;