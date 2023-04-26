const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

const getToken = request => {
  const authorization = request.get('authorization')

  if (authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }

  return
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {

  if (!request.token) {
    return response.status(401).json({ error: 'token invalid' })
  }

  let blog = new Blog(request.body)

  blog.user = request.token

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

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const newBlogData = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlogData, {new: true})

  response.json(updatedBlog)
})

module.exports = blogsRouter 