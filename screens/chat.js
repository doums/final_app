import React from 'react'
import {
  StyleSheet,
  View
} from 'react-native'
import { compose } from 'lodash/fp'
import withTheme from '../components/withTheme'
import withActionBar from '../components/withActionBar'
import withUser from '../components/withUser'
import MessageInput from '../components/messageInput'
import Feed from '../components/feed'

const Chat = ({ theme, user, navigation: { navigate } }) => {
  console.log(user)
  return (
    <View style={[ styles.container, { backgroundColor: theme.background } ]}>
      <Feed/>
      <MessageInput/>
    </View>
  )}

export default compose(
  withActionBar,
  withTheme,
  withUser
)(Chat)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  text: {
    fontSize: 16,
    paddingHorizontal: 10
  }
})
