import { createStackNavigator } from 'react-navigation-stack'
import DashBoardScreen from '../screens/DashBoard/DashBoardScreen'
import MessagesScreen from '../screens/Messages/MessagesScreen'
import SignInScreen from '../screens/Auth/SignInScreen'

const MainStack = createStackNavigator(
  {
    DashBoard: DashBoardScreen,
    Messages: MessagesScreen
  },
  {
    initialRouteName: 'DashBoard',
    headerMode: 'none'
  }
)

export default MainStack
