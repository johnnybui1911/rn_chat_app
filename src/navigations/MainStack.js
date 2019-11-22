import { createStackNavigator } from 'react-navigation-stack'
import DashBoardScreen from '../containers/DashBoard/DashBoardScreen'
import MessagesScreen from '../containers/Messages/MessagesScreen'

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
