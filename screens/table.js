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
import withTable from '../components/withTable'
import tables from '../constants/tables'
import Icon from 'react-native-vector-icons/MaterialIcons'
import typoStyle from '../styles/typo'

const RenderItem = ({ item, selectedTable, theme, setTable }) => {
  let active = false
  if (item.key === selectedTable.key) active = true
  const onSelect = () => {
    if (!item.available) return
    if (item.key === selectedTable.key) {
      setTable({ key: null, name: null })
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
  const onOrder = () => {
    const { table, navigation: { navigate } } = props
    if (!table.key) return
    navigate('Order')
  }
  const { theme, table, setTable } = props
  return (
    <View style={[ styles.container, { backgroundColor: theme.background } ]}>
      <View style={[ styles.card, { backgroundColor: theme.surface } ]}>
        <Text>Choose your table</Text>
        <FlatList
          data={tables}
          extraData={table}
          renderItem={({ item }) => (
            <RenderItem
              item={item}
              selectedTable={table}
              theme={theme}
              setTable={setTable}
            />
          )}
        />
      </View>
      <View style={[ styles.card, { backgroundColor: theme.surface, marginTop: 5 } ]}>
        <Button
          text='Order'
          onPress={onOrder}
          disabled={!table.key}
        />
      </View>
    </View>
  )
}

export default compose(
  withTheme,
  withTable
)(Table)

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
    width: 150,
    marginBottom: 10
  }
})
