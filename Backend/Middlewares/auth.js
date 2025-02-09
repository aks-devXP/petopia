const checker = require('joi')

const SignUpValidation = (req,res,next)=>{
    const schema = checker.object({
        name: checker.string().min(3).required().max(20).messages({
            'string.min': 'Name must be at least 3 characters long.',
            'string.max': 'Name must be at most 20 characters long.',
            'string.empty': 'Name is required.'
        }),
        email: checker.string().email().required(),
        password:checker.string().min(6).pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required().messages({
       'string.pattern.base': 'Password must contain at least one letter, one number, and one special character, and be at least 8 characters long.',
          'string.empty': 'Password is required.',}
        )
    })
    const {error} = schema.validate(req.body)
    if(error){
        return res.status(400).json({message:error.details[0].message});
    }
    next();
}

const LoginValidation = (req,res,next)=>{
  const schema = checker.object({
    email: checker.string().email().required(),
    password: checker.string().required()
  })
  const {error} = schema.validate(req.body);
  if(error){
    return res.status(400).json({message:error.details[0].message})
  }
  next();
}

const GoogleValidation = (req,res,next)=>{

  next();
}
module.exports = {SignUpValidation,LoginValidation,GoogleValidation}