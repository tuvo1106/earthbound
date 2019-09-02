const dotenv = require('dotenv')
// link env variables
dotenv.config({ path: './config.env' })

const app = require('./app')

// print env variables
// console.log(process.env)

// start server
const port = process.env.PORT
app.listen(port, () => {
  console.log(`app running on port ${port}...`)
})
