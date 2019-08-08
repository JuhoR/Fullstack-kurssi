import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Anecdote = (props) => {
  return (
    <p>
      {props.text}
    </p>
  )
}

const Votes = (props) => {
  return (
    <p>
      has {props.votes} votes
    </p>
  )
}

const MostVotes = (props) => {
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <Anecdote text={props.anecdote}/>
      <p>has {props.votes} votes</p>
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState((new Array(props.anecdotes.length)).fill(0))
  const [highest, setHighest] = useState([0, 0])

  const randomAnecdote = () => {
    setSelected(Math.floor(Math.random()*6))
  }

  const incrementOne = (index) => {
    const newArr = [...votes]
    newArr[index] = newArr[index] + 1
    setVotes(newArr)
    if (newArr[index] > highest[1]){
      setHighest([index, newArr[index]])
    }
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote text={props.anecdotes[selected]} />
      <Votes votes={votes[selected]} />
      <Button text={"vote"} handleClick={() => incrementOne(selected)} />
      <Button text={"next anecdote"} handleClick={randomAnecdote} />
      <MostVotes anecdote={props.anecdotes[highest[0]]} votes={highest[1]}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
