const joi = require('joi')


const VetValidation = (req,res,next)=>{
  let schema = joi.object({
    name: joi.string().min(3).required().messages({
      'string.min': 'Name must be at least 3 characters long.',
      'string.empty': 'Name is required.'
    }),
    email: joi.string().email().required().messages({
      'string.email': 'Invalid email address.',
      'string.empty': 'Email is required.'
    }),
    phone: joi.string().min(10).max(10).required().messages({
      'string.min': 'Phone number must be 10 digits long.',
      'string.max': 'Phone number must be 10 digits long.',
      'string.empty': 'Phone number is required.'
    }),
    address: joi.string().required().messages({
      'string.empty': 'Address is required.'
    }),
    city: joi.string().required().messages({
      'string.empty': 'City is required.'
    }),
    state: joi.string().required().messages({
      'string.empty': 'State is required.'
    }),
    
    zip: joi.string().min(6).max(6).required().messages({
      'string.min': 'Pincode must be 6 digits long.',
      'string.max': 'Pincode must be 6 digits long.',
      'string.empty': 'Pincode is required.'
    }),
    about: joi.string().min(50).required().messages({
      'string.min': 'About must be at least 50 characters long.',
      'string.empty': 'About is required.'
    }),
    tenure: joi.string().required().messages({
      'string.empty': 'Tenure is required.'
    }),
    rating: joi.number().default(4),
    profilePic: joi.string().allow('').default(""),
    timings: joi.array().items(joi.array().items(joi.string())).required()
  })
  const {error} = schema.validate(req.body)
  if(error){
    return res.status(400).json({message:error.details[0].message, success: false});
  }
  next();
}


module.exports = {VetValidation}