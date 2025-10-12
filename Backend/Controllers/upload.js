const cloudinary = require('../Configs/cloudinary');

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
      return res.status(500).json({ error: 'Failed to upload image' });
    }
  
  });
    console.log('Image uploaded successfully:', uploaded);
    res.status(200).json({message:"Image has been received", url: uploaded.secure_url, public_id: uploaded.public_id, success: true});
  } catch (error) {
    console.error('Error receiving image:', error);
    res.status(500).json({ message: 'Failed to upload image' , success: false});
  }
}

module.exports = {
  uploadProfileImage,
};
