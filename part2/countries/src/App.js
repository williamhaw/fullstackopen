import React, { useState, useEffect } from 'react';
import axios from 'axios'

const App = () => {

  const [countryName, setCountryName] = useState('')

  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get(`https://restcountries.eu/rest/v2/name/${countryName}`)
      .then(response => {
        console.log(response.data)
        setCountries(response.data)
      })
  }, [countryName])

  const handleCountryName = (event) => {
    console.log(event.target.value)
    setCountryName(event.target.value)
  }

  const countrydetails = () => {
    if (countries.length > 10) {
      return (
        <p>Too many matches, specify another filter</p>
      )
    } else if (countries.length > 1) {
      return (
        <div>
          {countries.map(c => <p>{c.name}</p>)}
        </div>
      )
    } else if (countries.length === 1) {
      const country = countries[0]
      return (
        <div>
          <h1>{country.name}</h1>
          <p>capital {country.capital}</p>
          <p>population {country.population}</p>
          <h2>Languages</h2>
          <ul>
            {country.languages.map(l => <li>{l.name}</li>)}
          </ul>
          <img src={country.flag} width='100px' height='100px'/> 
        </div>
      )
    }

  }

  return (
    <div>
      <div>find countries <input value={countryName} onChange={handleCountryName} /></div>
      {countrydetails()}
    </div>
  )
}

export default App;
