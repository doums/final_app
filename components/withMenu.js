import React from 'react'
import MenuContext from '../contexts/menuContext'

const withMenu = WrappedComponent => {
  return props => (
    <MenuContext.Consumer>
      {value => <WrappedComponent
        menu={value}
        {...props}
      />}
    </MenuContext.Consumer>
  )
}

export default withMenu