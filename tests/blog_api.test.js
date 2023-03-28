const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  helper.initialBlogs.forEach(async (blog) => {
    let blogObject = new Blog(blog)
    await blogObject.save()
  })
}, 100000)

test('right amount of blogs are returned', async () => {
  const request = await api.get('/api/blogs')
  
  expect(request.body).toHaveLength(2)
})

test('unique identifier property is named "id"', async () => {
  const request = await api.get('/api/blogs')

  expect(request.body[0].id).toBeDefined()
})

test('HTTP POST request to /api/blogs successfully creates a new blog post', async () => {
  const postRequest = await api.post('/api/blogs').send(helper.newBlog)
  const getRequest = await api.get('/api/blogs')

  const allBlogs = getRequest.body

  expect(allBlogs).toHaveLength(helper.initialBlogs.length + 1)
}, 100000)

test('if the likes property is missing it will default to the value 0', async () => {
  const postRequest = await api.post('/api/blogs').send(helper.newBlogWithoutLikes)

  const returnedData = postRequest.body

  expect(returnedData.likes).toBe(0)
})

afterAll(async () => {
  await mongoose.connection.close()
}, 100000)