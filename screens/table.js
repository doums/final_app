import React from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'
import { compose } from 'lodash/fp'
import withTheme from '../components/withTheme'
import withUser from '../components/withUser'
import Button from '../components/button'

const Table = ({ theme, user, navigation: { navigate } }) => {
  return (
    <View style={[ styles.container, { backgroundColor: theme.background } ]}>
      <View style={[ styles.card, { backgroundColor: theme.surface } ]}>
        <Text>choose your table</Text>
        <Button
          text='Order'
          onPress={() => navigate('Order')}
        />
      </View>
    </View>
  )}

export default compose(
  withTheme,
  withUser
)(Table)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  card: {
    flex: 1,
    elevation: 1,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 16,
    paddingHorizontal: 10
  }
})
