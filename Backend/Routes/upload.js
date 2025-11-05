const router = require('express').Router();
const {uploadProfileImage, uploadMultipleImages, deleteMultipleImages} = require('../Controllers/upload');
const upload = require('../Middlewares/upload');
const tokenValidator =  require("../Middlewares/TokenValidator");
router.post('/upload_image',tokenValidator,uploadProfileImage );

router.post('/m_images',tokenValidator,upload.fields([
  { name: 'images', maxCount: 5 }, // General images
  {name: 'logo', maxCount:1}, // Logo image
]), uploadMultipleImages);

router.delete('/delete_images', tokenValidator,deleteMultipleImages);
// router.post('/upload_file',uploadFile );
module.exports = router;