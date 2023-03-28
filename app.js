const http = require('http')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')

mongoose.connect(config.mongoUrl)

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

module.exports = app