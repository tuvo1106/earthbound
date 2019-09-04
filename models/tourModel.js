const mongoose = require('mongoose')
const slugify = require('slugify')
const validator = require('validator')

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
      maxlength: [
        40,
        'A tour name must have less than or equal to 40 characters'
      ],
      minlength: [
        10,
        'A tour name must have more than or equal to 10 characters'
      ]
    },
    slug: {
      type: String
    },
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration']
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size']
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty must be: easy, medium, or difficult'
      }
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above than or equal to 1.0'],
      max: [5, 'Rating must be less than or equal to 5.0']
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price']
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // only works on new documents
          return val < this.price
        },
        message: 'Discount price ({VALUE}) should be below regular price'
      }
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description']
    },
    description: {
      type: String,
      trim: true
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image']
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now()
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false
    }
  },
  // options
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

// arrow functions do not get their own this keyword
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7
})

// document middleware; runs before save() command and create()
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true })
  next()
})

// query middleware to exclude secret tours
tourSchema.pre('/^find/', function (next) {
  this.find({ secretTour: { $ne: true } })
  next()
})

// aggregation middleware to exclude secret tours
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ match: { secretTour: { $ne: true } } })
  next()
})

const Tour = mongoose.model('Tour', tourSchema)

module.exports = Tour
