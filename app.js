const express = require('express')
const morgan = require('morgan')

const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

// start app
const app = express()

// middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
  app.use((req, res, next) => {
    req.requestTime = new Date().toISOString()
    next()
  })
}

app.use(express.json())
app.use(express.static(`${__dirname}/public/`))

// mounting routers
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

module.exports = app
