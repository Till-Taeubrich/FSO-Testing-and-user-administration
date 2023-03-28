const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const initialBlogs = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  initialBlogs.forEach(async (blog) => {
    let blogObject = new Blog(blog)
    await blogObject.save()
  })
})

test('right amount of blogs are returned', async () => {
  const request = await api.get('/api/blogs')
  
  expect(request.body).toHaveLength(2)
})

test('unique identifier property is named "id"', async () => {
  const request = await api.get('/api/blogs')

  expect(request.body[0].id).toBeDefined()
})

test.only('HTTP POST request to /api/blogs successfully creates a new blog post', async () => {
  const newBlog = {
    "title": "test",
    "author": "test",
    "url": "test",
    "likes": 0
  }

  const postRequest = await api.post('/api/blogs').send(newBlog)
  const getRequest = await api.get('/api/blogs')

  const allBlogs = getRequest.body

  expect(allBlogs).toHaveLength(initialBlogs.length + 1)
}, 100000)

afterAll(async () => {
  await mongoose.connection.close()
}, 100000)