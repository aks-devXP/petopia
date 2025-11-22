const router = require('express').Router();
const {GroomerValidation}= require('../Middlewares/groomer');
const {create,
  getData,
  getById,
  deleteById,
  getCategories,update} = require('../Controllers/groomer');
const TokenValidator= require('../Middlewares/TokenValidator');
  router.get('/all-data',getData),
  // router.post('/create',GroomerValidation,create);
  router.get('/getCategories',getCategories);
  router.get('/data/:id',getById);
  router.put('/update/:id',TokenValidator,GroomerValidation,update);
  router.delete('/delete',TokenValidator,deleteById);
  

module.exports = router;