const express = require('express')
const morgan = require('morgan');
const app = express()
app.use(morgan(tiny));
app.use(express.json())

let persons = [
    {
        id: 1,
        name: "Pepe",
        number: "000000000",
      },
      {
        id: 2,
        name: "Pepa",
        number: "000000001",
      },
      {
        id: 3,
        name: "Pepito2",
        number: "123",
      }
]
//diaplay all
app.get('/api/persons', (req, res) => {
  res.json(persons)
})

//diaplay info
app.get('/api/info', (req, res) => {
  const data = `
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>
  `
  res.send(data)
  })

//display a single phonebook entry
app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  
  if(person){
    res.json(person) 
  } else {
    res.status(404).end()
  }
})

//delete a single phonebook entry 
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})

//add a new phonebook entrie
app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).json({ 
      error: 'name missing' 
    })
  }

  if (!body.number) {
    return res.status(400).json({ 
      error: 'number missing' 
    })
  }

  if(persons.find(person => person.name === body.name)){
    return res.status(400).json({ 
      error: 'name already exists' 
    })
  }
  
  const person = {
    id: Math.floor(Math.random() * 1000000),
    name: body.name,
    number: body.number
  }

  // console.log(person)
  persons = persons.concat(person)
  
  res.json(person)
})

const morgan = (req, res) => {

}

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


