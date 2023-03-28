const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  let blog = new Blog(request.body)

  if(blog.likes === undefined) {
    blog.likes = 0
  }

  if (blog.url === undefined || blog.title === undefined) {
    response.status(400).end()
  } else {
    const result = await blog.save()
    response.status(201).json(result)
  }

})

module.exports = blogsRouter 