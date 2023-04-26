const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => {
    return new Blog(blog)
  })

  const promiseArray = blogObjects.map(async (blog) => {
    await blog.save()
  })

  await Promise.all(promiseArray);
})

test('right amount of blogs are returned', async () => {
  const request = await api.get('/api/blogs')

  expect(request.body).toHaveLength(2)
})

test('unique identifier property is named "id"', async () => {
  const request = await api.get('/api/blogs')

  expect(request.body[0].id).toBeDefined()
})

test('HTTP POST request to /api/blogs successfully creates a new blog post', async () => {

  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("randomPassword", 10);
  const user = await new User({ username: "name", password: passwordHash }).save();

  const userForToken = { username: user.username, id: user.id };

  const token = jwt.sign(userForToken, process.env.jwtSecret);

  await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(helper.newBlog)

  const getRequest = await api.get('/api/blogs')

  const allBlogs = getRequest.body

  expect(allBlogs).toHaveLength(helper.initialBlogs.length + 1)
}, 100000)

test('adding blog with wrong token responds with status code 401', async () => {
  const postRequestWithWrongToken = await api.post('/api/blogs').send(helper.newBlog)

  expect(postRequestWithWrongToken.status).toBe(401)
}, 100000)

test('if the likes property is missing it will default to the value 0', async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("randomPassword", 10);
  const user = await new User({ username: "name", password: passwordHash }).save();

  const userForToken = { username: user.username, id: user.id };

  const token = jwt.sign(userForToken, process.env.jwtSecret);

  const postRequest = await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(helper.newBlogWithoutLikes)

  const returnedData = postRequest.body

  expect(returnedData.likes).toBe(0)
})

test('if title property is missing respond with status 400 Bad Request.', async () => {
  const postRequest = await api.post('/api/blogs').send(helper.newBlogWithoutTitle)

  expect(postRequest.status).toBe(400);
}, 100000)

test('if url property is missing respond with status 400 Bad Request.', async () => {
  const postRequest = await api.post('/api/blogs').send(helper.newBlogWithoutUrl)

  expect(postRequest.status).toBe(400);
}, 100000)

test('respond with status 204 after removing single blog', async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash("randomPassword", 10);
  const user = await new User({ username: "name", password: passwordHash }).save();
  const userForToken = { username: user.username, id: user.id };

  const token = jwt.sign(userForToken, process.env.jwtSecret);
  await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(helper.newBlog)

  const allBlogs = await api.get('/api/blogs')
  const blogToDelete = allBlogs.body[2];

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204)

}, 100000)

test('put request updates "likes" property', async () => {
  const allBlogs = await api.get('/api/blogs')
  const blogToUpdate= allBlogs.body[1];
  const newLikesData = {
    "likes": 1
  }

  const updatedBlog = await api.put(`/api/blogs/${blogToUpdate.id}`).send(newLikesData)

  const newLikeAmount = updatedBlog.body.likes;

  expect(newLikeAmount).toBe(1)
}, 100000)

afterAll(async () => {
  await mongoose.connection.close()
}, 100000)