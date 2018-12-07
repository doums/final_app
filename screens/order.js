import React from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'
import { compose } from 'lodash/fp'
import withTheme from '../components/withTheme'
import withUser from '../components/withUser'
import withTable from '../components/withTable'

const Order = props => {
  return (
    <View style={[ styles.container, { backgroundColor: props.theme.background } ]}>
      <Text>Order</Text>
    </View>
  )}

export default compose(
  withTheme,
  withUser,
  withTable
)(Order)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  text: {
    fontSize: 16,
    paddingHorizontal: 10
  }
})
