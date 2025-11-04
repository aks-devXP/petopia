const validator = require('joi');

const addPetValidation = (req,res,next)=>{
    const schema = validator.object({
      category: validator.string().trim().required().message('Category is required.'),
      name: validator.string.min(3).max(40).required().messages({
        "string.empty": "Name is required.",
        "string.min": "Name must be at least 3 characters long.",
        "string.max": "Name must be at most 40 characters long."
      }),
      img: validator.string().trim().required().messages({
        "string.empty": "Image URL is required."
      }),
      height: validator.string().required().messages({
        "string.empty": "Height is required."
      }),
      lifeExpectancy: validator.string().trim().required().messages({
        "string.empty": "Life expectancy is required."
      }),
      weight: validator.string().trim().required().messages({
        "string.empty": "Weight is required."
      }),
      description: validator.string().trim().required().messages({
        "string.empty": "Description is required."
      }),
      canStayAlone: validator.number().required().min(0).max(5).messages({
        "number.base": "Can stay alone must be a number.",
        "number.min": "Can stay alone must be at least 0.",
        "number.max": "Can stay alone must be at most 5."
      }),
      lifeExpectancy: validator.string().trim().required().messages({
        "string.empty": "Life expectancy is required."
      }), 
      dietaryNeeds: validator.array().items(
        validator.string().trim().min(3).max(100).messages({
          "string.empty": "Dietary needs cannot be empty.",
          "string.min": "Each dietary need must be at least 1 character long.",
          "string.max": "Each dietary need must be at most 100 characters long."
        })
      ).required().min(1).messages({
        "array.base": "Dietary needs must be an array.",
        "array.min": "At least one dietary need is required."
      }),
      dietarAvoid: validator.array().items(
        validator.string().trim().min(3).max(100).messages({
          "string.empty": "Dietary avoidances cannot be empty.",
          "string.min": "Each dietary avoidance must be at least 1 character long.",
          "string.max": "Each dietary avoidance must be at most 100 characters long."
        })
      ).required().min(1).messages({
        "array.base": "Dietary avoidances must be an array.",
        "array.min": "At least one dietary avoidance is required."
      }),
      healthIssues: validator.array().items(
        validator.string().trim().min(5).max(100).messages({
          "string.empty": "Health issues cannot be empty.",
          "string.min": "Each health issue must be at least 1 character long.",
          "string.max": "Each health issue must be at most 100 characters long."
        })
      ).required().min(1).messages({
        "array.base": "Health issues must be an array.",
        "array.min": "At least one health issue is required."
      })
    })
    const {error} = schema.validate(req.body, {abortEarly: false});

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map((err) => err.message).join(', ')
        });
        console.log("Error in guide middleware",error);
    }
    next();
}



module.exports = {
    addPetValidation
}