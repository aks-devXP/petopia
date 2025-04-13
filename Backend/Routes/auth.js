const router = require('express').Router();
const {SignUpValidation,LoginValidation,GoogleValidation} = require('../Middlewares/auth');
const {loginControl, signupControl,GoogleControl} = require('../Controllers/auth');

router.post('/signup',SignUpValidation,signupControl);
router.post('/login',LoginValidation,loginControl);
router.post('/google-login',GoogleControl);

module.exports = router;