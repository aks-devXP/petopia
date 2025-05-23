const router = require('express').Router();
const {SignUpValidation,LoginValidation,GoogleValidation, GenLoginValidation, GenSignUpValidation} = require('../Middlewares/auth');
const {loginControl, signupControl,GoogleControl, GenLoginControl, GenSignupControl,FacebookControl} = require('../Controllers/auth');

router.post('/signup',SignUpValidation,signupControl);
router.post('/login',LoginValidation,loginControl);
router.post('/gen-login',GenLoginValidation,GenLoginControl);
router.post('/gen-signup',GenSignUpValidation,GenSignupControl);
router.post('/google-login',GoogleControl);
router.post('/facebook-login',FacebookControl);

module.exports = router;