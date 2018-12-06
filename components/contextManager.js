import React, { Component } from 'react'
import {
  View,
  StatusBar
} from 'react-native'
import ThemeContext, { materialTheme } from '../contexts/themeContext'
import MenuContext, { menu } from '../contexts/menuContext'
import OrderContext, { order } from '../contexts/orderContext'
import UserContext from '../contexts/userContext'
import RootNavigator from './rootNavigator'

class ContextManager extends Component {
  constructor (props) {
    super(props)
    this.state = {
      theme: materialTheme,
      menu,
      user: null,
      order
    }
  }

  setTheme = theme => this.setState({ theme })

  setUser = user => this.setState({ user })

  setOrder = order => this.setState({ order })

  render () {
    const { theme, user, menu } = this.state
    const themeContextValue = {
      data: theme,
      setTheme: this.setTheme
    }
    const userContextValue = {
      data: user,
      setUser: this.setUser
    }
    const menuContextValue = {
      data: menu
    }
    const orderContextValue = {
      data: order,
      setUser: this.setOrder
    }
    return (
      <View style={{ flex: 1, backgroundColor: theme.background }}>
        <StatusBar
          barStyle='light-content'
          backgroundColor={theme.statusBar}
        />
        <ThemeContext.Provider value={themeContextValue}>
          <UserContext.Provider value={userContextValue}>
            <MenuContext.Provider value={menuContextValue}>
              <OrderContext.Provider value={orderContextValue}>
                <RootNavigator />
              </OrderContext.Provider>
            </MenuContext.Provider>
          </UserContext.Provider>
        </ThemeContext.Provider>
      </View>
    )
  }
}
export default ContextManager
