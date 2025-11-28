const cloudinary = require('../Configs/cloudinary');
const uploadToCloudinary = require('../scripts/uploadToCloudinary');
const extractPublicId = require('../scripts/extractPID');



const uploadProfileImage  =  async (req, res) => {
  try {
    console.log(req.body);
    console.log("Image has been received");
    // 
    const image = req.body.image;
    const public_id = req.body.public_id;
    console.log("public_id", public_id);
    // res.status(200).json({message:"Image has been received"});
    const uploaded = await cloudinary.uploader.upload(image, {
      upload_preset: 'Petopia_image',
      public_id: `${public_id}avatar`, 
      allowed_formats: ['jpg', 'png', 'jpeg', 'webp','ico', 'jfif', 'svg'],
    },
  function(error, result) {
    if (error) {
      console.error('Error uploading image:', error);
      return res.status(500).json({ message: 'Failed to upload image' });
    }
  
  });
    console.log('Image uploaded successfully:', uploaded);
    res.status(200).json({message:"Image has been received", url: uploaded.secure_url, public_id: uploaded.public_id, success: true});
  } catch (error) {
    console.error('Error receiving image:', error);
    res.status(500).json({ message: 'Failed to upload image' , success: false});
  }
}


const uploadMultipleImages = async (req, res) => {
  try {
    let folder = req.body.folder || 'extras';
    
    const id = req.verified?.id;
    if(id){
      folder = `${folder}/${id}`;
    }
    

    const fieldName = req.body.fieldName;

    // console.log(req.files);
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded'
      });
    }

    let filesToUpload = [];
    let actualFieldName = '';
    // console.log(fieldName);
    if (fieldName && req.files[fieldName]) {
      // Use specified field name
      filesToUpload = req.files[fieldName];
      actualFieldName = fieldName;
    } else {
      // Use first available field
      // const firstField = Object.keys(req.files)[0];
      // filesToUpload = req.files[firstField];
      // actualFieldName = firstField;
      // console.log("hello");
      return res.status(401).json({
        success:false,
        message:"Invalid Image Field"
      });

    }

    if (filesToUpload.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files found'
      });
    }

    // console.log(`Uploading ${filesToUpload.length} files from '${actualFieldName}' to '${folder}'`);

    const uploadPromises = filesToUpload.map(image => 
      uploadToCloudinary(image.buffer, folder)
    );

    const results = await Promise.all(uploadPromises);

    const uploadedImages = results.map(result => ({
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format
    }));

    return res.status(200).json({
      success: true,
      message: `${uploadedImages.length} images uploaded successfully`,
      fieldName: actualFieldName,
      folder: folder,
      data: uploadedImages
    });

  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to upload images',
      error: error.message
    });
  }
};



const deleteMultipleImages = async (req, res) => {
  try {
    // Get array of URLs from body
    const imageUrls = req.body.urls || req.body.images;
    console.log(imageUrls);
    // Validate input
    if (!imageUrls || !Array.isArray(imageUrls) || imageUrls.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Array of image URLs is required"
      });
    }

    console.log(`Attempting to delete ${imageUrls.length} images`);

    // Extract public IDs
    const publicIds = imageUrls
      .map(url => extractPublicId(url))
      .filter(id => id !== null); // Remove invalid URLs

    if (publicIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid image URLs provided"
      });
    }

    // Delete all images
    const deletePromises = publicIds.map(publicId => 
      cloudinary.uploader.destroy(publicId, {
        resource_type: 'image'
      })
        .then(result => ({
          publicId,
          success: result.result === 'ok',
          result: result.result
        }))
        .catch(error => ({
          publicId,
          success: false,
          error: error.message
        }))
    );

    const results = await Promise.all(deletePromises);

    // Count successes and failures
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;

    // console.log(` Deleted: ${successful}, Failed: ${failed}`);

    // Return 204 if all succeeded, 207 if partial success
    
      return res.status(200).json({
        success: true,
        message: `Deleted ${successful} of ${results.length} images`,
        results: results
      });
    

  } catch (error) {
    // console.error(' Delete multiple images error:', error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete images",
      error: error.message
    });
  }
};


// const uploadSingleImage = async (req, res) => {
//   try {
//     // Check if file exists
//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: 'No file uploaded'
//       });
//     }

//     // Upload to Cloudinary
//     const result = await uploadToCloudinary(req.file.buffer, req.folder??"extras");

//     return res.status(200).json({
//       success: true,
//       message: 'Image uploaded successfully',
//       data: {
//         url: result.secure_url,
//         publicId: result.public_id,
//         width: result.width,
//         height: result.height,
//         format: result.format
//       }
//     });

//   } catch (error) {
//     console.error('Upload error:', error);
//     return res.status(500).json({
//       success: false,
//       message: 'Failed to upload image',
//       error: error.message
//     });
//   }
// };


module.exports = {
  uploadProfileImage,
  uploadMultipleImages,
  // uploadSingleImage
  deleteMultipleImages,

};
