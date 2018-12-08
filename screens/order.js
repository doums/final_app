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
import { order as defaultOrder } from '../contexts/orderContext'
import Spinner from '../components/spinner'

const RenderItem = ({ item, order, theme, setOrder }) => {
  const calcTotal = order => {
    if (!order) return 0
    let total = 0
    order.content.forEach(foodItem => total += foodItem.quantity * foodItem.price)
    return total
  }

  const onAdd = item => {
    let currentOrder
    if (!order) {
      currentOrder = defaultOrder
    } else {
      currentOrder = { ...order }
    }
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
    let currentOrder
    if (!order) {
      currentOrder = defaultOrder
    } else {
      currentOrder = { ...order }
    }
    const index = currentOrder.content.findIndex(foodItem => foodItem.key === item.key)
    if (index >= 0 && currentOrder.content[index].quantity > 1) {
      currentOrder.content[index].quantity -= 1
    } else if (index >= 0) {
      currentOrder.content.splice(index, 1)
    }
    currentOrder.total = calcTotal(currentOrder)
    setOrder(currentOrder)
  }

  const findQuantity = itemKey => {
    if (!order) return 0
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
        color={theme.onBackground}
      />
      <Icon
        name='remove'
        size={24}
        onPress={() => onRemove(item)}
        color={theme.onBackground}
      />
    </View>
  )
}

class Order extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isBusy: false
    }
  }

  onCheckOut = async () => {
    const { table, navigation: { navigate }, order, setOrder, setOrderId, user } = this.props
    const { isBusy } = this.state
    if (!table || !order || !order.content || order.checkedOut || isBusy) return
    this.setState({ isBusy: true })
    const checkedOrder = { ...order }
    checkedOrder.checkedOut = true
    try {
      const orderRef = await firebase.firestore().collection('orders').add({
        order: checkedOrder,
        table: { key: table.key, name: table.name },
        userId: user.id
      })
      setOrderId(orderRef.id)
      setOrder(checkedOrder)
    } catch (e) {
      console.log(e.message)
    } finally {
      this.setState({ isBusy: false })
    }
    navigate('Preparation')
  }

  render () {
    const { theme, order, setOrder, table, navigation: { navigate } } = this.props
    const { isBusy } = this.state
    if (isBusy) return <Spinner />
    if (order && order.checkedOut) {
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
    if (!table) {
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
    let orderContent
    if (order) orderContent = order.content
    return (
      <View style={[ styles.container, { backgroundColor: theme.background } ]}>
        <View style={[ styles.card, { backgroundColor: theme.surface } ]}>
          <Text style={[ typoStyle.h4, { color: theme.onSurface } ]}>Menu</Text>
          <FlatList
            data={menu}
            extraData={[ order, orderContent ]}
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
          <Text style={[ typoStyle.h3, { color: theme.onSurface } ]}>{`$${order ? order.total : 0}`}</Text>
        </View>
        <View style={[ styles.card, { backgroundColor: theme.surface, marginTop: 5 } ]}>
          <Button
            text='Check Out'
            onPress={this.onCheckOut}
            disabled={Boolean(!order || order.content.length === 0 || isBusy)}
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
    paddingTop: 5
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
