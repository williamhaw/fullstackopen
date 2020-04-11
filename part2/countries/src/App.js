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

  return (
    <div>
      <div>find countries <input value={countryName} onChange={handleCountryName} /></div>
      <Countries countries={countries} />
    </div>
  )
}

const Countries = ({ countries }) => {

  const [selectedCountry, setSelectedCountry] = useState({})

  const handleSelectedCountry = (country) => {
    setSelectedCountry(country)
  }

  if (countries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else if (countries.length > 1) {
    return (
      <div>
        {countries.map(c => <p>{c.name} <button onClick={() => handleSelectedCountry(c)}>show</button></p>)}
        {JSON.stringify(selectedCountry) !== '{}' && <CountryDetails country={selectedCountry} />}
      </div>
    )
  } else if (countries.length === 1) {
    const country = countries[0]
    return (
      <CountryDetails country={country} />
    )
  }
  else {
    return ('')
  }
}

const CountryDetails = ({ country }) => {

  const [weather, setWeather] = useState({})
  useEffect(() => {
    axios
      .get(encodeURI(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_API_KEY}&query=${country.name}`))
      .then(response => setWeather(response.data))
  }, [country])

  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>Languages</h2>
      <ul>
        {country.languages.map(l => <li>{l.name}</li>)}
      </ul>
      <img src={country.flag} width='100px' height='100px' />
      {JSON.stringify(weather) !== '{}' && <Weather countryName={country.name} weather={weather}/>}
    </div>
  )
}

const Weather = ({countryName, weather}) => (
  <div>
    <h2>Weather in {countryName}</h2>
      <p><b>temperature:</b> {weather.current.temperature}° Celsius</p>
      <img src={weather.current.weather_icons[0]} />
      <p><b>wind:</b> {weather.current.wind_speed}mph, direction {weather.current.wind_dir}</p>
  </div>
)

export default App;
