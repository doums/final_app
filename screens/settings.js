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
import Card from '../components/card'
import typoStyle from '../styles/typo'

const Settings = ({ theme, setUser }) => {
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
      <Card
        body={
          <Text style={[ typoStyle.body2, { color: theme.onSurface } ]}>
            Profile
          </Text>
        }
        bottomButton
        buttonProps={{
          text: 'SIGN OUT',
          onPress: signOut,
          buttonStyle: { paddingVertical: 0 }
        }}
      />
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
