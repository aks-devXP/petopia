const router = require('express').Router();
const {uploadProfileImage, uploadMultipleImages, deleteMultipleImages} = require('../Controllers/upload');
const upload = require('../Middlewares/upload');

router.post('/upload_image',uploadProfileImage );

router.post('/m_images',upload.fields([
  { name: 'images', maxCount: 5 }, // General images
  {name: 'logo', maxCount:1}, // Logo image
]), uploadMultipleImages);

router.delete('/delete_images', deleteMultipleImages);
// router.post('/upload_file',uploadFile );
module.exports = router;