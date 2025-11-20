const router = require('express').Router();
const {GoomerValidation, GroomerValidation}= require('../Middlewares/groomer');
const {create,
  getData,
  getById,
  deleteById,
  getCategories,} = require('../Controllers/groomer');
const TokenValidator= require('../Middlewares/TokenValidator');
  router.get('/all-data',getData),
  router.create('/create',GroomerValidation,create);
  router.get('/getCategories',getCategories);
  router.get('/data/:id',getById);
  router.delete('/delete',TokenValidator,deleteById);
  

module.exports = router;