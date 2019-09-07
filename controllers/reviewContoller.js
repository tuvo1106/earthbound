const Review = require('./../models/reviewModel')
const catchAsync = require('./../utils/catchAsync')
const AppError = require('./../utils/appError')
const { deleteOne, updateOne, createOne } = require('./handlerFactory')

exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {}
  if (req.params.tourId) {
    filter = { tour: req.params.tourId }
  }

  const reviews = await Review.find(filter)

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews
    }
  })
})

exports.getReviewByID = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id)
  if (!review) {
    return next(new AppError('No review found with that ID', 404))
  }
  res.status(200).json({
    status: 'success',
    data: {
      review
    }
  })
})

exports.setTourUsersIds = (req, res, next) => {
  // allow nested route
  if (!req.body.tour) {
    req.body.tour = req.params.tourId
  }
  if (!req.body.user) {
    req.body.user = req.user.id
  }
  next()
}

exports.createReview = createOne(Review)
exports.updateReview = updateOne(Review)
exports.deleteReview = deleteOne(Review)
