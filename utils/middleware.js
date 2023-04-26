const jwt = require('jsonwebtoken')

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

const getToken = request => {
  const authorization = request.get('authorization')

  if (authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }

  return
}

const tokenExtractor = (request, response, next) => {
  const decodedToken = jwt.verify(getToken(request), process.env.jwtSecret)

  request.token = decodedToken.id
  
  next()
}

module.exports = {
  errorHandler,
  tokenExtractor
}
