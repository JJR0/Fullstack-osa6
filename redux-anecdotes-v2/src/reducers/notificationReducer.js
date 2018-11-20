const initialState = ''

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'NEW_ANECDOTE':
    return `${action.content} -anecdote was added`
  case 'NEW_VOTE':
    return `You voted ${action.content}`
  case 'DELETE':
    return initialState
  default:
    return state
  }
}

export const creationNotification = content => {
  return {
    type: 'NEW_ANECDOTE',
    content
  }
}

export const voteNotification = content => {
  return {
    type: 'NEW_VOTE',
    content
  }
}

export const deleteNotification = () => {
  return {
    type: 'DELETE'
  }
}

export const notifyVote = (content, timeout) => {
  return async dispatch => {

    dispatch(voteNotification(content))
    setTimeout(() => {
      dispatch(deleteNotification())
    }, timeout)
  }
}

export const notifyCreate = (content, timeout) => {
  return async dispatch => {

    dispatch(creationNotification(content))
    setTimeout(() => {
      dispatch(deleteNotification())
    }, timeout)
  }
}

export default notificationReducer