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

const Home = ({ theme, user, navigation }) => {
  return (
    <View style={[ styles.container, { backgroundColor: theme.background } ]}>
      <Text>hello world</Text>
      <Button
        text='Table'
        onPress={() => navigation.navigate('Table')}
      />
    </View>
  )}

export default compose(
  withTheme,
  withUser
)(Home)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  text: {
    fontSize: 16,
    paddingHorizontal: 10
  }
})
