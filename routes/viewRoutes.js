const express = require('express')
const {
  getOverview,
  getTour,
  login,
  signUp
} = require('./../controllers/viewsContoller')
const { isLoggedIn } = require('./../controllers/authController')

const router = express.Router()
router.use(isLoggedIn)

router.get('/', getOverview)
router.get('/tour/:slug', getTour)
router.get('/login', login)
router.get('/signup', signUp)

module.exports = router
