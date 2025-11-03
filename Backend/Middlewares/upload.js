const multer = require('multer');
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 6 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    // console.log('Uploaded file mimetype:', _req);
    if (!/^image\/(jpe?g|png|webp|gif)$/i.test(file.mimetype)) {
      return cb(new Error('Only image files (jpg, png, webp, png, gif) are allowed'));
    }
    cb(null, true);
  }
});
module.exports = upload;