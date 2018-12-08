import React from 'react'
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
import withTable from '../components/withTable'
import orderStatus from '../constants/orderStatus'

const RenderItem = ({ item, theme }) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={[ typoStyle.body2, { color: theme.onBackground } ]}>{item.name}</Text>
      <Text style={[ typoStyle.body2, { color: theme.onBackground } ]}>{item.quantity}</Text>
      <Text style={[ typoStyle.body2, { color: theme.onBackground } ]}>{item.status}</Text>
    </View>
  )
}

const Preparation = props => {
  const { theme, order, setOrder, table, navigation: { navigate } } = props
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
  if (!order || !order.checkedOut) {
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

  let color
  switch (order.status) {
    case orderStatus.notStatedYet:
      color = theme.yellowDark
      break
    case orderStatus.inPreparation:
      color = theme.orangeDark
      break
    case orderStatus.ready:
      color = theme.primary
      break
    case orderStatus.served:
      color = theme.purple
      break
  }

  return (
    <View style={[ styles.container, { backgroundColor: theme.background } ]}>
      <View style={[ styles.card, { backgroundColor: theme.surface } ]}>
        <Text style={[ typoStyle.h4, { color, marginBottom: 15 } ]}>{order.status}</Text>
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
        <View style={styles.totalAndTable}>
          <Text style={[ typoStyle.body2, { color: theme.onSurface } ]}>{`Total $${order.total}`}</Text>
          <Text style={[ typoStyle.body2, { color: theme.onSurface, marginLeft: 15 } ]}>{table.name}</Text>
        </View>
      </View>
    </View>
  )
}

export default compose(
  withTheme,
  withOrder,
  withTable
)(Preparation)

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
  },
  totalAndTable: {
    flex: 1,
    maxHeight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    alignSelf: 'flex-end'
  }
})
