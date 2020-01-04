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
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
  //let blogObject = new Blog(initialBlogs[0])
  //await blogObject.save()

  //blogObject = new Blog(initialBlogs[1])
  //await blogObject.save()
})

test('Data returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('All blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(initialBlogs.length)
})

test('Blogs have an id field', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('A blog can be added to the database by a post method', async () => {
  const newBlog = {
    title: 'something inappropriate',
    author: 'Juho',
    url: 'xxyy.zz',
    likes: 666
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const titles = response.body.map(r => r.title)
  expect(response.body.length).toBe(initialBlogs.length + 1)
  expect(response.body[2].id).toBeDefined()
  expect(titles).toContain('something inappropriate')
})

test('If no initial likes given, likes initialized to zero', async () => {
  const newBlog = {
    title: 'something inappropriate',
    author: 'Juho',
    url: 'xxyy.zz',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)

  const response = await api.get('/api/blogs')
  const likes = response.body[initialBlogs.length].likes
  expect(likes).toEqual(0)
})

test('Status code 400 if title or url field missing', async () => {
  const newBlog = {
    author: 'Juho',
    likes: 0
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('Deleted object not in database', async () => {
  let response = await api.get('/api/blogs')
  const id = response.body[1].id
  await api
    .delete(`/api/blogs/${id}`)
    .expect(204)
  response = await api.get('/api/blogs')
  const ids = response.body.map(b => b.id)
  expect(response.body.length).toBe(initialBlogs.length-1)
  expect(ids).not.toContain(id)
})

test('A database entry can be updated using the put method', async () => {
  newBlog = {
    title: 'aaaa',
    author: 'bbbb',
    url: 'cccc',
    likes: 999
  }
  let response = await api.get('/api/blogs')
  const id = response.body[1].id
  await api
    .put(`/api/blogs/${id}`)
    .send(newBlog)
    .expect(200)
  response = await api.get('/api/blogs')
  expect(response.body[1].title).toBe(newBlog.title)
  expect(response.body[1].likes).toBe(newBlog.likes)
})
afterAll(() => {
  mongoose.connection.close()
})
