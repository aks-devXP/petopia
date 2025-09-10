const router = require('express').Router();
const {ValidatePet} = require('../Middlewares/pet');
const {UserValidation} = require('../Middlewares/user');
const {createPet, getAllPets, updatePet, deletePet} = require('../Controllers/pet');

router.post('/add',UserValidation, ValidatePet, createPet);
router.get('/get', UserValidation, getAllPets);

router.put('/update', UserValidation, ValidatePet, updatePet);
router.delete('/delete/:id', UserValidation, deletePet);

module.exports = router;
