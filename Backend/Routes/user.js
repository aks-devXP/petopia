const exp =   require('express');
const router = exp.Router();
const { ContactControl } = require('../Controllers/user');
const {ContactValidation} = require('../Middlewares/user');
const {UserValidation} = require('../Middlewares/user');
const {getProfileControl} = require('../Controllers/user');
router.post('/contact-us', ContactValidation, ContactControl);

router.get('/profile-info', UserValidation, getProfileControl);
module.exports = router;
