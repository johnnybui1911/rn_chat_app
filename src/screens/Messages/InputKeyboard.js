import React from 'react'
import { View, TextInput } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import pallete from '../../assets/pallete'
import { SCREEN_WIDTH } from '../../assets/dimensions'

const InputKeyboard = ({ input, setInput }) => {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        width: SCREEN_WIDTH,
        paddingHorizontal: 24,
        paddingVertical: 12,
        backgroundColor: pallete.whiteColor,
        zIndex: 9
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: pallete.secondaryColor,
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 36
        }}
      >
        <View style={{ width: 50, paddingLeft: 12 }}>
          <AntDesign name="smileo" size={24} color={pallete.greyColor} />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            minHeight: 60
          }}
        >
          <View>
            <TextInput
              multiline
              placeholder="Type your message..."
              value={input}
              onChangeText={text => setInput(text)}
              style={{
                // backgroundColor: pallete.secondaryColor,
                width: '100%',
                padding: 12,
                fontSize: 16,
                fontWeight: 'bold'
              }}
            />
          </View>
        </View>
        <View
          style={{
            width: 50,
            paddingRight: 12,
            alignItems: 'flex-end'
          }}
        >
          <AntDesign name="paperclip" size={24} color={pallete.greyColor} />
        </View>
      </View>
    </View>
  )
}

export default InputKeyboard
