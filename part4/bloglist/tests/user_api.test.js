const bcrypt = require('bcrypt')
const User = require('../models/user')
const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')

const api = supertest(app)

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('getting all users results in that user', async () => {
    const result = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(result.body.length).toBe(1)
    expect(result.body[0].username).toBe('root')
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'why',
      name: 'whywhy',
      password: 'whysekret',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})

describe('when there is no user in the DB', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })

  test('creating user fails when username not given', async () => {
    const newUser = {
      password: "123456"
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('creating user fails when password not given', async () => {
    const newUser = {
      username: "123456"
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('creating user fails when username length < 3', async () => {
    const newUser = {
      username: "12",
      password: "123456"
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('creating user fails when password length < 3', async () => {
    const newUser = {
      username: "123456",
      password: "12"
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}