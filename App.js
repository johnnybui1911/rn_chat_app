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
import MainStack from './src/navigations/MainStack'
import Input from './src/components/Input'
import HooksExample from './src/components/HooksExample'
import { UserContext } from './src/contexts'
import { firebaseService } from './src/services'

import Loader from './src/components/common/Loader'

const AppContainer = createAppContainer(MainStack)

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    firebaseService.signIn().then(({ user, error }) => {
      if (error) {
        Alert.alert('Something went wrong')
        return
      }
      setUser(user)
    })
  }, [false])

  if (!user) {
    return <Loader />
  }

  return (
    <UserContext.Provider value={user}>
      <HooksExample />
    </UserContext.Provider>
  )
}

const styles = StyleSheet.create({})

export default App
