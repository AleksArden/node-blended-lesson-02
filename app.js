const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
require('dotenv').config()

const booksRouter = require('./routers/booksRouter')

const runServer = async () => {
  const app = express()

  app.use(express.json())
  app.use(cors())
  app.use(morgan())

  app.use('/api/books', booksRouter)
  try {

    await mongoose.connect(process.env.MONGO_URL)

    app.listen(process.env.PORT, () => {
      console.log('Server running. Port: 8080')
    })
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

runServer()