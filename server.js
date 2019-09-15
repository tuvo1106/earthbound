const mongoose = require('mongoose')
const dotenv = require('dotenv')

// listen to uncaught exceptions
process.on('uncaughtException', err => {
  console.log('Uncaught Exception!')
  console.log(err.name, err.message)
  process.exit(1)
})

// link env variables
dotenv.config({ path: './config.env' })
const app = require('./app')

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
)

// returns a promise
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(con => {
    console.log('⚙️  DB connection successful! ⚙️')
  })
  .catch(err => {
    console.log('💥  DB connection not successful! 💥')
    console.log(err)
    process.exit(1)
  })

// start server
const port = process.env.PORT || 3000
const server = app.listen(port)

// listen to rejected promises
process.on('unhandledRejection', err => {
  console.log('Unhandled Rejection!')
  console.log(err.name, err.message)
  server.close(() => {
    process.exit(1)
  })
})

process.on('SIGTERM', () => {
  console.log('SIGTERM RECIEVED. Shutting down gracefully.')
  server.close(() => {
    process.exit(1)
  })
})
