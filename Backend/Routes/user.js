const exp =   require('express');
const router = exp.Router();
const { ContactControl } = require('../Controllers/user');
const {ContactValidation, AppointmentMiddleware,UserValidation} = require('../Middlewares/user');
const {getProfileControl,updateProfileControl, updatePasswordControl, createAppointmentControl, updateAppointmentControl, getAllAppointmentControl,deleteAppointmentControl} = require('../Controllers/user');

// Generic User Routes
router.post('/contact-us', ContactValidation, ContactControl);


// Authenticated User Routes
// --Profile Page Routes
router.get('/profile-info', UserValidation, getProfileControl);
router.post('/profile-info', UserValidation, updateProfileControl);
router.put('/profile-pass', UserValidation, updatePasswordControl);

console.log("User Routes Loaded");
// --Appointment Routes
router.post('/appointment_create', UserValidation, AppointmentMiddleware ,createAppointmentControl);
router.put('/appointment_update', UserValidation,AppointmentMiddleware , updateAppointmentControl);
router.get('/appointment_get', UserValidation, getAllAppointmentControl);
router.delete('/appointment_delete', UserValidation, deleteAppointmentControl);

module.exports = router;

