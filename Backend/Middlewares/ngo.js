const validator = require('joi');
// MongoDB ObjectId: 24 hex chars
const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const validateCampaign = (req, res, next) => {
  try {
    const schema = validator.object({
      title: validator.string().trim().min(3).max(100).required().messages({
        'string.base': 'Title must be a string',
        'string.empty': 'Title must be given',
        'string.min': 'Title must be at least 3 characters long',
        'string.max': 'Title must not exceed 100 characters',
        'any.required': 'Title is required',
      }),

      tagline: validator.string().trim().min(3).max(300).required().messages({
        'string.base': 'Tagline must be a string',
        'string.empty': 'Tagline must be given',
        'string.min': 'Tagline must be at least 3 characters long',
        'string.max': 'Tagline must be at most 300 characters long',
        'any.required': 'Tagline is required',
      }),

      description: validator.string().trim().min(50).max(5000).required().messages({
        'string.base': 'Description must be a string',
        'string.empty': 'Description must be given',
        'string.min': 'Description must be at least 50 characters long',
        'string.max': 'Description must not exceed 5000 characters',
        'any.required': 'Description is required',
      }),

      images: validator
        .array()
        .items(
          validator.string().uri().messages({
            'string.uri': 'Each image must be a valid URL',
            'string.base': 'Each image must be a string URL',
          })
        )
        .min(1)
        .max(5)
        .required()
        .messages({
          'array.base': 'Images must be an array of URLs',
          'array.min': 'At least one image is required',
          'array.max': 'No more than 5 images are allowed',
          'any.required': 'Images field is required',
        }),

      goal: validator.number().min(0).precision(2).optional().messages({
        'number.base': 'Goal must be a number',
        'number.min': 'Goal cannot be negative',
      }),

      raised: validator.number().min(0).precision(2).optional().messages({
        'number.base': 'Raised must be a number',
        'number.min': 'Raised cannot be negative',
      }),

      city: validator.string().trim().required().messages({
        'string.base': 'City must be a string',
        'string.empty': 'City must be given',
        'any.required': 'City is required',
      }),

      state: validator.string().trim().required().messages({
        'string.base': 'State must be a string',
        'string.empty': 'State must be given',
        'any.required': 'State is required',
      }),

      organizer_id: validator.string().pattern(objectIdRegex).required().messages({
        'string.base': 'Organizer ID must be a string',
        'string.pattern.base': 'Organizer ID must be a valid MongoDB ObjectId',
        'any.required': 'Organizer ID is required',
      }),

      donation_url: validator.string().uri().required().messages({
        'string.base': 'Donation URL must be a string',
        'string.uri': 'Donation URL must be a valid URL',
        'any.required': 'Donation URL is required',
      }),
      updated_last: validator.date().optional().messages({
        'date.base': 'updated_last must be a valid date',
      }),
    })
    // Optional cross-field rule: raised should not exceed goal (when both provided)
    .custom((value, helpers) => {
      if (
        typeof value.goal === 'number' &&
        typeof value.raised === 'number' &&
        value.raised > value.goal
      ) {
        return helpers.error('any.invalid', { message: 'Raised cannot exceed goal' });
      }
      return value;
    }, 'raised <= goal validation');

    const { error, value } = schema.validate(req.body.campaign, {
      abortEarly: false,   // report all errors
      stripUnknown: true,  // remove fields not in schema
      convert: true,       // coerce types when reasonable
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        details: error.details.map(d => d.message || d.context?.message),
      });
    }

    // Replace payload with sanitized value
    req.body.campaign = value;
    return next();
  } catch (err) {
    console.error('Error in validator of createCampaign:', err);
    return res.status(500).json({
      success: false,
      message: 'Internal validation error',
    });
  }
};


const currentYear = new Date().getFullYear();
const phoneRegex = /^[0-9+\-\s()]{7,20}$/;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const socialLinksSchema = validator.object().pattern(
  validator.string().min(1),
  validator.string().uri().messages({
    'string.uri': 'Each social media link must be a valid URL',
  })
);

const verificationDocsSchema = validator.object().pattern(
  validator.string().min(1),
  validator.string().uri().messages({
    'string.uri': 'Each verification doc URL must be a valid URL',
  })
).min(1).messages({
  'object.min': 'At least one verification document is required',
});

