import React from 'react'
import ContextManager from './components/contextManager'
import { YellowBox } from 'react-native'

YellowBox.ignoreWarnings(['Require cycle:'])

const App = () => {
  return <ContextManager />
}
export default App
