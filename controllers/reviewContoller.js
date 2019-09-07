const Review = require('./../models/reviewModel')
const {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll
} = require('./handlerFactory')

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

exports.getAllReviews = getAll(Review)
exports.getReviewByID = getOne(Review)
exports.createReview = createOne(Review)
exports.updateReview = updateOne(Review)
exports.deleteReview = deleteOne(Review)
