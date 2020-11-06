import express from "express";
import {
  addReview,
  deleteReview,
  getReview,
  getReviews,
  updateReview,
} from "../controllers/reviews.controllers.js";
import { authorize, protect } from "../middleware/auth.js";
import Review from "../models/Review.js";
import advancedResults from "../middleware/advancedResults.js";

const router = express.Router({ mergeParams: true });

router.route("/")
  .get(
    advancedResults(Review, {
      path: "bootcamp",
      select: "name description",
    }),
    getReviews,
  )
  .post(protect, authorize("user", "admin"), addReview);

router.route("/:id")
  .get(getReview)
  .put(protect, authorize("user", "admin"), updateReview)
  .delete(protect, authorize("user", "admin"), deleteReview);

export default router;
