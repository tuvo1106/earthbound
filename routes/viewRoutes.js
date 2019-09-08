const express = require('express')
const { getOverview, getTour } = require('./../controllers/viewsContoller')

const router = express.Router()

router.get('/', getOverview)
router.get('/tour', getTour)

module.exports = router
