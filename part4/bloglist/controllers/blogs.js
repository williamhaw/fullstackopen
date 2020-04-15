const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('', async (request, response) => {
  const blogs = await Blog.find({})
  return response.json(blogs)
})

blogsRouter.post('', (request, response) => {
  const blog = new Blog(request.body)
  const result = blog.save()
  return response.status(201).json(result)
})

module.exports = blogsRouter