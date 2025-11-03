const router = require('express').Router();
const {SignUpValidation,LoginValidation,GoogleValidation, AdminLoginValidation, AdminSignUpValidation} = require('../Middlewares/auth');
const {loginControl, signupControl,GoogleControl, AdminLoginControl, AdminSignupControl,FacebookControl} = require('../Controllers/auth');

router.post('/signup',SignUpValidation,signupControl);
router.post('/login',LoginValidation,loginControl);
router.post('/admin-login',AdminLoginValidation,AdminLoginControl);
router.post('/admin-signup',AdminSignUpValidation,AdminSignupControl);
router.post('/google-login',GoogleControl);
router.post('/facebook-login',FacebookControl);

module.exports = router;