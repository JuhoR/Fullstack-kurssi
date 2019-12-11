import React from 'react'
import Country from './Country'
import Button from './Button'

const Countries = ({countries, filterChanger}) => {


  const rows = () => {
    if ( countries.length > 10 ){
      return (<p> Too many matches, specify another filter </p>)
    }
    else if (countries.length === 1){
      return <Country country={countries[0]} />
    }
    else {
      return (
        countries.map((country,i) => {
          return (
            <div key={i}>
            {country.name}
            <Button country={country} filterChanger={filterChanger} />
            </div>
          )
        })
      )
    }
  }

  return (
    <div>
    {rows()}
    </div>
  )
}

export default Countries
