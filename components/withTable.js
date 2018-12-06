import React from 'react'
import TableContext from '../contexts/tableContext'

const withTable = WrappedComponent => {
  return props => (
    <TableContext.Consumer>
      {value => <WrappedComponent
        table={value.data}
        setTable={value.setTable}
        {...props}
      />}
    </TableContext.Consumer>
  )
}

export default withTable