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
import ColoredLine from '../components/coloredLine'
import Spinner from '../components/spinner'
import firebase from 'react-native-firebase'
import StarRating from '../components/starRating'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isBusy: false
    }
  }

  orderDone = async () => {
    const { getOrderId } = this.props
    const { isBusy } = this.state
    if (isBusy) return
    this.setState({ isBusy: true })
    try {
      await firebase.firestore().collection('orders').doc(getOrderId()).delete()
    } catch (e) {
      console.log(e.message)
    } finally {
      this.setState({ isBusy: false })
    }
  }

  render () {
    const { theme, navigation, order, table } = this.props
    const { isBusy } = this.state
    if (isBusy) return <Spinner/>
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
    return (
      <View style={[ styles.container, { backgroundColor: theme.background } ]}>
        <View style={styles.brandContainer}>
          <Text style={[ typoStyle.h3, { color: theme.onBackground, textAlign: 'center' } ]}>FastFeed</Text>
          <ColoredLine />
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
              <View>
                <Text style={[ typoStyle.body2, { color: theme.onSurface } ]}>
                  Enjoy your meal :)
                </Text>
                <Text/>
                <Text style={[ typoStyle.caption, { color: theme.muted } ]}>
                  Rate the speed
                </Text>
                <StarRating/>
              </View>
            }
            bottomButton
            buttonProps={{
              text: 'YUP',
              onPress: this.orderDone,
              buttonStyle: { paddingVertical: 0 }
            }}
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
    padding: 16,
    paddingTop: 5
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
