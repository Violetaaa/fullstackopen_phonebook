
const express = require('express')
const morgan = require('morgan')
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config()
const Person = require('./models/person')

app.use(bodyParser.json())
app.use(express.static('build'))
app.use(express.json())

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body-content'))

morgan.token('body-content', function (req, res) {
  const person = {
    name: req.body.name,
    number: req.body.number
  }
  return JSON.stringify(person)
})

//get all
app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons.map(person => person.toJSON()))
  })
})

//display info
app.get('/api/info', (req, res, next) => {
  Person
    .find()
    .then(persons => {
      res.send(`Phonebook has info for ${persons.length} people. </br> ${Date()}`)
    })
    .catch(error => next(error))
})

//display a single phonebook entry
app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

//update number
app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number,
  }
  //On update operations mongoose validators are off by default. To enable them -->> { runValidators: true }
  Person.findByIdAndUpdate(req.params.id, person, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      res.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})

//delete a single phonebook entry
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(res => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

//add a new phonebook entrie
app.post('/api/persons', (req, res, next) => {
  const body = req.body

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person
    .save()
    .then(savedPerson => savedPerson.toJSON())
    .then(savedAndFormattedPerson => {
      res.json(savedAndFormattedPerson)
    })
    .catch(error => next(error))
})


const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


