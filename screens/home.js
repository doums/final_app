import React from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'
import withTheme from '../components/withTheme'
import Button from '../components/button'

const Home = ({ theme, navigation }) => {
  return (
    <View style={[ styles.container, { backgroundColor: theme.background } ]}>
      <View style={[ styles.card, { backgroundColor: theme.surface } ]}>
        <Button
          text={`Let's eat !`}
          onPress={() => navigation.navigate('Table')}
        />
      </View>
    </View>
  )}

export default withTheme(Home)

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
