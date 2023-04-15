const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')

beforeEach(async () => {
  await User.deleteMany()
  await User.insertMany(helper.initialUsers)
})

test('creation fails with proper statuscode and message if username already taken', async () => {
  const usersAtStart = await helper.usersInDb()

  const newUser = {
    username: 'tillo',
    name: 'Till',
    password: 'wurst',
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

    console.log(result.body.error);

  expect(result.body.error).toContain('expected `username` to be unique')

  const usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd).toEqual(usersAtStart)
})