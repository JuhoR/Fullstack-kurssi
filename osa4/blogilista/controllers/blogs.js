const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
    return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  const token = request.token //getTokenFrom(request)

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({error: "token missing or invalid"})
    }
    const user = await User.findById(decodedToken.id)//body.userId
    const blog = new Blog({
      title: body.title,
      url: body.url,
      author: body.author,
      likes: body.likes,
      user: user._id
    })
    const saved = await blog.save()
    user.blogs = user.blogs.concat(saved._id)
    await user.save()
    response.status(201).json(saved.toJSON())
  } catch(exception){
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const body = request.body
  const token = request.token
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({error: "token missing or invalid"})
    }
    const userid = decodedToken.id
    const blog = await Blog.findById(request.params.id)
    if (blog.user.toString() !== userid.toString()){
      return response.status(401).json({error: "user not authorized"})
    }
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch(exception){
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes
  }
  try {
    saved = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    response.status(200).json(saved.toJSON())
  } catch(exception){
    next(exception)
  }
})

module.exports = blogsRouter
