import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  FlatList
} from 'react-native'
import { compose } from 'lodash/fp'
import withTheme from '../components/withTheme'
import withTable from '../components/withTable'
import tables from '../constants/tables'
import Icon from 'react-native-vector-icons/MaterialIcons'
import typoStyle from '../styles/typo'
import Card from '../components/card'
import withOrder from '../components/withOrder'
import orderStatus from '../constants/orderStatus'

const RenderItem = ({ item, selectedTable, theme, setTable }) => {
  let active = false
  if (selectedTable && item.key === selectedTable.key) active = true
  const onSelect = () => {
    if (!item.available) return
    if (selectedTable && item.key === selectedTable.key) {
      setTable(null)
    } else {
      setTable(item)
    }
  }

  let color = theme.muted
  if (item.available && active) {
    color = theme.onBackground
  } else if (!item.available) {
    color = theme.orangeDark
  }

  return (
    <View style={styles.itemContainer}>
      <Text style={[ typoStyle.body2, { color: theme.onBackground } ]}>{item.name}</Text>
      <Icon
        name={item.available ? 'check-circle' : 'highlight-off'}
        size={24}
        onPress={onSelect}
        color={color}
      />
    </View>
  )
}

const Table = props => {
  const { theme, table, setTable, order, navigation: { navigate } } = props
  const onOrder = () => {
    const { table, navigation: { navigate } } = props
    if (!table) return
    navigate('Order')
  }
  if (order && order.checkedOut) {
    return (
      <View style={[ styles.container, { backgroundColor: theme.background } ]}>
        <Card
          body={
            <Text style={[ typoStyle.body2, { color: theme.onSurface } ]}>
              Back to home
            </Text>
          }
          bottomButton
          buttonProps={{
            text: 'HOME',
            onPress: () => navigate('Home'),
            buttonStyle: { paddingVertical: 0 }
          }}
        />
      </View>
    )
  }
  return (
    <View style={[ styles.container, { backgroundColor: theme.background } ]}>
      <Card
        title='Pick your table'
        body={
          <FlatList
            data={tables}
            extraData={table}
            ItemSeparatorComponent={() => <View style={{ height: 10 }}/>}
            renderItem={({ item }) => (
              <RenderItem
                item={item}
                selectedTable={table}
                theme={theme}
                setTable={setTable}
              />
            )}
          />
        }
        topRightButton
        buttonProps={{
          text: 'Order',
          onPress: onOrder,
          disabled: !table,
          buttonStyle: { paddingVertical: 0 }
        }}
      />
    </View>
  )
}

export default compose(
  withTheme,
  withTable,
  withOrder
)(Table)

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
  itemContainer: {
    flex: 1,
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 5
  }
})
