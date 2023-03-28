const initialBlogs = [
  {
    title: 'How to cook',
    author: 'till',
    url: 'test 1',
    likes: 1
  },
  {
    title: 'Run faster',
    author: 'robin',
    url: 'test 2',
    likes: 4
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

module.exports = {
  initialBlogs,
  newBlog,
  newBlogWithoutLikes,
  newBlogWithoutTitle,
  newBlogWithoutUrl
}