const joi = require('joi');

const TrainerValidation = (req, res, next) => {
  const schema = joi.object({
    // Basic info
    name: joi.string().trim().min(3).required().messages({
      'string.base': 'Name must be a string.',
      'string.min': 'Name must be at least 3 characters long.',
      'string.empty': 'Name is required.',
      'any.required': 'Name is required.',
    }),

    email: joi.string().trim().email().required().messages({
      'string.base': 'Email must be a string.',
      'string.email': 'Invalid email address.',
      'string.empty': 'Email is required.',
      'any.required': 'Email is required.',
    }),

    // Phone stored as Number in Mongo, validated as 10-digit number
    phone: joi
      .number()
      .integer()
      .min(1000000000) // 10-digit min
      .max(9999999999) // 10-digit max
      .required()
      .messages({
        'number.base': 'Phone must be a number.',
        'number.min': 'Phone number must be exactly 10 digits.',
        'number.max': 'Phone number must be exactly 10 digits.',
        'any.required': 'Phone number is required.',
      }),

    address: joi.string().trim().required().messages({
      'string.base': 'Address must be a string.',
      'string.empty': 'Address is required.',
      'any.required': 'Address is required.',
    }),

    city: joi.string().trim().required().messages({
      'string.base': 'City must be a string.',
      'string.empty': 'City is required.',
      'any.required': 'City is required.',
    }),

    state: joi.string().trim().required().messages({
      'string.base': 'State must be a string.',
      'string.empty': 'State is required.',
      'any.required': 'State is required.',
    }),

    locality: joi
      .string()
      .trim()
      .allow('', null)
      .optional()
      .messages({
        'string.base': 'Locality must be a string.',
      }),

    // Pincode as Number (6 digits)
    zip: joi
      .number()
      .integer()
      .min(100000)   // 6-digit min
      .max(999999)   // 6-digit max
      .required()
      .messages({
        'number.base': 'Pincode must be a number.',
        'number.min': 'Pincode must be exactly 6 digits.',
        'number.max': 'Pincode must be exactly 6 digits.',
        'any.required': 'Pincode is required.',
      }),

    about: joi.string().trim().min(50).required().messages({
      'string.base': 'About must be a string.',
      'string.empty': 'About is required.',
      'string.min': 'About must be at least 50 characters long.',
      'any.required': 'About is required.',
    }),

    // Rating 0–5 (optional)
    rating: joi.number().min(0).max(5).default(4).messages({
      'number.base': 'Rating must be a number.',
      'number.min': 'Rating cannot be negative.',
      'number.max': 'Rating cannot exceed 5.',
    }),

    // NEW: ratingCount
    ratingCount: joi
      .number()
      .integer()
      .min(0)
      .default(0)
      .messages({
        'number.base': 'Rating count must be a number.',
        'number.min': 'Rating count cannot be negative.',
      }),

    profilePic: joi
      .string()
      .uri()
      .allow('', null)
      .optional()
      .messages({
        'string.base': 'Profile picture must be a string URL.',
        'string.uri': 'Profile picture must be a valid URL.',
      }),

    // NEW: gallery of images
    gallery: joi
      .array()
      .items(
        joi.string().uri().messages({
          'string.base': 'Each gallery image must be a string URL.',
          'string.uri': 'Each gallery image must be a valid URL.',
        })
      )
      .default([])
      .messages({
        'array.base': 'Gallery must be an array of image URLs.',
      }),

    // Experience (Number)
    experience: joi
      .number()
      .integer()
      .min(0)
      .required()
      .messages({
        'number.base': 'Experience must be a number.',
        'number.min': 'Experience cannot be negative.',
        'any.required': 'Experience is required.',
      }),

    // Languages array
    languages: joi
      .array()
      .items(
        joi.string().trim().messages({
          'string.base': 'Each language must be a string.',
        })
      )
      .default([])
      .messages({
        'array.base': 'Languages must be an array of strings.',
      }),

    
    // timings: NEW shape -> [{ start, end }]
  timings: joi
  .array()
  .items(
    joi
      .array()
      .items(
        joi.string().trim().required().messages({
          'string.base': 'Timing entries must be strings.',
          'string.empty': 'Timing entries cannot be empty.',
          'any.required': 'Timing entries are required.',
        })
      )
      .length(2) // exactly [start, end]
      .messages({
        'array.base': 'Each timing must be an array of [start, end] strings.',
        'array.length': 'Each timing must have both start and end times.',
      })
  )
  .required()
  .messages({
    'array.base': 'Timings must be an array of [start, end] arrays.',
    'any.required': 'Timings are required.',
  }),


    specialization: joi.string().trim().required().messages({
      'string.base': 'Specialization must be a string.',
      'string.empty': 'Specialization is required.',
      'any.required': 'Specialization is required.',
    }),


    // Logical facilities array – will be converted to facMask in controller
    facilities: joi
      .array()
      .items(
        joi.string().trim().min(3).messages({
          'string.base': 'Each facility must be a string.',
          'string.min': 'Each facility must be at least 3 characters long.',
        })
      )
      .required()
      .messages({
        'array.base': 'Facilities must be an array of strings.',
        'any.required': 'At least one facility is required.',
      }),

    // approach bullet points
    approach: joi
      .array()
      .items(
        joi.string().trim().messages({
          'string.base': 'Each approach entry must be a string.',
        })
      )
      .default([])
      .messages({
        'array.base': 'Approach must be an array of strings.',
      }),

    // achievements bullet points
    achievements: joi
      .array()
      .items(
        joi.string().trim().messages({
          'string.base': 'Each achievement entry must be a string.',
        })
      )
      .default([])
      .messages({
        'array.base': 'Achievements must be an array of strings.',
      }),

    // addons: [{ id, label, price }]
    addons: joi
      .array()
      .items(
        joi
          .object({
            id: joi.string().trim().required().messages({
              'string.base': 'Addon id must be a string.',
              'string.empty': 'Addon id is required.',
              'any.required': 'Addon id is required.',
            }),
            label: joi.string().trim().required().messages({
              'string.base': 'Addon label must be a string.',
              'string.empty': 'Addon label is required.',
              'any.required': 'Addon label is required.',
            }),
            price: joi
              .number()
              .min(0)
              .required()
              .messages({
                'number.base': 'Addon price must be a number.',
                'number.min': 'Addon price cannot be negative.',
                'any.required': 'Addon price is required.',
              }),
          })
          .required()
      )
      .default([])
      .messages({
        'array.base': 'Addons must be an array of objects.',
      }),

    // Optional docs: array of URLs
    docs: joi
      .array()
      .items(
        joi.string().trim().uri().messages({
          'string.base': 'Each document entry must be a string.',
          'string.uri': 'Each document must be a valid URL.',
        })
      )
      .optional()
      .default([])
      .messages({
        'array.base': 'Docs must be an array of strings.',
      }),

    password: joi
      .string()
      .min(8)
      .required()
      .messages({
        'string.base': 'Password must be a string.',
        'string.empty': 'Password is required.',
        'string.min': 'Password must be at least 8 characters long.',
        'any.required': 'Password is required.',
      }),
  });

  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true, // drop junk fields
    convert: true,      // coerce strings to numbers where needed
  });

  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      details: error.details.map((d) => d.message),
    });
  }

  // use sanitized, typed payload
  req.body = value;
  return next();
};

module.exports = { TrainerValidation };
