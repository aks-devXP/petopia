const axios = require('axios');
require('dotenv').config();
const verifyCaptcha = async (token) => {
  try {
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    const url = 'https://www.google.com/recaptcha/api/siteverify';

    const response = await axios.post(url, null, {
      params: {
        secret,
        response: token,
      },
    });

    const data = response.data;
    // console.log(response);

    if (data.success) {
      return { success: true };
    } else {
      return {
        success: false,
        message: 'reCAPTCHA verification failed',
        errorCodes: data['error-codes'],
      };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

module.exports = verifyCaptcha;
