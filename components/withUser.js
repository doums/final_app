import React from 'react'
import UserContext from '../constants/userContext'

const withUser = WrappedComponent => {
  return props => (
    <UserContext.Consumer>
      {value => <WrappedComponent
        user={value.data}
        setUser={value.setUser}
        {...props}
      />}
    </UserContext.Consumer>
  )
}

export default withUser