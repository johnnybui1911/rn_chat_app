import React from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'
import { withNavigation } from 'react-navigation'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import pallete from '../../assets/pallete'

const Header = ({ navigation, label }) => (
  <View
    style={{
      paddingVertical: 24,
      justifyContent: 'center',
      height: 60,
      backgroundColor: pallete.primaryColor
    }}
  >
    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ width: 50, paddingLeft: 24 }}>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.goBack()
          }}
        >
          <View
            style={{
              width: 24,
              height: 24,
              borderRadius: 24,
              backgroundColor: pallete.whiteColor,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text
              style={{
                color: pallete.primaryColor,
                fontSize: 12,
                marginBottom: 2
              }}
            >
              2
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text
          style={{
            fontSize: 16,
            color: pallete.whiteColor
          }}
        >
          {label}
        </Text>
      </View>
      <View style={{ width: 50, paddingRight: 24 - 4, alignItems: 'flex-end' }}>
        <MaterialCommunityIcons
          name="dots-horizontal"
          size={30}
          color={pallete.whiteColor}
        />
      </View>
    </View>
  </View>
)

export default Header
