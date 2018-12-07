import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import React from 'react'
import withTheme from './withTheme'

const Button = props => (
  <TouchableNativeFeedback
    onPress={() => props.onPress()}
    background={TouchableNativeFeedback.Ripple(props.theme.background, false)}
    activeOpacity={0.5}
    disabled={props.disabled}
  >
    <View style={[ styles.activeOverlay, { backgroundColor: props.theme.primary } ]}>
      <Text style={[ styles.text, { color: props.theme.onPrimary } ]}>
        {props.text.toUpperCase()}
      </Text>
    </View>
  </TouchableNativeFeedback>
)
export default withTheme(Button)

const styles = StyleSheet.create({
  button: {
    marginBottom: 10,
    alignItems: 'center',
    padding: 10,
    minWidth: 200
  },
  text: {
    fontSize: 14,
    fontFamily: 'Montserrat-Medium'
  },
  activeOverlay: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 1,
    minWidth: 200
  }
})