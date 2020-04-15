const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as JSON array', async () => {
  const response = await api.get('/api/blogs')
  expect(response.status).toBe(200)
  expect(response.body).toHaveLength(1)
  expect(response.body[0]).toEqual({
    "_id": "5e9580d2b5189811dc752af5",
    "title": "Go To Statement Considered Harmful",
    "author": "Edsger W. Dijkstra",
    "url": "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    "likes": 5,
    "__v": 0
  })
})

afterAll(() => {
  mongoose.connection.close()
})