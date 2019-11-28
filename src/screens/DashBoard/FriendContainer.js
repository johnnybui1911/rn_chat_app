/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native'
import pallete from '../../assets/pallete'
import { DashBoardScreen } from './DashBoardScreen'
import { withNavigation } from 'react-navigation'
import images from '../../assets/images'

export default withNavigation(function FriendContainer({
  item,
  index,
  navigation
}) {
  const { id, name, adminId } = item
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate('Messages', {
          item
        })
      }}
    >
      <View
        key={item.uid}
        style={{
          flexDirection: 'row',
          paddingVertical: 24,
          paddingLeft: 24,
          paddingRight: 24 - 4,
          marginRight: 24,
          borderTopRightRadius: 16,
          borderBottomRightRadius: 16,
          backgroundColor:
            index === 0 ? pallete.primaryColorLight : pallete.whiteColor,
          alignItems: 'center'
        }}
      >
        <View style={{ paddingRight: 12 }}>
          <View
            style={{
              height: 60,
              width: 60,
              borderRadius: 60 / 2,
              backgroundColor: 'grey'
            }}
          >
            <Image
              source={index % 2 === 0 ? images.avar1 : images.avar2}
              style={{
                height: 60,
                width: 60,
                borderRadius: 60 / 2
              }}
            />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            paddingRight: 12
          }}
        >
          <Text style={{ marginBottom: 8 }}>{name}</Text>
          <Text>See you soon</Text>
        </View>

        <View
          style={{
            width: 50,
            alignItems: 'center'
          }}
        >
          <Text
            style={{
              marginBottom: 8,
              fontSize: 12,
              fontWeight: 'bold'
            }}
          >
            17:40
          </Text>
          <View
            style={{
              backgroundColor: pallete.primaryColor,
              paddingVertical: 2,
              borderRadius: 16,
              paddingHorizontal: 10,
              opacity: index === 0 ? 1 : 0
            }}
          >
            <Text
              style={{
                fontSize: 10,
                fontWeight: 'bold',
                color: pallete.whiteColor
              }}
            >
              NEW
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
})
