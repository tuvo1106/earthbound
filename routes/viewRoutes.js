const express = require('express')
const { getOverview, getTour } = require('./../controllers/viewsContoller')

const router = express.Router()

router.get('/', getOverview)
router.get('/tour/:slug', getTour)

module.exports = router
