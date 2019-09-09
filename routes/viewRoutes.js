const express = require('express')
const {
  getOverview,
  getTour,
  login
} = require('./../controllers/viewsContoller')

const router = express.Router()

router.get('/', getOverview)
router.get('/tour/:slug', getTour)
router.get('/login', login)

module.exports = router
