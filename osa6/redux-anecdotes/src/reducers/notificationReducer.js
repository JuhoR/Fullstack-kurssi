
const initialNotification = ''
let timeoutID
export const voteNotification = (anecdote) => {
  return {
    type: 'VOTE',
    data: anecdote,
  }
}

export const emptyNotification = () => {
  return {
    type: 'EMPTY',
  }
}

export const setNotification = (message, time) => {
  return dispatch => {
    clearTimeout(timeoutID)
    dispatch({
      type: "SET",
      data: message
    })
    timeoutID = setTimeout(() => dispatch({type: "SET", data: ""}), time*1000)
  }
}

const notificationReducer = (state=initialNotification, action) => {
  switch (action.type) {
    //case 'VOTE':
    //  return `you voted '${action.data.content}'`
    case 'EMPTY':
      return initialNotification
    case 'SET':
      return action.data
    default:
      return state
  }
}

export default notificationReducer
