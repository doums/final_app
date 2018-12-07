import React from 'react'
import orderStatus from '../constants/orderStatus'

export const order = {
  checkedOut: false,
  content: [],
  status: orderStatus.notStatedYet,
  total: 0
}

const initOrder = {
  data: order,
  setOrder: () => {},
  setOrderId: () => {}
}

const OrderContext = React.createContext(initOrder)
export default OrderContext