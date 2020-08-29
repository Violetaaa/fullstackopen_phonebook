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

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})