import React, { Component } from 'react'
import {
  View,
  StatusBar,
  Dimensions
} from 'react-native'
import ThemeContext, { materialTheme } from '../contexts/themeContext'
import UserContext from '../contexts/userContext'
import AuthContextManager from './authContextManager'
import WindowContext from '../contexts/windowContext'


class MainContextManager extends Component {
  constructor (props) {
    super(props)
    this.state = {
      theme: materialTheme,
      user: null,
      window: null
    }
  }

  componentDidMount () {
    const initWindow = Dimensions.get('window')
    this.setWindow(initWindow)
    this.eventListener = Dimensions.addEventListener('change', ({ window }) => {
      this.setWindow(window)
    })
  }

  componentWillUnmount () {
    Dimensions.removeEventListener('change', this.eventListener)
  }

  setWindow = window => {
    let orientation = 'portrait'
    if (window.width > window.height) orientation = 'landscape'
    this.setState({ window: { ...window, orientation } })
  }

  setTheme = theme => this.setState({ theme })

  setUser = user => this.setState({ user })

  render () {
    const { theme, user, window } = this.state
    const themeContextValue = {
      data: theme,
      setTheme: this.setTheme
    }
    const userContextValue = {
      data: user,
      setUser: this.setUser
    }
    const windowContextValue = {
      data: window
    }
    return (
      <View style={{ flex: 1, backgroundColor: theme.background }}>
        <StatusBar
          barStyle='light-content'
          backgroundColor={theme.statusBar}
        />
        <ThemeContext.Provider value={themeContextValue}>
          <UserContext.Provider value={userContextValue}>
            <WindowContext.Provider value={windowContextValue}>
              <AuthContextManager />
            </WindowContext.Provider>
          </UserContext.Provider>
        </ThemeContext.Provider>
      </View>
    )
  }
}
export default MainContextManager
