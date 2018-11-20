import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (store = [], action) => {
  switch (action.type) {
  case 'VOTE':
    const old = store.filter(a => a.id !== action.id)
    const voted = store.find(a => a.id === action.id)

    return [...old, { ...voted, votes: voted.votes + 1 } ]
  case 'INIT_ANECDOTES':
    return action.data
  case 'CREATE':
    return [...store, action.anecdote ]
  default:
    return store
  }
}

export const anecdoteCreation = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(content)

    dispatch({
      type: 'CREATE',
      anecdote: newAnecdote
    })
  }
}

export const anecdoteVote = anecdote => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.vote(anecdote)

    dispatch({
      type: 'VOTE',
      id: updatedAnecdote.id
    })
  }
}

export const anecdoteInit = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()

    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default anecdoteReducer