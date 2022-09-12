const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const connectDB = require('./config/db')
const { errorHandler } = require('./middlewares/errorMiddleware')
connectDB()
const app = express()
const port = process.env.PORT || 3000
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api/goals', require('./routes/goalRoutes'))
app.use(errorHandler)
app.listen(port, () => console.log(`Server started on port ${port}`))