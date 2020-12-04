const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const initialUsers = [
  {username: 'Juho' , name: 'Juho', passwordHash: '$2b$10$5GG5OEogSgVoy3LcRSy8le/yIHatz0pg6H5QDsNiqoGSuk6kANBMW'},
  {username: 'Petteri', name: 'Petteri', passwordHash: '$2b$10$5GG5OEogSgVoy3LcRSy8le/yIHatz0pg6H5QDsNiqoGSuk6kANBMW'},
  {username: 'hshshs', name: 'hs', passwordHash: '$2b$10$5GG5OEogSgVoy3LcRSy8le/yIHatz0pg6H5QDsNiqoGSuk6kANBMW'}
]

const api = supertest(app)

describe('Tests for adding users', () =>{
  beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(initialUsers)
  })

  afterAll(() => {
    mongoose.connection.close()
  })

  test('A good request', async () => {
    const user = {username: 'JuhoR', name: 'Juho', password:'perkele'}
    await api
      .post('/api/users')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/users')
    const names = response.body.map(u => u.username)
    expect(response.body.length).toBe(initialUsers.length + 1)
    expect(names).toContain('JuhoR')
  })

  test('username has to be unique', async () => {
    const user = {username: 'Juho', name:'Juho', password:'perkele'}

    await api
      .post('/api/users')
      .send(user)
      .expect(400)
    const response = await api.get('/api/users')
    expect(response.body.length).toBe(initialUsers.length) // check that nothing is added
  })

  test('username has to be at least 3 characters long', async () => {
    const user = {username: 'J', name: 'Juho', password:'perkele'}

    await api
      .post('/api/users')
      .send(user)
      .expect(400)

    const response = await api.get('/api/users')
    const names = response.body.map(u => u.name)
    expect(response.body.length).toBe(initialUsers.length) // check that nothing is added
    expect(names).not.toContain('J')
  })

  test('password has to be at least 3 characters long', async () => {
    const user = {username: 'JuhoR', name: 'Juho', password: 'k'}

    await api
      .post('/api/users')
      .send(user)
      .expect(400)
    const response = await api.get('/api/users')
    const names = response.body.map(u => u.name)
    expect(response.body.length).toBe(initialUsers.length)
    expect(names).not.toContain('JuhoR')
  })
})
