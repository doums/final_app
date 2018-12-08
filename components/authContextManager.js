import React, { Component } from 'react'
import OrderContext from '../contexts/orderContext'
import TableContext from '../contexts/tableContext'
import withUser from './withUser'
import RootNavigator from './rootNavigator'
import firebase from 'react-native-firebase'
import orderStatus from '../constants/orderStatus'
import Login from '../screens/login'

class AuthContextManager extends Component {
  constructor (props) {
    super(props)
    this.state = {
      order: null,
      table: null,
      initOrderRT: false,
      orderId: null
    }
  }

  async componentDidUpdate (prevProps) {
    const { user } = this.props
    const { user: prevUser } = prevProps
    const { initOrderRT, order } = this.state
    if (!user) return
    if (!prevUser && user) {
      try {
        const orders = await firebase.firestore().collection('orders')
          .where('userId', '==', user.id)
          .limit(1)
          .get()
        orders.forEach(doc => {
          const orderData = doc.data()
          if (orderData && ( orderData.order.status !== orderStatus.served )) {
            console.log('order retrieved')
            this.setState({
              orderId: doc.id,
              order: orderData.order,
              table: orderData.table,
              initOrderRT: true
            }, () => this.startOrderRT())
          }
        })
      } catch (e) {
        console.log(e.message)
      }
    }
    if (order && order.checkedOut && !initOrderRT) {
      this.setState({ initOrderRT: true })
      this.startOrderRT()
    }
  }

  startOrderRT = async () => {
    console.log('init order RT')
    const { orderId } = this.state
    const rt = await firebase.firestore().collection('orders').doc(orderId)
    rt.onSnapshot(doc => {
      const orderData = doc.data()
      if (orderData) {
        this.setState({
          order: orderData.order,
          table: orderData.table
        })
      } else {
        this.setState({
          order: null,
          orderId: null,
          table: null,
          initOrderRT: false
        })
      }
    })
  }

  setOrder = order => this.setState({ order })

  setOrderId = id => this.setState({ orderId: id })

  setTable = table => this.setState({ table })

  render () {
    const { user } = this.props
    const { table, order } = this.state
    if (!user) {
      return <Login />
    }
    const orderContextValue = {
      data: order,
      setOrder: this.setOrder,
      setOrderId: this.setOrderId
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
