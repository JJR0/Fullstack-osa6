import React from 'react'
import { connect } from 'react-redux'
import { changeFilter } from '../reducers/filterReducer'

const Filter = (props) => (
  <div className='filter'>
    Filter <input onChange={((e) => props.changeFilter(e.target.value))}/>
  </div>
)

const mapDispatchToProps = {
  changeFilter
}

export default connect(
  null,
  mapDispatchToProps
)(Filter)