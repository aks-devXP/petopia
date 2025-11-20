const router = require('express').Router();
const {getAllVets,updateVet, getVet,createVet,getVetByEmail, getVetCategories} = require('../Controllers/vet');
const TokenValidator = require('../Middlewares/TokenValidator');
const { UserValidation } = require('../Middlewares/user');
const {VetValidation} = require('../Middlewares/vet');
router.get('/all-data',getAllVets);
router.get('/categories',getVetCategories);
router.get('/data/:id',getVet);
router.get('/update-vet',TokenValidator,updateVet)
router.get('/data-email/:email',TokenValidator,getVetByEmail);
router.post('/create-vet',VetValidation,createVet);

module.exports = router;