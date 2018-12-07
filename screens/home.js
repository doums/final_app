import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'
import withTheme from '../components/withTheme'
import Button from '../components/button'
import { compose } from 'lodash/fp'
import withOrder from '../components/withOrder'
import withUser from '../components/withUser'

class Home extends Component {
  render () {
    const { theme, navigation } = this.props
    return (
      <View style={[ styles.container, { backgroundColor: theme.background } ]}>
        <View style={[ styles.card, { backgroundColor: theme.surface } ]}>
          <Button
            text={`Let's eat !`}
            onPress={() => navigation.navigate('Table')}
          />
        </View>
      </View>
    )
  }
}

export default compose(
  withTheme,
  withOrder,
  withUser
)(Home)

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
