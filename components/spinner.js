import { ActivityIndicator, StyleSheet, View } from 'react-native'
import React from 'react'
import withTheme from './withTheme'

const Spinner = ({ theme }) => (
  <View style={[ styles.container, { backgroundColor: theme.background } ]}>
    <ActivityIndicator size="large" color={theme.primary} />
  </View>
)
export default withTheme(Spinner)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})