const express = require('express')
const {
  getAllTours,
  createTour,
  getTourByID,
  updateTour,
  deleteTour,
  aliasTopTours
} = require('./../controllers/tourController')

const router = express.Router()

router.route('/top-5-cheap').get(aliasTopTours, getAllTours)

router
  .route('/')
  .get(getAllTours)
  .post(createTour)

router
  .route('/:id')
  .get(getTourByID)
  .patch(updateTour)
  .delete(deleteTour)

module.exports = router
