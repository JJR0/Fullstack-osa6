import axios from 'axios'
const url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(url)
  return response.data
}

const getId = () => (100000*Math.random()).toFixed(0)

const create = async content => {
  const response = await axios.post(url, { content, id: getId(), votes: 0 })
  return response.data
}

const vote = async anecdote => {
  const newAnecdote = {
    id: anecdote.id,
    content: anecdote.content,
    votes: anecdote.votes + 1
  }

  const response = await axios.put(url + '/' + anecdote.id, newAnecdote)
  return response.data
}

export default { getAll, create, vote }