const joi = require('joi')
const ValidatePet = (req, res, next) => {
  const schema = joi.object({
    name: joi.string().required().message("Name is required"),
    age: joi.number().min(0).required().message("Age must be a positive number"),
    category: joi.string().required().message("Category is required"),
    breed: joi.string().required().message("Breed is required"),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
module.exports = { ValidatePet };