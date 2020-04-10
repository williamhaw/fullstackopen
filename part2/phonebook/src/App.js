import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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
      window.alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = { name: newName, number: newNumber }
      setPersons(persons.concat([newPerson]))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleNewFilter={handleNewFilter} />
      <h3>Add New Person</h3>
      <PersonForm newName={newName} newNumber={newNumber} handleNewName={handleNewName} handleNewNumber={handleNewNumber} addNewPerson={addNewPerson} />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} />
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

const Persons = ({ persons, filter }) => (
  <div>
    {persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase())).map(p => <p key={p.name}>{p.name} {p.number}</p>)}
  </div>
)

export default App
