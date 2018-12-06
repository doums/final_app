import React from 'react'

export const menu = [
  {
    key: 'fries',
    name: 'French Fries',
    price: 2.5
  },
  {
    key: 'burger',
    name: 'Big Kahuna Burger',
    price: 4
  },
  {
    key: 'sprite',
    name: 'Sprite',
    price: 2
  }
]

const MenuContext = React.createContext(menu)
export default MenuContext
