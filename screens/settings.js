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
import { NavigationActions } from 'react-navigation'
import Button from '../components/button'

const Settings = ({ theme, user, navigation }) => {
  const signOut = async () => {
    console.log(NavigationActions)
    try {
      await firebase.auth().signOut()
      navigation.reset([NavigationActions.navigate({ routeName: 'Login' })], 0)
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <View style={[ styles.container, { backgroundColor: theme.background } ]}>
      <Button onPress={signOut} text='Sign Out' />
    </View>
  )}

export default compose(
  withTheme,
  withUser
)(Settings)

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
