/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react'
import { StyleSheet, StatusBar } from 'react-native'
import { createAppContainer } from 'react-navigation'
import MainStack from './src/navigations/MainStack'

const AppContainer = createAppContainer(MainStack)

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <AppContainer />
    </>
  )
}

const styles = StyleSheet.create({})

export default App
