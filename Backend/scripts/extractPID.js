const extractPublicIdFromUrl = (url) => {
  try {
    // Example URL: https://res.cloudinary.com/cloud-name/image/upload/v1234567890/folder/image.jpg
    
    const urlParts = url.split('/upload/');
    if (urlParts.length < 2) {
      throw new Error('Invalid Cloudinary URL');
    }

    // Get everything after /upload/
    const pathWithVersion = urlParts[1];
    
    // Remove version number (v1234567890/)
    const pathWithoutVersion = pathWithVersion.replace(/^v\d+\//, '');
    
    // Remove file extension
    const publicId = pathWithoutVersion.replace(/\.[^/.]+$/, '');
    
    return publicId;
  } catch (error) {
    throw new Error('Failed to extract public_id from URL');
  }
};
module.exports = extractPublicIdFromUrl;