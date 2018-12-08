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
import Card from '../components/card'

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
      <View style={styles.itemInfo}>
        <Text style={[ typoStyle.body2, { color: theme.onBackground } ]}>{item.name}</Text>
        <Text style={[ typoStyle.body1, { color: theme.muted } ]}>{`$ ${item.price}`}</Text>
      </View>
      <Text style={[ typoStyle.body1, { color: theme.onBackground, flex: 1 } ]}>{findQuantity(item.key)}</Text>
      <View style={{ flex: 1 }}>
        <Icon
          name='add'
          size={24}
          onPress={() => onAdd(item)}
          color={theme.onBackground}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Icon
          name='remove'
          size={24}
          onPress={() => onRemove(item)}
          color={theme.onBackground}
        />
      </View>
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
          <Card
            body={
              <Text style={[ typoStyle.body2, { color: theme.onSurface } ]}>
                Check your prep
              </Text>
            }
            bottomButton
            buttonProps={{
              text: 'PREP',
              onPress: () => navigate('Preparation'),
              buttonStyle: { paddingVertical: 0 }
            }}
          />
        </View>
      )
    }
    if (!table) {
      return (
        <View style={[ styles.container, { backgroundColor: theme.background } ]}>
          <Card
            body={
              <Text style={[ typoStyle.body2, { color: theme.onSurface } ]}>
                First choose a table
              </Text>
            }
            bottomButton
            buttonProps={{
              text: 'PICK A TABLE',
              onPress: () => navigate('Table'),
              buttonStyle: { paddingVertical: 0 }
            }}
          />
        </View>
      )
    }

    let orderContent
    if (order) orderContent = order.content
    return (
      <View style={[ styles.container, { backgroundColor: theme.background } ]}>
        <Card
          title='Menu'
          body={
            <FlatList
              data={menu}
              extraData={[ order, orderContent ]}
              ItemSeparatorComponent={() => <View style={{ height: 10 }}/>}
              renderItem={({ item }) => (
                <RenderItem
                  item={item}
                  order={order}
                  theme={theme}
                  setOrder={setOrder}
                />
              )}
            />
          }
          topRightButton
          buttonProps={{
            text: 'Check Out',
            onPress: this.onCheckOut,
            disabled: Boolean(!order || order.content.length === 0 || isBusy),
            buttonStyle: { paddingVertical: 0 }
          }}
        />
        <View style={[ styles.openSpace, { backgroundColor: theme.background } ]}>
          <Text style={[ typoStyle.body2, { color: theme.onBackground } ]}>Total</Text>
          <Text style={[ typoStyle.h3, { color: theme.onBackground } ]}>{`$${order ? order.total : 0}`}</Text>
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
  openSpace: {
    flex: 1,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 16,
    paddingHorizontal: 10
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    marginHorizontal: 5
  },
  itemInfo: {
    flex: 3,
    flexDirection: 'column'
  }
})
