import React from 'react'
import { connect } from 'react-redux'
import { anecdoteCreation } from '../reducers/anecdoteReducer'
import { creationNotification, deleteNotification, notifyCreate } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const handleSubmit = async event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    props.anecdoteCreation(content)
    event.target.anecdote.value = ''
    props.notifyCreate(content, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name='anecdote'/>
        </div>
        <button>
          create
        </button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  anecdoteCreation,
  creationNotification,
  deleteNotification,
  notifyCreate
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)
