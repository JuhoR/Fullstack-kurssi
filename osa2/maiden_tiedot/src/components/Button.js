import React from 'react'

const Button = ({country, filterChanger}) => {
  const showCountry = () => {
    filterChanger(country.name)
  }
  return (
      <button type='submit' onClick={showCountry}>show</button>
  )
}

export default Button
