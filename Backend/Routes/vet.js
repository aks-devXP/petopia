const router = require('express').Router();
const {getAllVets, createVet} = require('../Controllers/vet');
const {VetValidation} = require('../Middlewares/vet');
router.get('/all-data',getAllVets);

router.post('/create-vet',VetValidation,createVet);

module.exports = router;