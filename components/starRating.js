import React, { Component } from 'react'
import {
  StyleSheet,
  View
} from 'react-native'
import withTheme from '../components/withTheme'
import { compose } from 'lodash/fp'
import Icon from 'react-native-vector-icons/MaterialIcons'

class StarRating extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: 0
    }
  }

  rate = n => {
    const { value } = this.state
    if (n === value) this.setState({ value: 0 })
    else {
      this.setState({ value: n })
    }
  }

  render () {
    const { theme } = this.props
    const { value } = this.state
    return (
      <View style={styles.container}>
        <Icon
          name='star'
          size={24}
          onPress={() => this.rate(1)}
          color={1 <= value ? theme.onSurface : theme.muted}
        />
        <Icon
          name='star'
          size={24}
          onPress={() => this.rate(2)}
          color={2 <= value ? theme.onSurface : theme.muted}
        />
        <Icon
          name='star'
          size={24}
          onPress={() => this.rate(3)}
          color={3 <= value ? theme.onSurface : theme.muted}
        />
        <Icon
          name='star'
          size={24}
          onPress={() => this.rate(4)}
          color={4 <= value ? theme.onSurface : theme.muted}
        />
      </View>
    )
  }
}

export default compose(
  withTheme
)(StarRating)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  }
})
