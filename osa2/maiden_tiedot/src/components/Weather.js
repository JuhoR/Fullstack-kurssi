import React, {useState, useEffect}from 'react'
import axios from 'axios'

const Weather = ({country}) => {
  const def = {
    current: {
      temperature: 0,
      weather_icons: [null],//["https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png"],
      weather_descriptions: ["sunny"],
      wind_speed: 0,
      wind_dir: null//"W"
    }
  }
  const [weather, setWeather] = useState(def)
  // haetaan pääkaupungin sää weatherstack.com:sta
  const api_key = process.env.REACT_APP_API_KEY
  const url = 'http://api.weatherstack.com/current?access_key='+api_key+'&query='+country.capital
  console.log(url)
  useEffect(() => {
    axios
      .get(url)
      .then(response => {
        setWeather(response.data)
      })
  }, [url])
  console.log(weather)
  return (
    <div>
    <h3> Weather in {country.capital} </h3>
    <p>temperature: {weather.current.temperature} </p>
    <img src={weather.current.weather_icons[0]} alt={weather.current.weather_descriptions[0]} />
    <p>wind: {weather.current.wind_speed} kph direction {weather.current.wind_dir} </p>
    </div>
  )
}

export default Weather
