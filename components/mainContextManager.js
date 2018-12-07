import React, { Component } from 'react'
import {
  View,
  StatusBar
} from 'react-native'
import ThemeContext, { materialTheme } from '../contexts/themeContext'
import UserContext from '../contexts/userContext'
import AuthContextManager from './authContextManager'


class MainContextManager extends Component {
  constructor (props) {
    super(props)
    this.state = {
      theme: materialTheme,
      user: null
    }
  }

  setTheme = theme => this.setState({ theme })

  setUser = user => this.setState({ user })

  render () {
    const { theme, user } = this.state
    const themeContextValue = {
      data: theme,
      setTheme: this.setTheme
    }
    const userContextValue = {
      data: user,
      setUser: this.setUser
    }
    return (
      <View style={{ flex: 1, backgroundColor: theme.background }}>
        <StatusBar
          barStyle='light-content'
          backgroundColor={theme.statusBar}
        />
        <ThemeContext.Provider value={themeContextValue}>
          <UserContext.Provider value={userContextValue}>
            <AuthContextManager />
          </UserContext.Provider>
        </ThemeContext.Provider>
      </View>
    )
  }
}
export default MainContextManager
