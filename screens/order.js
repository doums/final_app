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

const RenderItem = ({ item, order, theme, setOrder }) => {
  const onAdd = item => {
    const currentOrder = { ...order }
    const index = currentOrder.content.findIndex(foodItem => foodItem.key === item.key)
    if (index >= 0) {
      currentOrder.content[index].quantity += 1
    } else {
      currentOrder.content.push({ ...item,  quantity: 1})
    }
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

  onOrder = () => {
    const { table, navigation: { navigate } } = this.props
    if (!table.key) return
    navigate('Order')
  }

  render () {
    const { theme, order, setOrder, table, navigation: { navigate } } = this.props
    console.log(order)
    if (order.checkedOut) {
      return (
        <View style={[ styles.container, { backgroundColor: theme.background } ]}>
          <View style={[ styles.card, { backgroundColor: theme.surface } ]}>
            <Text>You have already ordered !</Text>
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
              disable={order.content.length === 0}
            />
          </View>
        </View>
      )
    }
    return (
      <View style={[ styles.container, { backgroundColor: theme.background } ]}>
        <View style={[ styles.card, { backgroundColor: theme.surface } ]}>
          <Text>Choose your table</Text>
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
          <Button
            text='Valid'
            onPress={this.onOrder}
            disable={order.content.length === 0}
          />
        </View>
      </View>
    )
  }
}

export default compose(
  withTheme,
  withOrder,
  withTable
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
