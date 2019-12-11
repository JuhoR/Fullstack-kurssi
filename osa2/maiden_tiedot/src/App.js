import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FilterForm from './components/FilterForm'
import Countries from './components/Countries'

const App = () => {
  const [newFilter, setNewFilter] = useState('')
  const [countries, setCountries] = useState([])
  // Haetaan maat palvelimelta
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  // Hakukentän muutoksen tapahtumakäsittelijä
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  // valitaan näytettävät maat
  const shownCountries = countries.filter(
    p => p.name.toLowerCase().includes(newFilter.toLowerCase())
  )
  return (
    <div>
    <FilterForm filter={newFilter} handler={handleFilterChange} />
    <Countries countries={shownCountries} filterChanger={setNewFilter}/>
    </div>
  )
}

export default App;
