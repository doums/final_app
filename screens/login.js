import React, { Component } from 'react'
import {
  StyleSheet,
  TextInput,
  View,
  Text
} from 'react-native'
import { compose } from 'lodash/fp'
import withTheme from '../components/withTheme'
import withUser from '../components/withUser'
import Button from '../components/button'
import firebase from 'react-native-firebase'
import Spinner from '../components/spinner'
import typoStyle from '../styles/typo'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      username: '',
      password: '',
      passwordCheck: '',
      mod: 'login',
      error: '',
      isBusy: false
    }
  }

  componentDidMount () {
    const { navigation: { replace }, setUser } = this.props
    this.unsubscribeAuth = firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        try {
          const userPayload = await firebase.firestore().collection('users').doc(user.uid).get()
          setUser({ ... userPayload.data(), id: user.uid })
          replace('AuthNavigator')
        } catch (e) {
          console.log(e.message)
        }
      } else {
        setUser(null)
      }
    })
  }

  componentWillUnmount () {
    this.unsubscribeAuth()
  }

  login = async () => {
    const { email, password, isBusy } = this.state
    if (!this.formIsValid() || isBusy) return
    this.setState({ isBusy: true })
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch (e) {
      this.setState({ error: e.message })
      this.setState({ isBusy: false })
    }
  }

  signUp = async () => {
    const { email, password, passwordCheck, isBusy, username } = this.state
    if (!this.formIsValid() || isBusy) return
    if (password !== passwordCheck) {
      this.setState({ error: 'Passwords mismatch' })
      return
    }
    this.setState({ isBusy: true })
    try {
      const userPayload = await firebase.auth().createUserWithEmailAndPassword(email, password)
      await firebase.firestore().collection('users').doc(userPayload.user.uid).set({
        email: email,
        username: username
      })
    } catch (e) {
      this.setState({ error: e.message })
      this.setState({ isBusy: false })
    }
  }

  formIsValid = () => {
    const { email, username, password, passwordCheck, mod } = this.state
    if (mod === 'login') return Boolean(email && password)
    return Boolean(email && password && passwordCheck && username)
  }

  render () {
    const { theme } = this.props
    const {
      email,
      username,
      password,
      passwordCheck,
      mod,
      error,
      isBusy
    } = this.state
    const textStyle = [ styles.text, typoStyle.body2, { color: theme.onBackground } ]
    const errorStyle = [ styles.text, typoStyle.body1, { color: theme.error, marginBottom: 10 } ]
    const textInputStyle = [ styles.text, typoStyle.body2, styles.textInput, { color: theme.onBackground, borderColor: theme.onBackground } ]
    if (isBusy) return <Spinner/>
    return (
      < View style={[ styles.container, { backgroundColor: theme.background } ]}>
        { error.length > 0 &&
        <Text
          onPress={() => this.setState({ error: '' })}
          style={errorStyle}
        >
          { error }
        </Text>
        }
        <TextInput
          style={textInputStyle}
          placeholder='email'
          placeholderTextColor={theme.onBackground}
          onChangeText={email => this.setState({ email })}
          keyboardType='email-address'
          value={email}
        />
        { mod === 'signUp' &&
        <TextInput
          style={textInputStyle}
          placeholder='username'
          placeholderTextColor={theme.onBackground}
          onChangeText={username => this.setState({ username })}
          value={username}
        />
        }
        <TextInput
          style={textInputStyle}
          placeholder='password'
          placeholderTextColor={theme.onBackground}
          onChangeText={password => this.setState({ password })}
          value={password}
        />
        {mod === 'signUp' &&
        <TextInput
          style={textInputStyle}
          placeholder='retype password'
          placeholderTextColor={theme.onBackground}
          onChangeText={passwordCheck => this.setState({ passwordCheck })}
          value={passwordCheck}
        />
        }
        <Button
          text={mod === 'login' ? 'login' : 'sign up'}
          onPress={mod === 'login' ? this.login : this.signUp}
          disabled={!this.formIsValid()}
        />
        <Text
          onPress={() => this.setState({ mod: mod === 'login' ? 'signUp' : 'login' })}
          style={textStyle}
        >
          { mod === 'login' ? 'or sign up' : 'or login' }
        </Text>
      </View>
    )
  }
}

export default compose(
  withTheme,
  withUser
)(Login)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    paddingHorizontal: 10
  },
  textInput: {
    borderWidth: 1,
    width: 200,
    paddingHorizontal: 20,
    marginBottom: 10
  }
})
