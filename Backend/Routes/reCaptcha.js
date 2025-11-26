const router = require("express").Router();
const verifyCaptcha = require('../verifyCaptcha');

router.post("/", async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ success: false, message: 'No token provided' });
  }

  const result = await verifyCaptcha(token);
  // console.log(result);
  return res.status(result.success ? 200 : 403).json(result);
});

module.exports = router;
