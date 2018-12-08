import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  FlatList
} from 'react-native'
import { compose } from 'lodash/fp'
import withTheme from '../components/withTheme'
import typoStyle from '../styles/typo'
import withOrder from '../components/withOrder'
import withTable from '../components/withTable'
import orderStatus from '../constants/orderStatus'
import Card from '../components/card'
import ColoredLine from '../components/coloredLine'
import withWindow from '../components/withWindow'

const RenderItem = ({ item, theme }) => {
  let color
  switch (item.status) {
    case orderStatus.notStatedYet:
      color = theme.yellow
      break
    case orderStatus.inPreparation:
      color = theme.orange
      break
    case orderStatus.ready:
      color = theme.green
      break
  }

  return (
    <View style={[ styles.itemContainer, { borderColor: color } ]}>
      <Text style={[ typoStyle.body2, { color: theme.onSurface, flex: 3 } ]}>{item.name}</Text>
      <Text style={[ typoStyle.body1, { color: theme.onSurface, flex: 1 } ]}>{item.quantity}</Text>
      <Text style={[ typoStyle.body2, { color: theme.onSurface, flex: 2 } ]}>{item.status}</Text>
    </View>
  )
}

const Preparation = props => {
  const {
    theme,
    order,
    setOrder,
    table,
    navigation: { navigate },
    window: { orientation }
  } = props
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
  if (!order || !order.checkedOut) {
    return (
      <View style={[ styles.container, { backgroundColor: theme.background } ]}>
        <Card
          body={
            <Text style={[ typoStyle.body2, { color: theme.onSurface } ]}>
              Compose your meal
            </Text>
          }
          bottomButton
          buttonProps={{
            text: 'ORDER',
            onPress: () => navigate('Order'),
            buttonStyle: { paddingVertical: 0 }
          }}
        />
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
    <View style={[
      styles.container,
      { backgroundColor: theme.background,
        flexDirection: orientation === 'landscape' ? 'row' : 'column' }
    ]}>
      <View style={{ flex: orientation === 'landscape' ? 2 : 0 }}>
        <Card
          title='Your meal'
          body={
            <FlatList
              data={order.content}
              extraData={[ order, order.content ]}
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
        />
      </View>
      <View style={[
        styles.openSpace,
        { backgroundColor: theme.background,
          borderColor: color },
        orientation === 'landscape' && { marginLeft: 16 }
      ]}>
        <Text style={[ typoStyle.h3, { color: theme.onBackground, textAlign: 'center', fontSize: 35 } ]}>{order.status}</Text>
        <View style={styles.orderInfo}>
          <Text style={[ typoStyle.body2, { color: theme.onBackground } ]}>{table.name}</Text>
          <Text style={[ typoStyle.caption, { color: theme.muted } ]}>{`Total $${order.total}`}</Text>
        </View>
        <ColoredLine />
      </View>
    </View>
  )
}

export default compose(
  withTheme,
  withOrder,
  withTable,
  withWindow
)(Preparation)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 5
  },
  text: {
    fontSize: 16,
    paddingHorizontal: 10
  },
  openSpace: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: 5,
    paddingHorizontal: 10,
    borderLeftWidth: 3
  },
  orderInfo: {
    alignSelf: 'flex-start',
    marginBottom: 10
  }
})
