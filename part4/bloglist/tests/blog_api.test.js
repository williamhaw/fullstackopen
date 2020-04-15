const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blog = new Blog(initialBlogs[0])
  await blog.save()
  blog = new Blog(initialBlogs[1])
  await blog.save()
})

test('Two blogs are returned as JSON when there are two blogs in the database', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  expect(response.body).toHaveLength(2)
})

test('blogs are returned as JSON array', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach(blog => {
    expect(blog.id).toBeDefined()
  })
})

test('when blog post is added through POST, the database has one more blog', async () => {
  const newBlog = {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2
  }

  await api.post('/api/blogs').send(newBlog)
  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(initialBlogs.length + 1)
})

test('when blog post is added through POST without likes, the likes count defaults to 0', async () => {
  const newBlog = {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html"
  }

  const response = await api.post('/api/blogs').send(newBlog)
  expect(response.body.likes).toBe(0)
})

test('when blog post is added through POST without title and url, a 400 error is returned', async () => {
  const newBlog = {
    author: "Robert C. Martin",
    likes: 2
  }

  const response = await api.post('/api/blogs').send(newBlog)
  expect(response.status).toBe(400)
})

test('when one blog post is deleted, the number of blog posts is lower by one', async () => {
  const initialResponse = await api.get('/api/blogs')
  const idToDelete = initialResponse.body[0].id
  await api.delete(`/api/blogs/${idToDelete}`).expect(204)
  const afterDeletionResponse = await api.get('/api/blogs')
  expect(afterDeletionResponse.body.length).toBe(initialBlogs.length - 1)
})

test('when the blog is updated, the change is reflected', async () => {
  const initialResponse = await api.get('/api/blogs')
  const updatedBlog = initialResponse.body[0]
  const oldLikes = updatedBlog.likes
  updatedBlog.likes = oldLikes + 1
  await api.put(`/api/blogs/${updatedBlog.id}`).send(updatedBlog).expect(200)
  const afterDeletionResponse = await api.get('/api/blogs')
  expect(afterDeletionResponse.body[0].likes).toBe(oldLikes + 1)
})

afterAll(() => {
  mongoose.connection.close()
})