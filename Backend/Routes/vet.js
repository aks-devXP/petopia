const router = require('express').Router();
const {getAllVets, getVet,createVet,getVetByEmail} = require('../Controllers/vet');
const { UserValidation } = require('../Middlewares/user');
const {VetValidation} = require('../Middlewares/vet');
router.get('/all-data',getAllVets);
router.get('/data/:id',getVet);
router.get('/data-email/:email',UserValidation,getVetByEmail);
router.post('/create-vet',VetValidation,createVet);

module.exports = router;