import React, { Component } from 'react'
import {
  StyleSheet,
  TextInput,
  View
} from 'react-native'
import { compose } from 'lodash/fp'
import withTheme from './withTheme'
import withUser from './withUser'
import Icon from 'react-native-vector-icons/MaterialIcons'
import firebase from 'react-native-firebase'

class MessageInput extends Component {
  constructor (props) {
    super(props)
    this.state = {
      message: '',
      isBusy: false
    }
    this.inputRef = React.createRef()
  }

  componentDidMount () {
    const { value } = this.props
    if (value) {
      this.setState({ message: value })
    }
  }

  componentDidUpdate (prevProps) {
    const { value } = this.props
    const { value: prevValue } = prevProps
    if (value && value !== prevValue) {
      this.setState({ message: value })
    }
  }

  send = () => {
    const { user: { id: userId, username } } = this.props
    const { message, isBusy } = this.state
    const messageCopy = message.trim()
    if (isBusy || messageCopy.length === 0) return
    this.inputRef.current.blur()
    this.setState({ isBusy: true, message: '' }, async () => {
      try {
        await firebase.firestore().collection('messages').add({
          message: messageCopy,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          author: {
            id: userId,
            username: username
          }
        })
      } catch (e) {
        console.log(e.message)
      } finally {
        this.setState({ isBusy: false, message: '' })
      }
    })
  }

  render () {
    const { theme } = this.props
    const { message } = this.state
    return (
      <View style={[ styles.container, { borderColor: theme.onBackground } ]}>
        <TextInput
          style={[ styles.text, styles.textInput, { color: theme.onBackground } ]}
          placeholder='Aa'
          multiline={true}
          numberOfLines={5}
          returnKeyType='send'
          placeholderTextColor={theme.onBackground}
          onChangeText={message => this.setState({ message })}
          value={message}
          onSubmitEditing={this.send}
          ref={this.inputRef}
        />
        <View style={ styles.sendIconWrapper }>
          <View style={styles.sendIcon}>
            <Icon
              onPress={this.send}
              disabled={message.trim().length === 0}
              name='send'
              size={24}
              color={theme.primary}
            />
          </View>
        </View>
      </View>
    )
  }
}

export default compose(
  withTheme,
  withUser
)(MessageInput)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 100
  },
  text: {
    fontSize: 16,
    paddingHorizontal: 10,
    fontFamily: 'Lekton-Regular'
  },
  textInput: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    maxHeight: 100
  },
  sendIconWrapper: {
    alignSelf: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  sendIcon: {
    marginLeft: 32
  },
})