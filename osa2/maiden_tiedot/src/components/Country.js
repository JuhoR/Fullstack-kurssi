import React from 'react'
import Weather from './Weather'

const Country = ({country}) => {

  const languages = () => {
    return (
      country.languages.map((language, i) => <li key={i}>{language.name}</li>)
    )
  }
  return (
    <div>
      <h2>{country.name}</h2>
      <p>Capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {languages()}
      </ul>
      <img src={country.flag} alt={"The flag of "+ country.name} height="52"/>
      <Weather country={country} />
    </div>
  )
}

export default Country
