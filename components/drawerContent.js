import React from 'react'
import { FlatList, StyleSheet, Text, View, TouchableNativeFeedback } from 'react-native'
import withTheme from './withTheme'
import Icon from 'react-native-vector-icons/MaterialIcons'
import findTab from '../helpers/findTab'
import findScreenTitle from '../helpers/findScreenTitle'
import firebase from 'react-native-firebase'
import { NavigationActions, withNavigation } from 'react-navigation'
import { compose } from 'lodash/fp'

const DrawerItem = ({ item, activeItem, theme, navigation }) => {
  let focused = false
  if (item.key === activeItem) focused = true
  return (
    <View style={styles.itemContainer}>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.SelectableBackground()}
        onPress={() => navigation.navigate(item.routeName)}
      >
        <View style={[ styles.activeOverlay, { backgroundColor: theme.background } ]}>
          <View style={styles.navigationIcon}>
            <Icon
              name={findTab(item.key)}
              size={24}
              color={focused ? theme.onBackground : theme.muted}
            />
          </View>
          <Text style={[ styles.itemLabel, { color: focused ? theme.onBackground : theme.muted } ]}>{ findScreenTitle(item.key) }</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  )
}

const DrawerContent = React.memo(props => {
  const { items, theme, activeItem, navigation } = props
  const signOut = async () => {
    try {
      await firebase.auth().signOut()
      navigation.reset([NavigationActions.navigate({ routeName: 'Login' })], 0)
    } catch (e) {
      console.log(e.message)
    }
  }
  return (
    <View style={styles.container}>
      <Text style={[ styles.title, { color:theme.onBackground } ]}>App</Text>
      <FlatList
        data={items}
        extraData={activeItem}
        renderItem={({ item }) => (
          <DrawerItem
            item={item}
            activeItem={activeItem}
            theme={theme}
            navigation={navigation}
          />
        )}
      />
      <View style={styles.itemContainer}>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.SelectableBackground()}
          onPress={() => signOut()}
        >
          <View style={[ styles.activeOverlay, { backgroundColor: theme.background } ]}>
            <View style={styles.navigationIcon}>
              <Icon
                name='highlight-off'
                size={24}
                color={theme.muted}
              />
            </View>
            <Text style={[ styles.itemLabel, { color: theme.muted } ]}>Sign out</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  )
})
export default compose(
  withTheme,
  withNavigation
)(DrawerContent)

const styles = StyleSheet.create({
  container: {
    marginBottom: 2
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 5,
    height: 48
  },
  activeOverlay: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 11,
    borderRadius: 1
  },
  navigationIcon: {
    marginRight: 32
  },
  title: {
    fontSize: 22,
    marginHorizontal: 16,
    marginTop: 18,
    marginBottom: 30,
    fontFamily: 'Lekton-Bold'
  },
  itemLabel: {
    fontSize: 16,
    fontFamily: 'Lekton-Bold'
  }
})
