import React from 'react'

export const materialTheme = {
  primary: '#1eb980',
  primaryLight: '#37efba',
  primaryDark: '#045D56',
  background: '#33333d',
  surface: '#373740',
  onPrimary: '#000000',
  onSecondary: '#000000',
  onBackground: '#ffffff',
  onSurface: '#ffffff',
  error: '#b00020',
  onError: '#ffffff',
  statusBar: '#27272f',
  green: '#007d51',
  teal: '#045d56',
  orangeDark: '#ff6859',
  orange: '#ff857c',
  orangeLight: '#ffd7d0',
  yellowDark: '#ffac12',
  yellow: '#ffcf44',
  yellowLight: '#ffdc78',
  purpleDark: '#a932ff',
  purple: '#b15dff',
  purpleLight: '#decaf7',
  blueDark: '#0082fb',
  blue: '#72deff',
  blueLight: '#b2f2ff',
  muted: '#adadb1'
}

const initTheme = {
  data: materialTheme,
  setTheme: () => {}
}

const ThemeContext = React.createContext(initTheme)
export default ThemeContext
