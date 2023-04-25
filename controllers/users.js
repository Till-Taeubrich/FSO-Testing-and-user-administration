const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')

  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, password, name, blogs } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    password: passwordHash,
    name,
    blogs: blogs
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter