import React from 'react'
import orderStatus from '../constants/orderStatus'

const order = {
  checkedOut: false,
  content: [],
  status: orderStatus.notStatedYet,
  total: 0
}

const initOrder = {
  data: order,
  setOrder: () => {},
  setOrderId: () => {},
  getOrderId: () => {}
}

const OrderContext = React.createContext(initOrder)
export default OrderContext