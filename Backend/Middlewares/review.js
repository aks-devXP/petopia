const Joi = require("joi");
const mongoose = require("mongoose");

// Custom ObjectId validator
const objectId = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error("any.invalid");
  }
  return value;
};

const reviewSchema = Joi.object({
  authority_id: Joi.string().custom(objectId).required(),
  user_id: Joi.string().custom(objectId).required(),

  rating: Joi.number()
    .min(1)
    .max(5)
    .messages({
      'any.base':"Rating is Required",
      "number.baser":"Rating should be a number"
    }),

  review: Joi.string()
    .min(3)
    .max(1000)
    .optional(),

  status: Joi.string()
    .valid("pending", "approved", "rejected")
    .default("pending"),

  appointment_id: Joi.string().custom(objectId).required(),
});

module.exports = function validateReview(req, res, next) {
  const { error, value } = reviewSchema.validate(req.body, {
    abortEarly: false, // return all errors
    stripUnknown: true, // remove fields not in schema
  });

  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: error.details.map((d) => d.message),
    });
  }

  req.body = value; // sanitized body
  next();
};
