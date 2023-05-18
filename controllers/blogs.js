const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  let blog = new Blog(request.body)

  if (!blog.url || !blog.title) {
    response.status(400).end()
  } else if (!request.userId) {
    response.status(401).end()
  } else {
    blog.user = request.userId

    if(blog.likes === undefined) {
      blog.likes = 0
    }

    const result = await blog.save()
    response.status(201).json(result)
  }

})

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    response.status(404).end()
  }

  const blogOwnerId = blog.user.toString()

  if (request.userId !== blogOwnerId) {
    response.status(403).end()
    return
  }

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