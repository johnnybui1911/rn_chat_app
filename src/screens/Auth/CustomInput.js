import React from 'react'
import { View, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import pallete from '../../assets/pallete'

export function CustomInput({
  placeholder,
  input,
  setInput,
  secureTextEntry = false
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: pallete.greyColor,
        marginBottom: 6
      }}
    >
      <View style={{ width: 20 }}>
        <Icon name="search" size={14} color={pallete.greyColor} />
      </View>
      <View style={{ flex: 1, paddingHorizontal: 6 }}>
        <TextInput
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          value={input}
          onChangeText={text => setInput(text)}
        />
      </View>
      <View style={{ width: 20, alignItems: 'flex-end' }}></View>
    </View>
  )
}
