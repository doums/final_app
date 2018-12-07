import tabs from '../constants/tabs'

export default function findTab (routeName) {
  switch (routeName) {
    case 'Home':
    case 'Table':
      return tabs[0]
    case 'Order':
      return tabs[1]
    case 'Preparation':
      return tabs[2]
    case 'Settings':
      return tabs[3]
  }
}