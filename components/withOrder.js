import React from 'react'
import OrderContext from '../contexts/orderContext'

const withOrder = WrappedComponent => {
  return props => (
    <OrderContext.Consumer>
      {value => <WrappedComponent
        order={value.data}
        setOrder={value.setOrder}
        setOrderId={value.setOrderId}
        getOrderId={value.getOrderId}
        {...props}
      />}
    </OrderContext.Consumer>
  )
}

export default withOrder