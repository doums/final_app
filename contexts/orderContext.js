import React from 'react'

export const order = {
  checkedOut: false,
  content: [],
  status: null,
  total: 0
}

const initOrder = {
  data: order,
  setOrder: () => {}
}

const OrderContext = React.createContext(initOrder)
export default OrderContext