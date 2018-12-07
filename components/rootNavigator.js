import {
  createMaterialTopTabNavigator,
  createStackNavigator
} from 'react-navigation'
import Login from '../screens/login'
import withTheme from './withTheme'
import { StyleSheet, View, FlatList, Text } from 'react-native'
import Home from '../screens/home'
import Order from '../screens/order'
import Preparation from '../screens/preparation'
import Settings from '../screens/settings'
import FoodReady from '../screens/foodReady'
import CheckOut from '../screens/checkOut'
import Table from '../screens/table'
import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import tabs from '../constants/tabs'
import { compose } from 'lodash/fp'
import withOrder from './withOrder'
import withTable from './withTable'

const RenderTab = ({ item, activeItem, theme, navigate }) => {
  let active = false
  if (item.key === activeItem.key) active = true
  return (
    <View style={styles.itemContainer}>
      <Icon
        name={item.icon}
        size={24}
        onPress={() => {navigate(item.key)}}
        color={active ? theme.onBackground : theme.muted}
      />
    </View>
  )
}

const RenderTabWrapper = compose(
  withOrder,
  withTable
)(RenderTab)

class TabBar extends Component {
  render () {
    const { theme, navigation: { state: { index }, navigate } } = this.props
    const activeTab = tabs[index]
    return (
      <View style={[styles.container, {backgroundColor: theme.background}]}>
        <View style={styles.titleContainer}>
          <Text style={[ styles.tabTitle, { fontSize: 16, color: theme.onBackground } ]}>{tabs[index].name.toUpperCase()}</Text>
        </View>
        <FlatList
          data={tabs}
          extraData={activeTab}
          contentContainerStyle={{ justifyContent: 'space-around', flex: 1 }}
          horizontal={true}
          renderItem={({ item }) => (
            <RenderTabWrapper
              item={item}
              activeItem={activeTab}
              theme={theme}
              navigate={navigate}
            />
          )}
        />
      </View>
    )
  }
}

const BarComponent = withTheme(props => <TabBar {...props} />)

const HomeNav = createStackNavigator({
  Home,
  Table
}, {
  headerMode: 'none',
  initialRouteName: 'Home'
})

const OrderNav = createStackNavigator({
  Order,
  CheckOut
}, {
  headerMode: 'none',
  initialRouteName: 'Order'
})

const PrepNav = createStackNavigator({
  Preparation,
  FoodReady
}, {
  headerMode: 'none',
  initialRouteName: 'Preparation'
})

const AuthNavigator = createMaterialTopTabNavigator({
  HomeNav,
  OrderNav,
  PrepNav,
  Settings
}, {
  initialRouteName: 'HomeNav',
  tabBarComponent: BarComponent,
  tabBarOptions: {
    showLabel: false,
    showIcon: false,
    indicatorStyle: {
      width: 0,
      height: 0
    }
  }
})

const RootNavigator = createStackNavigator({
  Login: Login,
  AuthNavigator: AuthNavigator
}, {
  headerMode: 'none',
  initialRouteName: 'Login'
})

export default RootNavigator

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxHeight: 48,
    paddingVertical: 12,
    paddingHorizontal: 16
  },
  scrollViewContainer: {
    flexGrow: 1
  },
  itemContainer: {
    marginHorizontal: 5,
    height: 48
  },
  titleContainer: {
    width: 100
  },
  tabTitle: {
    fontFamily: 'RobotoCondensed-Bold',
    fontSize: 18
  }
})