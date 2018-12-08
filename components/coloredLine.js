import React from 'react'
import {
  StyleSheet,
  View
} from 'react-native'
import { compose } from 'lodash/fp'
import withTheme from '../components/withTheme'
import withOrder from './withOrder'
import orderStatus from '../constants/orderStatus'

const ColoredLine = ({ theme, order }) => {
  let colors = [
    theme.primary,
    theme.primaryDark,
    theme.primaryLight,
    theme.teal
  ]
  if (order && order.checkedOut) {
    switch (order.status) {
      case orderStatus.notStatedYet:
        colors = [
          theme.yellowDark,
          theme.yellowLight,
          theme.yellowDark,
          theme.yellow
        ]
        break
      case orderStatus.inPreparation:
        colors = [
          theme.orangeLight,
          theme.orange,
          theme.orange,
          theme.orangeDark
        ]
        break
      case orderStatus.ready:
        colors = [
          theme.primary,
          theme.primaryDark,
          theme.primaryLight,
          theme.teal
        ]
        break
      case orderStatus.served:
        colors = [
          theme.purple,
          theme.purpleDark,
          theme.purpleDark,
          theme.purpleLight
        ]
        break
    }
  }
  return (
    <View style={styles.container}>
      <View style={[ styles.line, { backgroundColor: colors[0] } ]} />
      <View style={[ styles.line, { backgroundColor: colors[1] } ]} />
      <View style={[ styles.line, { backgroundColor: colors[2] } ]} />
      <View style={[ styles.line, { backgroundColor: colors[3] } ]} />
    </View>
  )
}

export default compose(
  withTheme,
  withOrder
)(ColoredLine)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  line: {
    height: 1,
    minHeight: 1,
    maxHeight: 1,
    flexGrow: 1
  }
})
