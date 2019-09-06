const express = require('express')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')

const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')
const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

// start app
const app = express()

// global middleware
// set security HTTP headers
app.use(helmet())
// development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
  app.use((req, res, next) => {
    req.requestTime = new Date().toISOString()
    next()
  })
}

// limit requests from same IP
const limiter = rateLimit({
  // 100 requests per hour
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
})
app.use('/api', limiter)

// body parser, limit to only 10kb
app.use(express.json({ limit: '10kb' }))

// sanitize against NoSQL query injections
app.use(mongoSanitize())

// remove scripts from html
app.use(xss())

// prevent parameter pollution
app.use(
  hpp({
    // allow for duplicate in query string
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price'
    ]
  })
)

// serve static file
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
