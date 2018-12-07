import React from 'react'
import MainContextManager from './components/mainContextManager'
import { YellowBox } from 'react-native'

YellowBox.ignoreWarnings(['Require cycle:'])

const App = () => {
  return <MainContextManager />
}
export default App
