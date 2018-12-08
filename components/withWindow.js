import React from 'react'
import WindowContext from '../contexts/windowContext'

const withWindow = WrappedComponent => {
  return props => (
    <WindowContext.Consumer>
      {value => <WrappedComponent
        window={value.data}
        {...props}
      />}
    </WindowContext.Consumer>
  )
}

export default withWindow