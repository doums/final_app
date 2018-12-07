import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  FlatList
} from 'react-native'
import { compose } from 'lodash/fp'
import withTheme from '../components/withTheme'
import Button from '../components/button'
import typoStyle from '../styles/typo'
import withOrder from '../components/withOrder'
import menu from '../constants/menu'
import withTable from '../components/withTable'
import prepStatus from '../constants/prepStatus'
import withUser from '../components/withUser'
import firebase from 'react-native-firebase'

const RenderItem = ({ item, order, theme, setOrder }) => {

  let color = theme.onBackground

  const findQuantity = itemKey => {
    const index = order.content.findIndex(foodItem => foodItem.key === itemKey)
    if (index >= 0) return order.content[index].quantity
    return 0
  }

  return (
    <View style={styles.itemContainer}>
      <Text style={[ typoStyle.body2, { color: theme.onBackground } ]}>{item.name}</Text>
      <Text style={[ typoStyle.body2, { color: theme.onBackground } ]}>{findQuantity(item.key)}</Text>
      <Text style={[ typoStyle.body2, { color: theme.onBackground } ]}>{item.status.toString()}</Text>
    </View>
  )
}

class Preparation extends Component {

  onCheckOut = async () => {
    const { table, navigation: { navigate }, order, setOrder, user } = this.props
    if (!table.key || !order.content || order.checkedOut) return
    const checkedOrder = { ...order }
    checkedOrder.checkedOut = true
    setOrder(checkedOrder)
    try {
      await firebase.firestore().collection('orders').add({
        order: checkedOrder,
        table: { key: table.key, name: table.name },
        userId: user.id
      })
    } catch (e) {
      console.log(e.message)
    } finally {
      this.setState({ isBusy: false, message: '' })
    }
    navigate('Preparation')
  }

  render () {
    const { theme, order, setOrder, table, navigation: { navigate } } = this.props
    if (!table.key) {
      return (
        <View style={[ styles.container, { backgroundColor: theme.background } ]}>
          <View style={[ styles.card, { backgroundColor: theme.surface } ]}>
            <Text>Please, choose a table first !</Text>
            <Button
              text='Pick a table'
              onPress={() => navigate('Table')}
            />
          </View>
        </View>
      )
    }
    if (!order.checkedOut) {
      return (
        <View style={[ styles.container, { backgroundColor: theme.background } ]}>
          <View style={[ styles.card, { backgroundColor: theme.surface } ]}>
            <Text>You did not order anything!</Text>
            <Button
              text='Order'
              onPress={() => navigate('Order')}
            />
          </View>
        </View>
      )
    }
    return (
      <View style={[ styles.container, { backgroundColor: theme.background } ]}>
        <View style={[ styles.card, { backgroundColor: theme.surface } ]}>
          <Text style={[ typoStyle.h4, { color: theme.onSurface } ]}>In preparation</Text>
          <FlatList
            data={order.content}
            extraData={[ order, order.content ]}
            renderItem={({ item }) => (
              <RenderItem
                item={item}
                order={order}
                theme={theme}
                setOrder={setOrder}
              />
            )}
          />
        </View>
        <View style={[ styles.card, { backgroundColor: theme.surface, marginTop: 5 } ]}>
          <Text style={[ typoStyle.body2, { color: theme.onSurface } ]}>Total</Text>
          <Text style={[ typoStyle.h3, { color: theme.onSurface } ]}>{`$${order.total}`}</Text>
        </View>
        <View style={[ styles.card, { backgroundColor: theme.surface, marginTop: 5 } ]}>
          <Button
            text='Check Out'
            onPress={this.onCheckOut}
            disabled={order.content.length === 0}
          />
        </View>
      </View>
    )
  }
}

export default compose(
  withTheme,
  withOrder,
  withTable,
  withUser
)(Preparation)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center'
  },
  card: {
    flex: 1,
    flexGrow: 1,
    elevation: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16
  },
  text: {
    fontSize: 16,
    paddingHorizontal: 10
  },
  itemContainer: {
    flex: 1,
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: 5,
    marginBottom: 10
  }
})
