const express = require('express')
const { getCheckoutSession } = require('./../controllers/bookingController')
const { protect, restrictTo } = require('./../controllers/authController')

const router = express.Router()

// not RESTful
router.get('/checkout-session/:tourId', protect, getCheckoutSession)

module.exports = router
