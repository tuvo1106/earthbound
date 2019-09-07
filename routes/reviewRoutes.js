const express = require('express')
const {
  getAllReviews,
  getReviewByID,
  createReview,
  updateReview,
  deleteReview
} = require('./../controllers/reviewContoller')
const { protect, restrictTo } = require('./../controllers/authController')

const router = express.Router()

router
  .route('/')
  .get(getAllReviews)
  .post(protect, restrictTo('user'), createReview)

router
  .route('/:id')
  .get(getReviewByID)
  .patch(updateReview)
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteReview)

module.exports = router
