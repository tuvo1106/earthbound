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

router.use(protect)

router
  .route('/')
  .get(getAllReviews)
  .post(restrictTo('user'), setTourUsersIds, createReview)

router
  .route('/:id')
  .get(getReviewByID)
  .patch(restrictTo('user', 'admin'), updateReview)
  .delete(restrictTo('user', 'admin'), deleteReview)

module.exports = router
