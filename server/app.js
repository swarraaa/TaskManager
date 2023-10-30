const express = require('express')
const connectDB = require('./db/connect')
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const tasks = require('./routes/tasks')
const app = express()
const cors = require('cors')
app.use(cors({ origin: '*' }))
require('dotenv').config()

//middleware
app.use(express.static('./public'))
app.use(express.json())

//routes
app.use('/api/v1/tasks', tasks)
app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, console.log(`app listening at port ${port}`))
  } catch (err) {
    console.log(err)
  }
}

start()
