const router = require('express').Router();
const {getAllVets, getVet,createVet} = require('../Controllers/vet');
const {VetValidation} = require('../Middlewares/vet');
router.get('/all-data',getAllVets);
router.get('/data/:id',getVet);
router.post('/create-vet',VetValidation,createVet);

module.exports = router;