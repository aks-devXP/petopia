const checker = require('joi')
const jwt = require('jsonwebtoken')
const ContactValidation = (req,res,next)=>{
  schema = checker.object({
    name: checker.string().min(3).required().messages({
      'string.min': 'Name must be at least 3 characters long.',
      'string.empty': 'Name is required.'
    }),
    email: checker.string().email().required().messages({
      'string.email': 'Invalid email address.',
      'string.empty': 'Email is required.'
    }),
    category: checker.string().required().messages({
      'string.empty': 'Category is required.'
    }),
    message: checker.string().min(50).required().messages({
      'string.min': 'Message must be at least 50 characters long.',
      'string.empty': 'Message is required.'
    }),
  })
  const {error} = schema.validate(req.body)
  if(error){
    return res.status(400).json({message:error.details[0].message, success: false});
  }
  next();

}


const UserValidation = (req,res,next)=>{
  const token = req.headers['authorization'];
  
  if(!token){
    return res.status(401).json({message:'Unauthorized access', success: false});
  }
  try{
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.verified = verified;
    console.log(verified.user_name);
    next();
  }
  catch(error){
    return res.status(400).json({message:'Invalid token', success: false});
  }
}



module.exports = {ContactValidation, UserValidation}