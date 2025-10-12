const cloudinary = require('cloudinary').v2;

// Optional: warn if env vars are missing (helps diagnose setup issues)
const missing = ['Cloudinary_CLOUD_NAME', 'Cloudinary_API_KEY', 'Cloudinary_API_SECRET']
  .filter((k) => !process.env[k]);
if (missing.length) {
  console.warn(`Cloudinary env missing: ${missing.join(', ')}`);
}

cloudinary.config({
  cloud_name: process.env.Cloudinary_CLOUD_NAME,
  api_key: process.env.Cloudinary_API_KEY,
  api_secret: process.env.Cloudinary_API_SECRET,
  secure: true,
});

module.exports = cloudinary;
