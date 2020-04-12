const mongoose = require('mongoose')

const generateId = () => {
  return Math.floor(Math.random() * 45987235)
}

if (process.argv.length < 3) {
  console.log('Not enough parameters')
  process.exit(1)
} else {
  const password = process.argv[2]
  const mongoConnectionUrl = `mongodb+srv://phonebook-user:${password}@cluster0-ilhjx.mongodb.net/phonebook-app?retryWrites=true&w=majority`

  mongoose.connect(mongoConnectionUrl, { useNewUrlParser: true, useUnifiedTopology: true })

  const personSchema = new mongoose.Schema({
    name: String,
    number: String
  })

  personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  const Person = mongoose.model('Person', personSchema)


  if (process.argv.length === 3) {
    //get all entries from db
    Person.find({}).then(result => {
      result.forEach(p => console.log(p))
      mongoose.connection.close()
    })

  } else if (process.argv.length === 5) {
    //add new person to MongoDB
    const newName = process.argv[3]
    const newNumber = process.argv[4]

    const person = new Person({
      name: newName,
      number: newNumber
    })

    person.save().then(response => {
      console.log(`person saved!`)
      mongoose.connection.close()
    })

  }
}