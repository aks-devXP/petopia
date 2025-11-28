const router = require('express').Router();

const reviewController = require("../Controllers/review");

const validateReview = require("../Middlewares/review");
const tokenValidator = require("../Middlewares/TokenValidator");

// --------- Create Review -------------
/*
  expects data in db format as request body

*/

router.post("/create-review",tokenValidator,validateReview, reviewController.createReview);

// ------------- Update -----------------
router.put("/update-review",tokenValidator,validateReview,reviewController.updateReview);

// ------------- Get By User Id -----------------
router.get("/by-user",tokenValidator, reviewController.getReviewsByUser);
// ------------- Get By Auth Id -----------------
router.get("/by-auth",tokenValidator, reviewController.getReviewsByAuthority);

// ------------- Get By Review Id -----------------
router.get("/by-id/:id",tokenValidator, reviewController.getReviewById);
// ------------- Delete -----------------
router.delete("/delete-review/:id",tokenValidator,reviewController.deleteReview);
module.exports = router;