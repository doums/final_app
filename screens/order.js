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
import Icon from 'react-native-vector-icons/MaterialIcons'
import typoStyle from '../styles/typo'
import withOrder from '../components/withOrder'
import menu from '../constants/menu'
import withTable from '../components/withTable'
import prepStatus from '../constants/prepStatus'
import withUser from '../components/withUser'
import firebase from 'react-native-firebase'

const RenderItem = ({ item, order, theme, setOrder }) => {
  const calcTotal = order => {
    let total = 0
    order.content.forEach(foodItem => total += foodItem.quantity * foodItem.price)
    return total
  }

  const onAdd = item => {
    const currentOrder = { ...order }
    const index = currentOrder.content.findIndex(foodItem => foodItem.key === item.key)
    if (index >= 0) {
      currentOrder.content[index].quantity += 1
    } else {
      currentOrder.content.push({ ...item,  quantity: 1, status: prepStatus.notStatedYet })
    }
    currentOrder.total = calcTotal(currentOrder)
    setOrder(currentOrder)
  }

  const onRemove = () => {
    const currentOrder = { ...order }
    const index = currentOrder.content.findIndex(foodItem => foodItem.key === item.key)
    if (index >= 0 && currentOrder.content[index].quantity > 1) {
      currentOrder.content[index].quantity -= 1
    } else if (index >= 0) {
      currentOrder.content.splice(index, 1)
    }
    currentOrder.total = calcTotal(currentOrder)
    setOrder(currentOrder)
  }

  let color = theme.onBackground

  const findQuantity = itemKey => {
    const index = order.content.findIndex(foodItem => foodItem.key === itemKey)
    if (index >= 0) return order.content[index].quantity
    return 0
  }

  return (
    <View style={styles.itemContainer}>
      <Text style={[ typoStyle.body2, { color: theme.onBackground } ]}>{item.name}</Text>
      <Text style={[ typoStyle.body2, { color: theme.onBackground } ]}>{item.price}</Text>
      <Text style={[ typoStyle.body2, { color: theme.onBackground } ]}>{`Quantity: ${findQuantity(item.key)}`}</Text>
      <Icon
        name='add'
        size={24}
        onPress={() => onAdd(item)}
        color={color}
      />
      <Icon
        name='remove'
        size={24}
        onPress={() => onRemove(item)}
        color={color}
      />
    </View>
  )
}

class Order extends Component {

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
    if (order.checkedOut) {
      return (
        <View style={[ styles.container, { backgroundColor: theme.background } ]}>
          <View style={[ styles.card, { backgroundColor: theme.surface } ]}>
            <Text>You have already ordered !</Text>
            <Button
              text='Prep'
              onPress={() => navigate('Preparation')}
            />
          </View>
        </View>
      )
    }
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
    return (
      <View style={[ styles.container, { backgroundColor: theme.background } ]}>
        <View style={[ styles.card, { backgroundColor: theme.surface } ]}>
          <Text style={[ typoStyle.h4, { color: theme.onSurface } ]}>Menu</Text>
          <FlatList
            data={menu}
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
)(Order)

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
