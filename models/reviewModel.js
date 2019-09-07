const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review cannot be empty!']
    },
    rating: {
      type: Number,
      min: [1, 'Rating must be above than or equal to 1.0'],
      max: [5, 'Rating must be less than or equal to 5.0']
    },
    createdDate: {
      type: Date,
      default: Date.now()
    },
    // parent referencing
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour']
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review
