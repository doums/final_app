export default function findScreenTitle (routeName) {
  switch (routeName) {
    case 'Home':
      return 'Home'
    case 'Table':
      return 'Table choice'
    case 'Order':
      return 'Order'
    case 'Preparation':
      return 'Prep'
    case 'Settings':
      return 'Settings'
  }
}