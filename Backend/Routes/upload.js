const router = require('express').Router();
const {uploadProfileImage} = require('../Controllers/upload');

router.post('/upload_image',uploadProfileImage );
// router.post('/upload_images',uploadProfileImages );
// router.post('/upload_file',uploadFile );
module.exports = router;