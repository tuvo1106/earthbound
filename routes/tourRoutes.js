const express = require('express')
const {
  getAllTours,
  createTour,
  getTourByID,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan
} = require('./../controllers/tourController')
const { protect } = require('./../controllers/authController')

const router = express.Router()

router.route('/top-5-cheap').get(aliasTopTours, getAllTours)
router.route('/tour-stats').get(getTourStats)
router.route('/monthly-plan/:year').get(getMonthlyPlan)

router
  .route('/')
  .get(protect, getAllTours)
  .post(createTour)

router
  .route('/:id')
  .get(getTourByID)
  .patch(updateTour)
  .delete(deleteTour)

module.exports = router
