import React from 'react'

const initUser = {
  data: null,
  setUser: () => {}
}

const UserContext = React.createContext(initUser)
export default UserContext