const User = require('../models/user')

// blogs
const initialBlogs = [
  {
    title: 'How to cook',
    author: 'till',
    url: 'test 1',
    likes: 1,
    id: '123'
  },
  {
    title: 'Run faster',
    author: 'robin',
    url: 'test 2',
    likes: 4,
    id: '321'
  }
]

const newBlog = {
  "title": "test",
  "author": "test",
  "url": "test",
  "likes": 0
}

const newBlogWithoutLikes = {
  "title": "test",
  "author": "test",
  "url": "test"
}

const newBlogWithoutTitle = {
  "author": "test",
  "url": "test",
  "likes": 0
}

const newBlogWithoutUrl = {
  "title": "test",
  "author": "test",
  "likes": 0
}

// users
const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const initialUsers = {
  username: 'till',
  name: 'Till',
  password: 'wurst',
}

module.exports = {
  initialBlogs,
  newBlog,
  newBlogWithoutLikes,
  newBlogWithoutTitle,
  newBlogWithoutUrl,
  usersInDb,
  initialUsers
}