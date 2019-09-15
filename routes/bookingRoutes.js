const express = require('express')
const {
  getCheckoutSession,
  getAllBookings,
  getBookingByID,
  createBooking,
  updateBooking,
  deleteBooking
} = require('./../controllers/bookingController')
const { protect, restrictTo } = require('./../controllers/authController')

const router = express.Router()
router.use(protect)

// not RESTful
router.get('/checkout-session/:tourId', getCheckoutSession)

router.use(restrictTo('admin', 'lead-guide'))

router
  .route('/')
  .get(getAllBookings)
  .post(createBooking)

router
  .route('/:id')
  .get(getBookingByID)
  .patch(updateBooking)
  .delete(deleteBooking)

module.exports = router
