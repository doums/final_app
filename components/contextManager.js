import React, { Component } from 'react'
import {
  View,
  StatusBar
} from 'react-native'
import ThemeContext, { materialTheme } from '../contexts/themeContext'
import OrderContext, { order } from '../contexts/orderContext'
import UserContext from '../contexts/userContext'
import RootNavigator from './rootNavigator'
import TableContext, { table } from '../contexts/tableContext'

class ContextManager extends Component {
  constructor (props) {
    super(props)
    this.state = {
      theme: materialTheme,
      user: null,
      order,
      table
    }
  }

  setTheme = theme => this.setState({ theme })

  setUser = user => this.setState({ user })

  setOrder = order => this.setState({ order })

  setTable = table => this.setState({ table })

  render () {
    const { theme, user, table } = this.state
    const themeContextValue = {
      data: theme,
      setTheme: this.setTheme
    }
    const userContextValue = {
      data: user,
      setUser: this.setUser
    }
    const orderContextValue = {
      data: order,
      setOrder: this.setOrder
    }
    const tableContextValue = {
      data: table,
      setTable: this.setTable
    }
    return (
      <View style={{ flex: 1, backgroundColor: theme.background }}>
        <StatusBar
          barStyle='light-content'
          backgroundColor={theme.statusBar}
        />
        <ThemeContext.Provider value={themeContextValue}>
          <UserContext.Provider value={userContextValue}>
            <OrderContext.Provider value={orderContextValue}>
              <TableContext.Provider value={tableContextValue}>
                <RootNavigator />
              </TableContext.Provider>
            </OrderContext.Provider>
          </UserContext.Provider>
        </ThemeContext.Provider>
      </View>
    )
  }
}
export default ContextManager
