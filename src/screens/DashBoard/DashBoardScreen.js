/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native DashBoardScreen
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  Image,
  TouchableWithoutFeedback
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import pallete from '../../assets/pallete'

const DashBoardScreen: () => React$Node = ({ navigation }) => {
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    if (refresh) {
      setRefresh(false)
    }
  }, [refresh])

  const _onRefresh = () => {
    setRefresh(true)
  }

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'red' }}>
        <View
          style={{ flex: 1, paddingVertical: 24, justifyContent: 'center' }}
        >
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 50, paddingLeft: 24 }}>
              {/* <Icon name="arrow-left" size={24} color="#fff" /> */}
            </View>
            <View style={{ flex: 1, paddingRight: 24, alignItems: 'flex-end' }}>
              <Icon name="search" size={24} color="#fff" />
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              paddingHorizontal: 24,
              alignItems: 'center'
            }}
          >
            <Text style={styles.headerTitle}>Messages</Text>
            <Text style={styles.headerTitle}>Online</Text>
            <Text style={styles.headerTitle}>Group</Text>
          </View>
        </View>
        <View
          style={{
            flex: 4,
            justifyContent: 'center',
            backgroundColor: '#FDF8E7',
            height: '100%',
            borderTopRightRadius: 36,
            borderTopLeftRadius: 36
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: '#FDF8E7',
              borderTopRightRadius: 36,
              borderTopLeftRadius: 36,
              paddingVertical: 12
              // maxHeight: 120
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                paddingHorizontal: 24,
                alignItems: 'flex-end'
              }}
            >
              <View style={{ flex: 1 }}>
                <Text>Favorite contacts</Text>
              </View>
              <View
                style={{
                  width: 50,
                  alignItems: 'flex-end',
                  justifyContent: 'center'
                }}
              >
                <Icon name="ellipsis-h" size={18} color="#000" />
              </View>
            </View>
            <FlatList
              horizontal
              contentContainerStyle={{
                paddingHorizontal: 12
              }}
              showsHorizontalScrollIndicator={false}
              data={[1, 2, 3, 4, 5, 6, 7]}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => {
                return (
                  <View
                    key={index}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingHorizontal: 12
                    }}
                  >
                    <View
                      style={{
                        height: 60,
                        width: 60,
                        borderRadius: 60 / 2,
                        backgroundColor: 'grey'
                      }}
                    >
                      <Image
                        source={{
                          uri: 'https://i.pravatar.cc/40?img=5'
                        }}
                        style={{ height: 60, width: 60, borderRadius: 60 / 2 }}
                        resizeMode="contain"
                      />
                    </View>
                    <Text style={{ paddingTop: 8 }}>Ella</Text>
                  </View>
                )
              }}
            />
          </View>
          <View
            style={{
              backgroundColor: '#fff',
              flex: 2,
              borderTopLeftRadius: 26,
              borderTopRightRadius: 26
            }}
          >
            <FlatList
              onRefresh={_onRefresh}
              refreshing={refresh}
              contentContainerStyle={{
                paddingVertical: 12
              }}
              ItemSeparatorComponent={() => (
                <View style={{ paddingVertical: 4 }} />
              )}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              data={[1, 2, 3, 4, 5, 6]}
              renderItem={({ item, index }) => (
                <TouchableWithoutFeedback
                  onPress={() => navigation.navigate('Messages')}
                >
                  <View
                    key={item}
                    style={{
                      flexDirection: 'row',
                      paddingVertical: 24,
                      paddingLeft: 24,
                      paddingRight: 24 - 4,
                      marginRight: 24,
                      borderTopRightRadius: 16,
                      borderBottomRightRadius: 16,
                      backgroundColor:
                        index === 5
                          ? pallete.primaryColorLight
                          : pallete.whiteColor,
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
                          source={{
                            uri: 'https://i.pravatar.cc/60?img=15'
                          }}
                          style={{
                            height: 60,
                            width: 60,
                            borderRadius: 60 / 2
                          }}
                          resizeMode="contain"
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
                      <Text style={{ marginBottom: 8 }}>James</Text>
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
                          opacity: index === 5 ? 1 : 0
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
              )}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  headerTitle: { color: '#fff', marginRight: 32, fontSize: 18 }
})

export default DashBoardScreen
