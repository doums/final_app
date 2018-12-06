import React from 'react'

export const table = {
  key: null,
  name: null
}

const initTable = {
  data: table,
  setTable: () => {}
}

const TableContext = React.createContext(initTable)
export default TableContext