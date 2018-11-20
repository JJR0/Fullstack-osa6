import React from 'react'
import { connect } from 'react-redux'

import './Notification.css'

const Notification = (props) => (
  <div className='notification'>
    {props.notification}
  </div>
)

const mapStateToProps = state => {
  return {
    notification: state.notification
  }
}

export default connect(
  mapStateToProps
)(Notification)
