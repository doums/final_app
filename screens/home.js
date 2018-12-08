import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'
import withTheme from '../components/withTheme'
import { compose } from 'lodash/fp'
import withOrder from '../components/withOrder'
import typoStyle from '../styles/typo'
import Card from '../components/card'
import withTable from '../components/withTable'
import orderStatus from '../constants/orderStatus'

class Home extends Component {
  render () {
    const { theme, navigation, order, table } = this.props
    let card
    if (!order && !table) {
      card = 'table'
    } else if (((order && !order.checkedOut) || !order) && table) {
      card = 'order'
    } else if (order && order.checkedOut && order.status !== orderStatus.served && order.status !== orderStatus.ready) {
      card = 'prep'
    } else if (order && order.checkedOut && order.status === orderStatus.ready) {
      card = 'ready'
    } else if (order && order.checkedOut && order.status === orderStatus.served) {
      card = 'served'
    }
    console.log(order, table)
    return (
      <View style={[ styles.container, { backgroundColor: theme.background } ]}>
        <View style={styles.brandContainer}>
          <Text style={[ typoStyle.h3, { color: theme.onBackground, textAlign: 'center' } ]}>FastFeed</Text>
          <View style={styles.coloredLineContainer}>
            <View style={[ styles.line, { backgroundColor: theme.primary } ]} />
            <View style={[ styles.line, { backgroundColor: theme.primaryDark } ]} />
            <View style={[ styles.line, { backgroundColor: theme.primaryLight } ]} />
            <View style={[ styles.line, { backgroundColor: theme.teal } ]} />
          </View>
        </View>
        {
          card === 'table' &&
          <Card
            body={
              <Text style={[ typoStyle.body2, { color: theme.onSurface } ]}>
                Welcome ! Start by choosing a table
              </Text>
            }
            bottomButton
            buttonProps={{
              text: 'PICK YOUR TABLE',
              onPress: () => navigation.navigate('Table'),
              buttonStyle: { paddingVertical: 0 }
            }}
          />
        }
        {
          card === 'order' &&
          <Card
            body={
              <Text style={[ typoStyle.body2, { color: theme.onSurface } ]}>
                Welcome ! Continue and complete your order
              </Text>
            }
            bottomButton
            buttonProps={{
              text: 'ORDER',
              onPress: () => navigation.navigate('Order'),
              buttonStyle: { paddingVertical: 0 }
            }}
          />
        }
        {
          card === 'prep' &&
          <Card
            body={
              <Text style={[ typoStyle.body2, { color: theme.onSurface } ]}>
                Your preparation is in progress
              </Text>
            }
            bottomButton
            buttonProps={{
              text: 'PREP',
              onPress: () => navigation.navigate('Preparation'),
              buttonStyle: { paddingVertical: 0 }
            }}
          />
        }
        {
          card === 'ready' &&
          <Card
            body={
              <Text style={[ typoStyle.body2, { color: theme.onSurface } ]}>
                {`Your meal is ready, it will be soon on the ${table.name} :)`}
              </Text>
            }
            bottomButton
            buttonProps={{
              text: 'PREP',
              onPress: () => navigation.navigate('Preparation'),
              buttonStyle: { paddingVertical: 0 }
            }}
          />
        }
        {
          card === 'served' &&
          <Card
            body={
              <Text style={[ typoStyle.body2, { color: theme.onSurface } ]}>
                Enjoy your meal :)
              </Text>
            }
          />
        }
      </View>
    )
  }
}

export default compose(
  withTheme,
  withOrder,
  withTable
)(Home)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  brandContainer: {
    flex: 3,
    justifyContent: 'center'
  },
  coloredLineContainer: {
    flexDirection: 'row'
  },
  line: {
    height: 1,
    minHeight: 1,
    maxHeight: 1,
    flexGrow: 1
  }
})
