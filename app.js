const fs = require('fs')
const express = require('express')

const app = express()
// middleware
app.use(express.json())

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
)

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  })
})

app.post('/api/v1/tours', (req, res) => {
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
})

const port = 3000
app.listen(port, () => {
  console.log(`app running on port ${port}...`)
})
