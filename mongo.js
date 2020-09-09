const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://violeta:${password}@cluster0.o6ftm.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

//Definir schema para una persona
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})
//Definir modelo
const Person = mongoose.model('Person', personSchema)

//Si se pasa un nombre y un nº, se añaden a la db. Si no, se muestran todos los contactos
if (process.argv[3] && process.argv[3]) {
  //crear nuevo objeto a partir del modelo
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })
  //save person
  person.save().then(result => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    //close connection
    mongoose.connection.close()
  })
} else {
  //fetch all
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}



