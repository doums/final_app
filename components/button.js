import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import React from 'react'
import withTheme from './withTheme'
import typoStyle from '../styles/typo'

const Button = ({ theme, onPress, disabled, text, buttonStyle, textStyle }) => (
  <TouchableNativeFeedback
    onPress={() => onPress()}
    background={TouchableNativeFeedback.Ripple(theme.background, false)}
    activeOpacity={0.5}
    disabled={disabled}
  >
    <View style={[ styles.button, { backgroundColor: theme.surface }, buttonStyle ]}>
      <Text style={[ typoStyle.button, { color: theme.onSurface }, textStyle ]}>
        {text.toUpperCase()}
      </Text>
    </View>
  </TouchableNativeFeedback>
)
export default withTheme(Button)

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 1
  }
})