import React from 'react'
import { View, Image } from 'react-native'
import pallete from '../../assets/pallete'
export function Avatar({ size, source }) {
  return (
    <View
      style={{
        height: size,
        width: size,
        borderRadius: size / 2,
        backgroundColor: pallete.greyColorlight
      }}
    >
      <Image
        source={source}
        style={{ height: size, width: size, borderRadius: size / 2 }}
      />
    </View>
  )
}
