const joi = require('joi')
const TrainerValidation =  (req,res,next)=>{
  try{
    const schema = joi.object({
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
      location: joi.string().required().messages({
        'string.empty': 'Location is required.'
      }),
      city: joi.string().required().messages({
        'string.empty': 'City is required.'
      }),
      zip: joi.string().min(6).max(6).required().messages({
        'string.min': 'Pincode must be 6 digits long.',
        'string.max': 'Pincode must be 6 digits long.',
        'string.empty': 'Pincode is required.'
      }),
      experience: joi.string().required().messages({
        'string.empty': 'Experience is required.'
      }),
      description: joi.string().min(50).required().messages({
        'string.min': 'Description must be at least 50 characters long.',
        'string.empty': 'Description is required.'
      }),
      image: joi.array().items(joi.string()).required().messages({
        'array.empty': 'Image is required.'
      }),
      services: joi.array().items(joi.string()).required().messages({
        'array.empty': 'Services are required.'
      }),
      price: joi.array().items(joi.number()).required().messages({
        'array.empty': 'Price is required.'
      })

    })
    const {error} = schema.validate(req.body)
    if(error){
      return res.status(400).json({message:error.details[0].message});

    }

    next();
  }
  catch(error){
    return res.status(400).json({message:error.details[0].message})
  }
}

module.exports = {TrainerValidation}

// fields for trainer :
// name : {
//   type : String,
//   required : true
// },
// email : {
//   type : String,
//   required : true
// },
// phone : {
//   type : String,
//   required : true
// },
// location : {
//   type : String,
//   required : true
// },
// city : {
//   type : String,
//   required : true
// },
// zip : {
//   type : Number,
//   required : true
// },
// experience : {
//   type : String,
//   required : true
// },
// description : {
//   type : String,
//   required : true
// },
// image:{
// type: [String],
// required: true
// }
// ,
// services:{
// required: true,
// type: [String]
// }
// ,
// price:{
// required: true,
// type: [Number]
// }