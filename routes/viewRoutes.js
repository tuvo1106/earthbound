const express = require('express')
const {
  getOverview,
  getTour,
  login,
  signUp,
  getAccount,
  updateUserData,
  getMyTours
} = require('./../controllers/viewsContoller')
const { isLoggedIn, protect } = require('./../controllers/authController')
const { createBookingCheckout } = require('./../controllers/bookingController')

const router = express.Router()

router.get('/', createBookingCheckout, isLoggedIn, getOverview)
router.get('/tour/:slug', isLoggedIn, getTour)
router.get('/login', isLoggedIn, login)
router.get('/signup', isLoggedIn, signUp)
router.get('/me', protect, getAccount)
router.get('/my-tours', protect, getMyTours)

router.post('/submit-user-data', protect, updateUserData)

module.exports = router
