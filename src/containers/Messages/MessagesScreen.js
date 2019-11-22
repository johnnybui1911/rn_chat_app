/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import pallete from '../../assets/pallete'
import InputKeyboard from './InputKeyboard'
import Header from './Header'

const MessagesScreen = () => {
  const [input, setInput] = React.useState('')
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: pallete.primaryColor }}>
      <Header />
      <View
        style={{
          flex: 1,
          justifyContent: 'center'
          //   backgroundColor: pallete.whiteColor,
          //   height: '100%',
          //   borderTopRightRadius: 36,
          //   borderTopLeftRadius: 36
        }}
      >
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]}
          showsVerticalScrollIndicator={false}
          style={{
            backgroundColor: pallete.whiteColor,
            // borderTopRightRadius: 36,
            // borderTopLeftRadius: 36,
            width: '100%',
            zIndex: 1
          }}
          contentContainerStyle={{
            // borderTopRightRadius: 36,
            // borderTopLeftRadius: 36,
            overflow: 'hidden',
            paddingBottom: 120,
            zIndex: 1
          }}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <View style={{ paddingVertical: 6 }} />}
          renderItem={({ item, index }) => {
            if (index % 2 === 0) {
              return (
                <View style={{ paddingLeft: 64, zIndex: 1 }}>
                  <View
                    style={{
                      backgroundColor: pallete.secondaryColor,
                      paddingRight: 24,
                      paddingLeft: 12,
                      paddingVertical: 12,
                      justifyContent: 'center',
                      borderTopLeftRadius: 16,
                      borderBottomLeftRadius: 16
                    }}
                  >
                    <Text style={{ marginBottom: 6 }}>17:46</Text>
                    <Text>Cheapest flight, or most direct?</Text>
                  </View>
                </View>
              )
            } else {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 1
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: pallete.primaryColorLight,
                      paddingLeft: 24,
                      paddingRight: 12,
                      paddingVertical: 12,
                      justifyContent: 'center',
                      borderTopRightRadius: 16,
                      borderBottomRightRadius: 16
                    }}
                  >
                    <Text style={{ marginBottom: 6 }}>17:46</Text>
                    <Text>
                      Cheapest flight, or most direct? Cheapest flight, or most
                      direct? Cheapest flight, or most direct?
                    </Text>
                  </View>
                  <View
                    style={{
                      alignItems: 'flex-end',
                      width: 64,
                      paddingRight: 24
                    }}
                  >
                    <AntDesign
                      name="hearto"
                      size={24}
                      color={pallete.greyColor}
                    />
                  </View>
                </View>
              )
            }
          }}
        />
      </View>
      <InputKeyboard input={input} setInput={setInput} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  headerTitle: { color: '#fff', marginRight: 32, fontSize: 18 }
})

export default MessagesScreen
