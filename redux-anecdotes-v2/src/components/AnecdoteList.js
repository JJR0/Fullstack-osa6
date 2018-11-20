import React from 'react'
import { connect } from 'react-redux'
import { anecdoteVote } from '../reducers/anecdoteReducer'
import { voteNotification, deleteNotification, notifyVote } from '../reducers/notificationReducer'
import Filter from './Filter'

const AnecdoteList = (props) => {
  const handleClick = anecdote => () => {
    props.anecdoteVote(anecdote)
    props.notifyVote(anecdote.content, 5000)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      {props.visibleAnecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
          &quot;{anecdote.content}&quot; - {anecdote.votes} Votes
          </div>
          <div>
            <button onClick={handleClick(anecdote)}>
              Vote
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const anecdotesToShow = (anecdotes, filter) => {
  return filter !== ''
    ? anecdotes.filter(anecdote => anecdote.content.includes(filter))
    : anecdotes
}

const mapStateToProps = state => {
  return {
    visibleAnecdotes: anecdotesToShow(state.anecdotes, state.filter)
  }
}

const mapDispatchToProps = {
  anecdoteVote,
  voteNotification,
  deleteNotification,
  notifyVote
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
