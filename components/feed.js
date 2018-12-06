import React, { Component } from 'react'
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Picker
} from 'react-native'
import { compose } from 'lodash/fp'
import withTheme from './withTheme'
import withUser from './withUser'
import Icon from 'react-native-vector-icons/MaterialIcons'
import firebase from 'react-native-firebase'
import { timeDifferenceForDate } from '../helpers/timeDifference'

class Feed extends Component {
  constructor (props) {
    super(props)
    this.state = {
      messages: []
    }
  }

  componentDidMount () {
    this.unsubscribe = firebase.firestore().collection('messages')
      .onSnapshot(querySnapshot => {
        let messages = []
        querySnapshot.forEach(async doc => {
          messages.push({ key: doc.id, ...doc.data() })
        })
        messages = messages.sort((a, b) => b.createdAt - a.createdAt)
        this.setState({ messages })
      })
  }

  componentWillUnmount () {
    this.unsubscribe()
  }

  renderItem = ({ item }) => {
    const { theme, user } = this.props
    const textStyle = [ styles.text, { color: theme.onBackground } ]
    let isAuthor = user.id === item.author.id
    const isAuthorStyle = { color: theme.onBackground, textAlign: isAuthor ? 'right' : 'left' }
    return (
      <View style={[ styles.row, isAuthor && { alignSelf: 'flex-end' } ]}>
        <View style={[ styles.messageWrapper ]}>
          <Text style={[ styles.author, isAuthorStyle ]}>
            { item.author.username }
          </Text>
          <Text style={[ styles.date, isAuthorStyle ]}>
            {timeDifferenceForDate(item.createdAt)}
          </Text>
          <Text style={[ textStyle, isAuthorStyle ]}>{ item.message }</Text>
        </View>
        {
          user.id === item.author.id &&
          <Icon
            name='more-horiz'
            size={24}
            color={theme.primary}
            onPress={() => {}}
          />
        }
      </View>
    )
  }

  render () {
    const { messages } = this.state
    console.log(messages)
    return (
      <View style={[ styles.container  ]}>
        <FlatList
          inverted
          data={messages}
          renderItem={this.renderItem}
          style={styles.list}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      </View>
    )
  }
}

export default compose(
  withTheme,
  withUser
)(Feed)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  text: {
    fontSize: 16,
    paddingHorizontal: 10,
    fontFamily: 'Lekton-Regular'
  },
  author: {
    fontSize: 16,
    paddingHorizontal: 10,
    fontFamily: 'Montserrat-SemiBold'
  },
  date: {
    fontSize: 12,
    paddingHorizontal: 10,
    fontFamily: 'Montserrat-LightItalic'
  },
  list: {
    padding: 20
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10
  },
  messageWrapper: {
    flexDirection: 'column',
    flex: 1
  }
})