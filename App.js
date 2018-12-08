import React from 'react'
import MainContextManager from './components/mainContextManager'
import { YellowBox } from 'react-native'
import {
  StyleSheet,
  TextInput,
  View,
  Text
} from 'react-native'

YellowBox.ignoreWarnings(['Require cycle:'])

const App = () => {
  return <View style={{ backgroundColor: 'black', flex: 1 }}/>
}
export default App
