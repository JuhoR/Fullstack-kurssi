export const changeFilter = (filter) => {
  return {
    type: 'CHANGE',
    data: filter
  }
}

const filterReducer = (state='', action) => {
  switch (action.type) {
    case 'CHANGE':
      return action.data
    default:
      return state
  }
}

export default filterReducer
