import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  let style
  if (notification.length !== 0) {
    style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
  }else {
    style = null
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
