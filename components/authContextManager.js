import React, { Component } from 'react'
import OrderContext, { order } from '../contexts/orderContext'
import TableContext, { table } from '../contexts/tableContext'
import withUser from './withUser'
import RootNavigator from './rootNavigator'
import firebase from 'react-native-firebase'
import orderStatus from '../constants/orderStatus'
import Login from '../screens/login'


class AuthContextManager extends Component {
  constructor (props) {
    super(props)
    this.state = {
      order,
      table
    }
  }

  async componentDidUpdate (prevProps, prevState) {
    const { user } = this.props
    const { user: prevUser } = prevProps
    if (!user) return
    if (!prevUser && user) {
      try {
        const orders = await firebase.firestore().collection('orders')
          .where( 'userId', '==', user.id )
          .limit(1)
          .get()
        orders.forEach(doc => {
          const orderData = doc.data()
        })
      } catch (e) {
        console.log(e.message)
      }
    }
  }

  setOrder = order => this.setState({ order })

  setTable = table => this.setState({ table })

  render () {
    const { user } = this.props
    const { table, order } = this.state
    if (!user) {
      return <Login />
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
      <OrderContext.Provider value={orderContextValue}>
        <TableContext.Provider value={tableContextValue}>
          <RootNavigator />
        </TableContext.Provider>
      </OrderContext.Provider>
    )
  }
}
export default withUser(AuthContextManager)
