const express = require('express')
const {
  getAllTours,
  createTour,
  getTourByID,
  updateTour,
  deleteTour,
  checkID
} = require('./../controllers/tourController')

const router = express.Router()

router.param('id', checkID)

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
