import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  useEffect(() => {
    personService
      .getAll()
      .then(response => setPersons(response.data))
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const [message, setMessage] = useState(null)

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNewFilter = (event) => {
    setFilter(event.target.value)
  }

  const addNewPerson = (event) => {
    event.preventDefault()
    console.log(event.target)
    if (persons.find(p => p.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = { ...persons.find(p => p.name === newName) }
        person.number = newNumber
        personService
          .replacePerson(person)
          .then(() => {
            personService
              .getAll()
              .then(response => setPersons(response.data))
              .then(() => {
                setNewName('')
                setNewNumber('')
                setMessage({ message: `Changed number for ${newName}`, isSuccess: true })
                setTimeout(() => {
                  setMessage(null)
                }, 5000)
              })

          })
          .catch(error => {
            setMessage({ message: `Information of ${newName} has already been removed from server`, isSuccess: false })
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      }
    } else {
      const newPerson = { name: newName, number: newNumber }
      personService
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat([response.data]))
          setNewName('')
          setNewNumber('')
          setMessage({ message: `Added ${newName}`, isSuccess: true })
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          console.log(error.response.data)
          let errorMessage = error.response.data
          if(errorMessage.error){
            errorMessage = errorMessage.error
          }
          setMessage({ message: `${errorMessage}`, isSuccess: false })
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  }

  const handleDeletion = (id) => {
    if (window.confirm(`Delete ${persons.find(p => p.id === id).name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          personService
            .getAll()
            .then(response => setPersons(response.data))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filter={filter} handleNewFilter={handleNewFilter} />
      <h3>Add New Person</h3>
      <PersonForm newName={newName} newNumber={newNumber} handleNewName={handleNewName} handleNewNumber={handleNewNumber} addNewPerson={addNewPerson} />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} handleDeletion={handleDeletion} />
    </div>
  )
}

const Filter = ({ filter, handleNewFilter }) => (
  <div>filter shown with <input value={filter} onChange={handleNewFilter} /></div>
)

const PersonForm = ({ newName, newNumber, handleNewName, handleNewNumber, addNewPerson }) => (
  <form onSubmit={addNewPerson}>
    <div>
      name: <input value={newName} onChange={handleNewName} />
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNewNumber} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Persons = ({ persons, filter, handleDeletion }) => (
  <div>
    {persons
      .filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
      .map(p => <p key={p.name}>{p.name} {p.number} <button onClick={() => handleDeletion(p.id)}>delete</button></p>)}
  </div>
)

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  const messageClass = message.isSuccess ? "success" : "error"

  return (
    <div className={messageClass}>
      {message.message}
    </div>
  )
}

export default App
