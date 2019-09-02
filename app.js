const fs = require('fs')
const express = require('express')

const app = express()
// middleware
app.use(express.json())

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
)

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  })
};

const getTourByID = (req, res) => {
  // console.log(req.params); { id: 5 }
  // convert string to number
  const id = req.params.id * 1

  // find element in tours array
  const tour = tours.find(el => el.id === id)
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid ID'
    })
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: tour
    }
  })
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1
  const newTour = Object.assign({ id: newId }, req.body)
  tours.push(newTour)
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      if (err) console.log('file not found')
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      })
    }
  )
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid ID'
    })
  }
  // will not implement patch with local storage
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<updated tour'
    }
  })
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid ID'
    })
  }
  // will not implement patch with local storage
  // 204 means no content
  res.status(204).json({
    status: 'success',
    data: null
  })
};

app
  .route('/api/v1/tours')
  .get(getAllTours)
  .post(createTour)

app
  .route('/api/v1/tours/:id')
  .get(getTourByID)
  .patch(updateTour)
  .delete(deleteTour)

const port = 3000
app.listen(port, () => {
  console.log(`app running on port ${port}...`)
})
