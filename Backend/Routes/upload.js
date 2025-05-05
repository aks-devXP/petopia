const router = require('express').Router();
const {uploadProfileImage} = require('../Controllers/upload');

router.post('/upload_image',uploadProfileImage );

module.exports = router;