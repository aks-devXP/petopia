const router = require('express').Router();
const { ValidateAdoptionPet } = require('../Middlewares/adoptionPet');
const { UserValidation } = require('../Middlewares/user');
const { createAdoptionPet, getPublicPets } = require('../Controllers/adoption');

router.post('/add', UserValidation, ValidateAdoptionPet, createAdoptionPet);
router.get('/public', getPublicPets);

module.exports = router;

