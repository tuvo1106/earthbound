const express = require('express')
const {
  getAllTours,
  createTour,
  getTourByID,
  updateTour,
  deleteTour,
  checkBody
} = require('./../controllers/tourController')

const router = express.Router()

router
  .route('/')
  .get(getAllTours)
  .post(checkBody, createTour)

router
  .route('/:id')
  .get(getTourByID)
  .patch(updateTour)
  .delete(deleteTour)

module.exports = router
