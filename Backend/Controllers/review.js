
const mongoose = require("mongoose");
const Review = require("../Models/ReviewsDB"); 

// helper: validate ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

/**
 * GET /reviews/user/:userId
 * Get all reviews written by a specific user
 */
const getReviewsByUser = async (req, res) => {
  try {
    const  userId  = req.verified.id;

    if (!isValidObjectId(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user_id",
      });
    }

    const reviews = await Review.find({ user_id: userId })
      .sort({ created_at: -1 });

    return res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (err) {
    console.error("Get reviews by user error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch reviews for user",
    });
  }
};

/**
 * GET /reviews/authority/:authorityId
 * Get all reviews for a specific authority (vet/groomer/trainer/etc.)
 */
const getReviewsByAuthority = async (req, res) => {
  try {
    const  authorityId  = req.params.id;

    if (!isValidObjectId(authorityId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid authority_id",
      });
    }

    const reviews = await (await Review.find({ authority_id: authorityId }))
      .sort({ created_at: -1 });

    return res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (err) {
    console.error("Get reviews by authority error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch reviews for authority",
    });
  }
};

/**
 * POST /reviews
 * Body is already validated by Joi middleware
 * Prefer taking user_id from token so user can't spoof it.
 */
const createReview = async (req, res) => {
  try {
    // If you have auth middleware, prefer that:
    const userIdFromToken = req.verified?.id; // or req.user.id depending on your auth
    const {
      authority_id,
      user_id,         // optional – we override if token exists
      rating,
      review,
      appointment_id,
      status,          // will default to 'pending' in schema or Joi
    } = req.body;

    const finalUserId = userIdFromToken || user_id;

    if (!finalUserId) {
      return res.status(400).json({
        success: false,
        message: "User id missing (token or body)",
      });
    }

    if (!isValidObjectId(authority_id) || !isValidObjectId(finalUserId) || !isValidObjectId(appointment_id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid authority_id, user_id or appointment_id",
      });
    }

    // Optional: prevent multiple reviews for same appointment by same user
    const existing = await Review.findOne({
      appointment_id,
      user_id: finalUserId,
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "You have already submitted a review for this appointment",
      });
    }

    const newReview = await Review.create({
      authority_id,
      user_id: finalUserId,
      rating,
      review,
      appointment_id,
      status: status || "pending",
    });

    return res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: newReview,
    });
  } catch (err) {
    console.error("Create review error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to create review",
    });
  }
};

/**
 * PUT /reviews/:id
 * Update rating/review/status for a review
 * You can restrict fields depending on whether caller is user or admin
 */
const updateReview = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid review id",
      });
    }

    const allowedFields = ["rating", "review", "status"];
    const updatePayload = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updatePayload[field] = req.body[field];
      }
    });

    if (Object.keys(updatePayload).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid fields to update",
      });
    }

    const updated = await Review.findByIdAndUpdate(id, updatePayload, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Review updated successfully",
      data: updated,
    });
  } catch (err) {
    console.error("Update review error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to update review",
    });
  }
};

/**
 * DELETE /reviews/:id
 * Delete a review
 */

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid review id",
      });
    }

    const deleted = await Review.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (err) {
    console.error("Delete review error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to delete review",
    });
  }
};
const getReviewById = async (req,res)=>{
  try{
    const id = req.params.id;
    
    const reviewData = await Review.findById(id);
    if(!reviewData){
      return res.status(404).json({
        success:true,
        message:"Review doesn't exist by the given id."
      })
    }
    return res.status(200).json({
      success: true,
      data: reviewData,
      message:"Successfully fetched the review by the given id"
    })
  }
  catch(error){
    res.status(500).json(
      {
        message:error.message,
        success:false,
      }
    )
  }
}

module.exports = {
  getReviewsByUser,
  getReviewsByAuthority,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
};
