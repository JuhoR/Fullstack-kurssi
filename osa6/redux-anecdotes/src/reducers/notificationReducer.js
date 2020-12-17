const initialNotification = ''

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

const notificationReducer = (state=initialNotification, action) => {
  switch (action.type) {
    case 'VOTE':
      return `you voted '${action.data.content}'`
    case 'EMPTY':
      return initialNotification
    default:
      return state
  }
}

export default notificationReducer
