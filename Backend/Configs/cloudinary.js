// const cloudinary = require('cloudinary').v2;

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key:    process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
//   secure: true
// });

// module.exports = cloudinary;

// Backend/Configs/cloudinary.js
const cloudinary = require('cloudinary').v2;

// ⚠️ LOCAL TEST DEFAULTS (used only if env vars are missing)
// Replace the secret locally; do NOT commit secrets.
const LOCAL_CLOUDINARY = {
  cloud_name: 'dqzgsqemd',               // <- your cloud name
  api_key: '371161923163856',            // <- your API key
  api_secret: '3F9z6ebu6Jgmw82vr_5Yba5FxZI' // <- your API secret (local only)
};

// Resolve config: prefer environment, fallback to LOCALs
const cfg = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || LOCAL_CLOUDINARY.cloud_name,
  api_key:    process.env.CLOUDINARY_API_KEY    || LOCAL_CLOUDINARY.api_key,
  api_secret: process.env.CLOUDINARY_API_SECRET || LOCAL_CLOUDINARY.api_secret,
  secure: true
};

cloudinary.config(cfg);

// Nice warning so you remember to move to env on Vercel
if (!process.env.CLOUDINARY_API_SECRET && process.env.NODE_ENV !== 'production') {
  console.warn('⚠️ Using LOCAL Cloudinary credentials from code. Do NOT commit secrets. Rotate before deploying.');
}

module.exports = cloudinary;
