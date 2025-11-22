const router = require("express").Router();

const validateAppointment = require("../Middlewares/appointment");

const {createAppointment,
  getAppointmentsByUser,
  getAppointmentById,
  getAppointmentsByAuthId,
  updateAppointment,
  deleteAppointment} = require("../Controllers/appointment");

const TokenValidator= require('../Middlewares/TokenValidator');


router.post('/create', TokenValidator,validateAppointment, createAppointment);

router.get('/by-user',TokenValidator,getAppointmentsByUser);

router.get('/by-id/:id', TokenValidator,getAppointmentById);

router.get('/by-authority',TokenValidator,getAppointmentsByAuthId);

router.put('/update/:id',TokenValidator,validateAppointment,updateAppointment);

router.delete('/delete/:id',TokenValidator,deleteAppointment);

module.exports = router;


