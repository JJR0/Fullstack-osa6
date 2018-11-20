import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import './App.css'

const Menu = (props) => {
  const anecdoteById = id => props.anecdotes.find(anecdote => anecdote.id === id)

  return (
    <div>
    <Router>
      <div>
        <div className='navmenu'>
          <Link className='nav-item' to='/'>Anecdotes</Link>&nbsp;
          <Link className='nav-item' to='/create'>Create new</Link>&nbsp;
          <Link className='nav-item' to='/about'>About</Link>
        </div>
        { props.notification !== '' ?
          <div className='notification'>
            {props.notification}
          </div>
          : null }
        <Route exact path='/' render={() => <AnecdoteList anecdotes={props.anecdotes} />} />
        <Route exact path='/create' render={({history}) => <CreateNew addNew={props.addNew} history={history} />} />
        <Route exact path='/about' render={() => <About />} />
        <Route exact path='/anecdotes/:id' render={({match}) =>
          <Anecdote anecdote={anecdoteById(match.params.id)} />}
        />
      </div>
    </Router>
  </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div className='container'>
    <h2>Anecdotes</h2>
    <ul className='list-group'>
      {anecdotes.map(anecdote =>
        <li key={anecdote.id} className='list-group-item'>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      )}
    </ul>  
  </div>
)

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <div>has {anecdote.votes} votes</div>
      <div>for more info see <a href={anecdote.info}>{anecdote.info}</a></div>
      <p/>
    </div>
  )
}

const About = () => (
  <div className='container'>
    <div className='row'>
      <div className='col-sm-8'>
        <h2>About anecdote app</h2>
        <p>According to Wikipedia:</p>
        
        <em>An anecdote is a brief, revealing account of an individual person or an incident. 
          Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
          such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
          An anecdote is "a story with a point."</em>

        <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
      </div>
      <div className='col-sm-4'>
        <img alt='Photo of Bill Gates' src='https://pbs.twimg.com/profile_images/988775660163252226/XpgonN0X_400x400.jpg' width='200' height='200' />
      </div>
    </div>

  </div>
)

const Footer = () => (
  <div className='container'>
    <footer className='footer'>
      <div className='text-muted'>
        Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

        See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
      </div>
    </footer>
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
  }

  render() {
    return(
      <div className='container'>
        <h2>Create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label htmlFor='content-input'>Content:</label>
            <input
              id='content-input'
              className='form-control'
              name='content'
              value={this.state.content}
              onChange={this.handleChange}
              />
          </div>
          <div className='form-group'>
          <label htmlFor='author-input'>Author:</label>
            <input
              id='author-input'
              className='form-control'
              name='author'
              value={this.state.author}
              onChange={this.handleChange}
              />
          </div>
          <div className='form-group'>
            <label htmlFor='url-input'>Url for more information:</label>
            <input
              id='author-input'
              className='form-control'
              name='info'
              value={this.state.info}
              onChange={this.handleChange}
              />
          </div> 
          <button type='submit' className='btn btn-primary'>Create new anecdote</button>
        </form>
      </div>  
    )
  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    } 
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({
      anecdotes: this.state.anecdotes.concat(anecdote),
      notification: `A new anecdote "${anecdote.content}" created!`
    })

    setTimeout(() => {
      this.setState({ notification: '' })
    }, 10000)
  }

  anecdoteById = id => this.state.anecdotes.find(a => a.id === id)

  vote = id => {
    const anecdote = this.anecdoteById(id)
    const voted = { ...anecdote, votes: anecdote.votes + 1 }
    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)
    this.setState({ anecdotes })
  }

  render() {
    return (
      <div className='container'>
        <h1>Software anecdotes</h1>
        <Menu
          anecdotes={this.state.anecdotes}
          addNew={this.addNew}
          notification={this.state.notification}
          />
        <Footer/>
      </div>
    )
  }
}

export default App
