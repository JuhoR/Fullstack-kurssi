import React from 'react'
import { connect } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'
//import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {
  //const dispatch = useDispatch()

  // The submit handler
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createNewAnecdote(content)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default connect(
  null,
  { createNewAnecdote }
)(AnecdoteForm)
