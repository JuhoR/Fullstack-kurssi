const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body
    if (body.password.length < 3) {
      response.status(400).json({ error: 'Password too short' })
    }
    const passwordHash = await bcrypt.hash(body.password, 10)
    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash
    })

    const saved = await user.save()

    response.json(saved)
  } catch (exception) {
    next(exception)
  }
})

usersRouter.get('/', async (request, response, next) => {
  const users = await User.find({}).populate('blogs', {url: 1, title: 1, author: 1})
  response.json(users.map(user => user.toJSON()))
})

module.exports = usersRouter
