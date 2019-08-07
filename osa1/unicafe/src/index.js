import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={props.HandleClick}>
      {props.text}
    </button>
  )
}

const Header = (props) => {
  return (
    <h1>
      {props.text}
    </h1>
  )
}

const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad
  const avg = (props.good - props.bad)/all
  const percent = 100*props.good/all
  if (all === 0){
    return ( <p>No feedback given</p>)
  }
  return (
    <table>
      <tbody>
        <Statistic text={"Good"} value={props.good} />
        <Statistic text={"Neutral"} value={props.neutral} />
        <Statistic text={"Bad"} value={props.bad} />
        <Statistic text={"All"} value={all} />
        <Statistic text={"Average"} value = {avg} />
        {/* The percentage of positive reviews is rendered without Statistics
          component, due to the extra %-sign */}
        <tr>
        <td>Positive</td><td>{percent} %</td>
        </tr>
      </tbody>
    </table>
  )
}

const Statistic = (props) =>{
  return (
    <tr>
    <td>{props.text}</td><td>{props.value}</td>
    </tr>
  )
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => setGood(good+1)
  const incrementNeutral = () => setNeutral(neutral+1)
  const incrementBad = () => setBad(bad+1)
  return (
    <div>
      <Header text={"give feedback"} />
      <Button text={"good"} HandleClick={incrementGood}/>
      <Button text={"neutral"} HandleClick={incrementNeutral}/>
      <Button text={"bad"} HandleClick={incrementBad}/>
      <Header text={"Statistics"} />
      <Statistics header={"Statistics"} good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
