const express = require('express')
const morgan = require('morgan')

const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')
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

// all other routes
app.all('*', (req, res, next) => {
  // if anything is passed into next, it will assume there is an error and send
  // error to global error middleware
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
})

// 4 parameters means global error middleware
app.use(globalErrorHandler)

module.exports = app
