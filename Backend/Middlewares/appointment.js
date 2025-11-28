const Joi = require('joi');

// Common ObjectId string validator (24-char hex)
const objectId = Joi.string().hex().length(24);

const appointmentSchema = Joi.object({
  // user_id is extracted from token, not validated here
  // user_id: objectId.required(),

  type: Joi.string()
    .valid('vet', 'groomer', 'trainer', 'daycare')
    .required(),

  authority_id: objectId.required(),

  date: Joi.date().iso().required(),    

  time: Joi.string().required(),         
  pet_id: objectId.required(),

  status: Joi.string()
    .valid('pending', 'confirmed', 'completed', 'cancelled')
    .optional(),                         

  description: Joi.string().allow('', null).optional(),

  serviceCost: Joi.number().min(0).required(),

  serviceName: Joi.string().allow('', null).optional(),

  addons: Joi
        .array()
        .items(
          Joi.object({
            id: Joi.string().trim().required().messages({
              'string.base': 'Addon id must be a string.',
              'any.required': 'Addon id is required.',
            }),
            label: Joi.string().trim().required().messages({
              'string.base': 'Addon label must be a string.',
              'any.required': 'Addon label is required.',
            }),
            price: Joi
              .number()
              .min(0)
              .required()
              .messages({
                'number.base': 'Addon price must be a number.',
                'number.min': 'Addon price cannot be negative.',
                'any.required': 'Addon price is required.',
              }),
          })
        )
        .default([])
        .messages({
          'array.base': 'Addons must be an array.',
        }),
});

// Express middleware
function validateAppointment(req, res, next) {
  const { error, value } = appointmentSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true, 
  });

  if (error) {
    console.log("Validation Error:", error);
    return res.status(400).json({
      success: false,
      message: 'Invalid appointment payload',
      details: error.details.map((d) => ({
        message: d.message,
        path: d.path.join('.'),
      })),
    });
  }

  req.validatedAppointment = value;
  next();
}

module.exports = validateAppointment;
