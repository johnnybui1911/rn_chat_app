import React from 'react'
import { SafeAreaView, View, Text, Alert, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import pallete from '../../assets/pallete'
import { UserContext } from '../../contexts'
import { firebaseService } from '../../services'
import { CustomInput } from './CustomInput'

export default function SignInScreen({ navigation }) {
  const { authorize } = React.useContext(UserContext)
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleLogin = () => {
    if (email && password) {
      firebaseService.signIn(email, password).then(({ user, error }) => {
        if (error) {
          Alert.alert('Something went wrong')
          return
        }

        AsyncStorage.setItem('user', JSON.stringify(user)).then(() => {
          authorize(user)
          navigation.navigate('DashBoard')
        })
      })
    } else {
      Alert.alert('Please fill inputs')
    }
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: pallete.primaryColor }} />
      <View style={{ flex: 1, paddingHorizontal: 24 }}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <CustomInput placeholder="Email" input={email} setInput={setEmail} />
          <CustomInput
            placeholder="Password"
            input={password}
            setInput={setPassword}
            secureTextEntry
          />
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <TouchableOpacity
            onPress={handleLogin}
            style={{
              backgroundColor: pallete.primaryColor,
              height: 48,
              borderRadius: 12,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text style={{ color: pallete.whiteColor }}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}
