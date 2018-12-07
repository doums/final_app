import React from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'
import { compose } from 'lodash/fp'
import withTheme from '../components/withTheme'
import typoStyle from '../styles/typo'
import Button from './button'

const Card = props => {
  const {
    theme,
    title,
    body,
    cardStyle,
    titleStyle,
    bodyStyle,
    lineColor,
    topRightButton,
    bottomButton,
    buttonProps
  } = props
  let buttonMod = null
  if (topRightButton) buttonMod = 'topRight'
  if (bottomButton) buttonMod = 'bottom'
  let titleExists = false
  if (title && title.length > 0) titleExists = true
  return (
    <View style={[ styles.card, { backgroundColor: theme.surface }, cardStyle ]}>
      {
        buttonMod === 'topRight' ?
          <View style={styles.buttonTopRightContainer}>
            <Text style={[ typoStyle.subTitle2, { color: theme.onSurface }, titleStyle ]}>{ title }</Text>
            <Button { ...buttonProps } />
          </View> : titleExists && <Text style={[ typoStyle.subTitle2, { color: theme.onSurface }, titleStyle ]}>
            { title }
          </Text>
      }
      {
        (titleExists || buttonMod === 'topRight') &&
        <View style={[ styles.line, { backgroundColor: lineColor ? lineColor : theme.background } ]} />
      }
      <View style={[ styles.body, bodyStyle ]}>{ body }</View>
      {
        buttonMod === 'bottom' &&
          <View style={styles.buttonBottomContainer}>
            <View style={[ styles.line, { backgroundColor: lineColor ? lineColor : theme.background } ]} />
            <Button { ...buttonProps } />
          </View>
      }
    </View>
  )
}

export default compose(
  withTheme
)(Card)

const styles = StyleSheet.create({
  card: {
    elevation: 1,
    padding: 16
  },
  buttonTopRightContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttonBottomContainer: {

  },
  line: {
    height: 1,
    minHeight: 1,
    maxHeight: 1,
    marginVertical: 16
  },
  body: {
  }
})
