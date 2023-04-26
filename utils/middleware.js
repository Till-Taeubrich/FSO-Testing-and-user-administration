const jwt = require('jsonwebtoken')
const User = require('../models/user')

const errorHandler = (error, request, response, next) => {

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name ===  'JsonWebTokenError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

const getToken = (authorization) => {

  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }

  return
}

const userExtractor = async (request, response, next) => {
  const authorization = request.get('authorization')

  if (authorization) {
    const decodedToken = jwt.verify(getToken(authorization), process.env.jwtSecret)
    const currentUser = await User.findById(decodedToken.id)

    if (currentUser) {
      request.user = currentUser
      console.log(currentUser);
      request.userId = currentUser._id.toString()
    }
  }

  next()
}

module.exports = {
  errorHandler,
  userExtractor
}
