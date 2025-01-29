const router = require('express').Router();
const {SignUpValidation,LoginValidation} = require('../Middlewares/auth');
const {loginControl, signupControl} = require('../Controllers/auth');

router.post('/signup',SignUpValidation,signupControl);
router.post('/login',LoginValidation,loginControl);
module.exports = router;