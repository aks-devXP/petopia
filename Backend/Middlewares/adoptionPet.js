const joi = require('joi');

const ValidateAdoptionPet = (req, res, next) => {
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
    }),
    description: joi.string().min(10).required().messages({
      'string.empty': 'Description is required',
      'any.required': 'Description is required',
      'string.min': 'Description must be at least 10 characters',
    }),
    image: joi.string().uri().required().messages({
      'string.empty': 'Image URL is required',
      'any.required': 'Image is required',
      'string.uri': 'Image must be a valid URL',
    }),
  }).unknown(true);
  const { name, age, category, breed, description, image } = req.body;
  const { error } = schema.validate({ name, age, category, breed, description, image });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = { ValidateAdoptionPet };

