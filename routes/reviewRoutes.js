const express = require('express')
const {
  getAllReviews,
  getReviewByID,
  createReview,
  updateReview,
  deleteReview,
  setTourUsersIds
} = require('./../controllers/reviewContoller')
const { protect, restrictTo } = require('./../controllers/authController')

// get params from tourRouter
const router = express.Router({ mergeParams: true })

router
  .route('/')
  .get(getAllReviews)
  .post(protect, restrictTo('user'), setTourUsersIds, createReview)

router
  .route('/:id')
  .get(getReviewByID)
  .patch(updateReview)
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteReview)

module.exports = router
