/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useEffect } from 'react'
import { StyleSheet, StatusBar, Alert } from 'react-native'
import { createAppContainer, SafeAreaView } from 'react-navigation'
import AsyncStorage from '@react-native-community/async-storage'
import MainStack from './src/navigations/MainStack'
import Input from './src/components/Input'
import HooksExample from './src/components/HooksExample'
import { UserContext } from './src/contexts'
import { firebaseService } from './src/services'

import Loader from './src/components/common/Loader'
import SignInScreen from './src/screens/Auth/SignInScreen'
import Authorization from './src/navigations/Authorization'

const AppContainer = createAppContainer(Authorization)

const App = () => {
  const [user, setUser] = useState(null)

  // AsyncStorage.removeItem('user')

  const authorize = new_user => {
    setUser(new_user)
  }

  return (
    <UserContext.Provider value={{ user, authorize }}>
      {/* <HooksExample /> */}
      <AppContainer />
    </UserContext.Provider>
  )
}

const styles = StyleSheet.create({})

export default App
