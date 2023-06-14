const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {

  const { username, password } = request.body

  const user = await User.findOne({ username })
  const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.password)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const id = user._id

  const userForToken = {
    username: user.username,
    id
  }

  const token = jwt.sign(userForToken, process.env.jwtSecret)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name, userId: id })
})

module.exports = loginRouter