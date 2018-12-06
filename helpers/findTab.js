import tabs from '../constants/tabs'

export default function findTab (routeName) {
  switch (routeName) {
    case 'Home':
    case 'Table':
      return tabs[0]
    case 'Order':
    case 'CheckOut':
      return tabs[1]
    case 'Preparation':
    case 'FoodReady':
      return tabs[2]
    case 'Settings':
      return tabs[3]
  }
}