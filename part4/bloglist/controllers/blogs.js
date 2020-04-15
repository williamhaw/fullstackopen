const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogsRouter.get('', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    return response.json(blogs)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.post('', async (request, response, next) => {
  try{
  logger.info(request.body)
  const blog = new Blog(request.body)
  const result = await blog.save()
  return response.status(201).json(result)
  }catch(exception){
    next(exception)
  }
})

module.exports = blogsRouter