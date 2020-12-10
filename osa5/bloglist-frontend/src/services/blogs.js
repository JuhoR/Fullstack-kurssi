import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const modify = async blog => {
    const config = { headers: { Authorization: token } }
    const response = await axios.put(baseUrl+'/'+blog.id, blog, config)
    return response.data
}

const createNew = async newObject => {
    const config = {
        headers: { Authorization: token }
    }
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const remove = async blog => {
    const config = { headers: { Authorization: token } }
    const response = await axios.delete(baseUrl+'/'+blog.id, config)
    return response.data
}

export default { getAll, createNew, setToken, modify, remove }
