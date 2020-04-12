require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

const Person = require('./models/person')

morgan.token('body', (req) => (JSON.stringify(req.body)))

app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)

const generateId = () => {
  return Math.floor(Math.random() * 45987235)
}

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  Person.find({})
    .then(persons => {
      res.json(persons)
    })
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'name or number missing'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
    id: generateId()
  })

  person.save().then((response) => {
    console.log('person saved!')
  })
  res.json(person)
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.find({ id: req.params.id })
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  Person.findOneAndDelete({ id: id }, (err) => { console.log(err) })
  res.status(204).end()
})

app.get('/info', (req, res) => {
  Person.find({})
    .then(persons => {
      res.send(`Phonebook has info for ${persons.length} people
        <p>${new Date()}</p>
      `)
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`)
})