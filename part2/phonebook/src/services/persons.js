import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons/'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newPerson => {
  return axios.post(baseUrl, newPerson)
}

const deletePerson = id => {
  return axios.delete(baseUrl + id.toString())
}

const replacePerson = person => {
  return axios.put(baseUrl + person.id.toString(), person)
}

export default { getAll, create, deletePerson, replacePerson }