const validateNGO = (req, res, next) => {
  try {
    // Accept payload from req.body.ngo (preferred) or fallback to req.body
    const incoming = req.body?.ngo ?? req.body;

    const schema = validator.object({
      name: validator.string().trim().min(2).max(120).required().messages({
        'string.base': 'Name must be a string',
        'string.empty': 'Name is required',
        'string.min': 'Name must be at least 2 characters',
        'string.max': 'Name must not exceed 120 characters',
        'any.required': 'Name is required',
      }),

      founder: validator.string().trim().min(2).max(120).required().messages({
        'string.base': 'Founder must be a string',
        'string.empty': 'Founder is required',
        'any.required': 'Founder is required',
      }),

      password: validator.string().min(6).max(128).pattern(passwordRegex).required().messages({
        'string.base': 'Password must be a string',
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 8 characters',
        'string.max': 'Password must not exceed 128 characters',
        'string.pattern.base': 'Password must contain at least one letter, one number, and one special character, and be at least 8 characters long.',
        'any.required': 'Password is required',
      }),

      email: validator.string().trim().lowercase().email().required().messages({
        'string.base': 'Email must be a string',
        'string.email': 'Email must be a valid email address',
        'any.required': 'Email is required',
      }),

      images: validator
        .array()
        .items(
          validator.string().uri().messages({
            'string.base': 'Each image must be a string',
            'string.uri': 'Each image must be a valid URL',
          })
        )
        .min(0)
        .max(5)
        .optional()
        // .required() //not required as per current frontend
        .messages({
          'array.base': 'Images must be an array of URLs',
          'array.min': 'At least one image is required',
          'array.max': 'No more than 5 images are allowed',
          // 'any.required': 'Images field is required',
        }),

      contact_no: validator.string().trim().pattern(phoneRegex).required().messages({
        'string.base': 'Contact number must be a string',
        'string.pattern.base': 'Contact number must be 7–20 chars and may include digits, +, -, spaces, and ()',
        'any.required': 'Contact number is required',
      }),

      description: validator.string().trim().min(20).max(5000).required().messages({
        'string.base': 'Description must be a string',
        'string.empty': 'Description is required',
        'string.min': 'Description must be at least 20 characters',
        'string.max': 'Description must not exceed 5000 characters',
        'any.required': 'Description is required',
      }),

      social_media_links: socialLinksSchema.default({}),

      website: validator.string().uri().optional().allow('').messages({
        'string.uri': 'Website must be a valid URL',
      }),

      address: validator.string().trim().min(5).max(300).required().messages({
        'string.base': 'Address must be a string',
        'string.empty': 'Address is required',
        'string.min': 'Address must be at least 5 characters',
        'string.max': 'Address must not exceed 300 characters',
        'any.required': 'Address is required',
      }),

      city: validator.string().trim().min(2).max(100).required().messages({
        'string.base': 'City must be a string',
        'string.empty': 'City is required',
        'any.required': 'City is required',
      }),

      state: validator.string().trim().min(2).max(100).required().messages({
        'string.base': 'State must be a string',
        'string.empty': 'State is required',
        'any.required': 'State is required',
      }),

      verification_docs: verificationDocsSchema.required().messages({
        'any.required': 'Verification documents are required',
      }),

      is_verified: validator.boolean().default(false),

      logo: validator.string().uri().required().messages({
        'string.base': 'Logo must be a string URL',
        'string.uri': 'Logo must be a valid URL',
        'any.required': 'Logo is required',
      }),

      activities: validator.array().items(validator.string().trim().min(1)).default([]),

      facilities: validator.array().items(validator.string().trim().min(1)).default([]),

      established_in: validator.number()
        .integer()
        .min(1800)
        .max(currentYear)
        .required()
        .messages({
          'number.base': 'Established year must be a number',
          'number.integer': 'Established year must be an integer',
          'number.min': 'Established year must be 1800 or later',
          'number.max': `Established year cannot be in the future (${currentYear})`,
          'any.required': 'Established year is required',
        }),

      total_funds_raised: validator.number().min(0).default(0),
      total_campaigns: validator.number().integer().min(0).default(0),
    });

    const { error, value } = schema.validate(incoming, {
      abortEarly: false,   // collect all errors
      stripUnknown: true,  // drop fields not in schema
      convert: true,       // coerce types where reasonable
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: error.details.map(d => ({
          field: d.path.join('.'),
          message: d.message,
        })),
      });
    }

    // Write sanitized payload back
    if (req.body?.ngo !== undefined) {
      req.body.ngo = value;
    } else {
      req.body = value;
    }

    next();
    
  } catch (err) {
    console.error('Error in validateNGO middleware:', err);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal validation error' 
    });
  }
};


module.exports = {
  validateCampaign,
  validateNGO
}

