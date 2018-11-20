const initialState = ''

const filterReducer = (state = initialState, action) => {
  switch(action.type) {
  case 'FILTER':
    return action.content
  default:
    return initialState
  }
}

export const changeFilter = content => {
  return {
    type: 'FILTER',
    content
  }
}

export default filterReducer