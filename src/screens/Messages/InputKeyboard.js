/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import {
  View,
  TextInput,
  Text,
  TouchableWithoutFeedback,
  ActivityIndicator
} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import pallete from '../../assets/pallete'
import { SCREEN_WIDTH } from '../../assets/dimensions'
import { UserContext } from '../../contexts'
import { firebaseService } from '../../services'

const InputKeyboard = ({ toUid }) => {
  const {
    user: { uid }
  } = React.useContext(UserContext)
  const [message, setMessage] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSendMess = React.useCallback(
    function() {
      setIsLoading(true)
      console.log({ uid, toUid })
      firebaseService.createMessage({ message, uid, toUid }).then(() => {
        setIsLoading(false)
        setMessage('')
      })
    },
    [message]
  )

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
              value={message}
              onChangeText={text => setMessage(text)}
              style={{
                width: '100%',
                padding: 12,
                fontSize: 16,
                fontWeight: 'bold'
              }}
            />
          </View>
        </View>
        <TouchableWithoutFeedback onPress={handleSendMess}>
          <View
            style={{
              width: 50,
              paddingRight: 12,
              alignItems: 'flex-end'
            }}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color={pallete.primaryColor} />
            ) : (
              <Text
                style={{
                  width: '100%',
                  fontSize: 14,
                  fontWeight: 'bold'
                }}
              >
                Send
              </Text>
            )}

            {/* <AntDesign name="paperclip" size={24} color={pallete.greyColor} /> */}
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}

export default InputKeyboard
