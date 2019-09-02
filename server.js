const mongoose = require('mongoose')
const dotenv = require('dotenv')
// link env variables
dotenv.config({ path: './config.env' })

const app = require('./app')

// print env variables
// console.log(process.env)

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
    // console.log(con.connections)
    console.log('DB connection successful!')
  })

// start server
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`app running on port ${port}...`)
})
