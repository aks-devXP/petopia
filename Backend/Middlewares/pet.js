const joi = require('joi');

const ValidatePet = (req, res, next) => {
  const schema = joi.object({
    name: joi.string().required().messages({
      'string.empty': 'Name is required',
      'any.required': 'Name is required'
    }),
    age: joi.number().min(0).required().messages({
      'number.base': 'Age must be a number',
      'number.min': 'Age must be a positive number',
      'any.required': 'Age is required'
    }),
    category: joi.string().required().messages({
      'string.empty': 'Category is required',
      'any.required': 'Category is required'
    }),
    breed: joi.string().required().messages({
      'string.empty': 'Breed is required',
      'any.required': 'Breed is required'
    })
  });
  const { name, age, category, breed } = req.body;
  const { error } = schema.validate({ name, age, category, breed } );
  console.log("Middle Pet", req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = { ValidatePet };
