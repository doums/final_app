import React from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'
import { compose } from 'lodash/fp'
import withTheme from '../components/withTheme'
import withUser from '../components/withUser'
import firebase from 'react-native-firebase'
import Button from '../components/button'

const Settings = ({ theme, user, navigation, setUser }) => {
  const signOut = async () => {
    try {
      await firebase.auth().signOut()
      setUser(null)
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <View style={[ styles.container, { backgroundColor: theme.background } ]}>
      <View style={[ styles.card, { backgroundColor: theme.surface } ]}>
        <Button onPress={signOut} text='Sign Out' />
      </View>
    </View>
  )}

export default compose(
  withTheme,
  withUser
)(Settings)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 5
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
