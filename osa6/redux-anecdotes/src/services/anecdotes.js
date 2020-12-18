import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0}
  const response = await axios.post(baseUrl, object)
  return response.data
}

const increaseVotes = async (id) => {
  let response = await axios.get(baseUrl + `/${id}`)
  const object = response.data
  console.log(object)
  const changedObject = {...object, votes: object.votes+1}
  response = await axios.put(baseUrl + `/${id}`, changedObject)
  return response.data
}

export default { getAll, createNew, increaseVotes }
