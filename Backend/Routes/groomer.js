const router = require('express').Router();
const {GroomerValidation}= require('../Middlewares/groomer');
const {create,
  getData,
  getById,
  deleteById,
  getCategories,update,
getProfile} = require('../Controllers/groomer');
const TokenValidator= require('../Middlewares/TokenValidator');

const allowed_users = require('../Middlewares/allowedUsers');
  router.get('/all-data',getData),
  // router.post('/create',GroomerValidation,create);
  router.get('/getCategories',getCategories);
  router.get('/data/:id',getById);
  router.put('/update',TokenValidator,allowed_users(["groomer"]),GroomerValidation,update);
  router.get("/profile",TokenValidator,allowed_users(["admin","groomer"]),getProfile);
  router.delete('/delete',TokenValidator,deleteById);
  

module.exports = router;