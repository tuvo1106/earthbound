const express = require('express')
const {
  getOverview,
  getTour,
  login,
  signUp,
  getAccount
} = require('./../controllers/viewsContoller')
const { isLoggedIn, protect } = require('./../controllers/authController')

const router = express.Router()

router.get('/', isLoggedIn, getOverview)
router.get('/tour/:slug', isLoggedIn, getTour)
router.get('/login', isLoggedIn, login)
router.get('/signup', isLoggedIn, signUp)
router.get('/me', protect, getAccount)

module.exports = router
