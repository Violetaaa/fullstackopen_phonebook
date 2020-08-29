const express = require('express')
const app = express()

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

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

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



const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})