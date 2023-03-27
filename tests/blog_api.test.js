const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const initialBlogs = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('deleted')

  initialBlogs.forEach(async (blog) => {
    let blogObject = new Blog(blog)
    await blogObject.save()
    console.log('saved')
  })
  console.log('done')
}, 100000)

test('right amount of blogs are returned', async () => {
  const request = await api.get('/api/blogs')
  
  expect(request.body).toHaveLength(2)
})

afterAll(async () => {
  await mongoose.connection.close()
})