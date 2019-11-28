import React from 'react'
import { createSwitchNavigator } from 'react-navigation'
import { SafeAreaView, ActivityIndicator } from 'react-native'
import pallete from '../assets/pallete'
import { UserContext } from '../contexts'
import MainStack from './MainStack'
import SignInScreen from '../screens/Auth/SignInScreen'
import AsyncStorage from '@react-native-community/async-storage'

const Authorization = ({ navigation }) => {
  const context = React.useContext(UserContext)
  const { authorize } = context

  const fetchUser = async () => {
    try {
      const userString = await AsyncStorage.getItem('user')
      const user = JSON.parse(userString)
      if (user) {
        authorize(user)
        navigation.navigate('Main')
      } else {
        navigation.navigate('SignIn')
      }
    } catch (e) {
      navigation.navigate('SignIn')
    }
  }

  React.useEffect(() => {
    fetchUser()
    // if (user) {
    //   navigation.navigate('DashBoard')
    // } else {
    //   navigation.navigate('SignIn')
    // }
  }, [])

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: pallete.whiteColor,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <ActivityIndicator size="large" color={pallete.primaryColor} />
    </SafeAreaView>
  )
}

export default createSwitchNavigator(
  {
    Auth: Authorization,
    SignIn: SignInScreen,
    Main: MainStack
  },
  {
    initialRouteName: 'Auth'
  }
)
