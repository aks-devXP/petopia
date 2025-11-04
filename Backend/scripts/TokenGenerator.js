const jwt = require('jsonwebtoken');

const generateToken = (payload, expiresIn = '7d') => {
  try {
    if (!payload || typeof payload !== 'object') {
      throw new Error('Invalid payload: must be an object');
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn }
    );

    return token;
    
  } catch (error) {
    console.error('Token generation error:', error.message);
    throw new Error(`Failed to generate token: ${error.message}`);
  }
};
module.exports = generateToken;