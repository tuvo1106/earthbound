const express = require('express')
const morgan = require('morgan')

const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

// start app
const app = express()

// middleware
app.use(morgan('dev'))
app.use(express.json())
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  next()
})

// mounting routers
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

// start server
const port = 3000
app.listen(port, () => {
  console.log(`app running on port ${port}...`)
})
