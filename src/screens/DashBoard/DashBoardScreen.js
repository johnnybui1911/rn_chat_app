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
  ActivityIndicator,
  TouchableWithoutFeedback
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import pallete from '../../assets/pallete'
import { UserContext } from '../../contexts'
import FriendContainer from './FriendContainer'
import { firebaseService } from '../../services'
import images from '../../assets/images'
import { Avatar } from './Avatar'

export const DashBoardScreen: () => React$Node = ({ navigation }) => {
  const { user } = React.useContext(UserContext)
  const { uid } = user

  const [userDetail, setUserDetail] = React.useState(null)

  useEffect(() => {
    firebaseService.fetchUserDetail(uid).then(userData => {
      const { name } = userData
      setUserDetail({ name })
    })
  }, [])

  const [loading, setLoading] = React.useState(true)
  const [rooms, setRooms] = React.useState([])
  useEffect(() => {
    firebaseService.fetchRoomsByUser().then(roomList => {
      // console.log(roomList)
      setRooms(roomList)
      setLoading(false)
    })
  }, [])

  const [contacts, setContacts] = React.useState({})

  useEffect(() => {
    firebaseService.fetchUsers().then(users => {
      const newContacts = {}
      users
        .filter(snapshot => snapshot.id != uid)
        .forEach(documentSnapshot => {
          const data = documentSnapshot.data()
          const id = documentSnapshot.id
          newContacts[id] = {
            id,
            name: data.name
          }
        })

      firebaseService.fetchRoomsByUser().then(roomList => {
        // console.log(roomList)
        roomList.forEach(room => {
          const { adminId } = room
          delete newContacts[adminId]
        })
        setRooms(roomList)
        setLoading(false)
        setContacts(newContacts)
        console.log('rooms', rooms)
      })
    })
  }, [])

  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    if (refresh) {
      setRefresh(false)
    }
  }, [refresh])

  const _onRefresh = () => {
    setRefresh(true)
  }

  const contactList = []
  Object.entries(contacts).forEach(([key, value]) => {
    contactList.push(value)
  })

  console.log('contactList', contactList)

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'red' }}>
        <View
          style={{ flex: 1, paddingVertical: 24, justifyContent: 'center' }}
        >
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                flex: 1,
                paddingLeft: 24,
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <Avatar size={40} source={images.avar2} />
              <Text style={{ color: pallete.whiteColor, marginLeft: 12 }}>
                {userDetail && userDetail.name}
                {/* {displayName || email} */}
              </Text>
            </View>
            <View
              style={{ width: 50, paddingRight: 24, alignItems: 'flex-end' }}
            >
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
              // flex: 1,
              backgroundColor: '#FDF8E7',
              borderTopRightRadius: 36,
              borderTopLeftRadius: 36,
              paddingVertical: 12,
              // height: 180
              minHeight: 40
              // maxHeight: 120
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                paddingHorizontal: 24
                // alignItems: 'center',
              }}
            >
              <View style={{ flex: 1 }}>
                <Text>Favorite contacts</Text>
              </View>
              <View
                style={{
                  width: 50,
                  alignItems: 'flex-end'
                  // justifyContent: 'center'
                }}
              >
                <Icon name="ellipsis-h" size={18} color="#000" />
              </View>
            </View>
            <FlatList
              horizontal
              contentContainerStyle={{
                paddingHorizontal: 12,
                marginTop: 32
              }}
              showsHorizontalScrollIndicator={false}
              data={contactList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => {
                const { name, id } = item
                return (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      navigation.navigate('Messages', {
                        item,
                        newMess: true
                      })
                    }}
                  >
                    <View
                      key={id}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 12
                      }}
                    >
                      <Avatar
                        key={id}
                        size={60}
                        source={index % 2 === 0 ? images.avar1 : images.avar2}
                      />
                      <Text style={{ paddingTop: 8 }}>{name}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                )
              }}
            />
          </View>
          <View
            style={{
              backgroundColor: '#fff',
              flex: 1,
              borderTopLeftRadius: 26,
              borderTopRightRadius: 26
            }}
          >
            <FlatList
              onRefresh={_onRefresh}
              refreshing={refresh}
              ListFooterComponent={() => {
                return loading ? (
                  <ActivityIndicator
                    size="large"
                    color={pallete.primaryColor}
                  />
                ) : null
              }}
              contentContainerStyle={{
                paddingVertical: 12
              }}
              ItemSeparatorComponent={() => (
                <View style={{ paddingVertical: 4 }} />
              )}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              data={rooms}
              renderItem={({ item, index }) => {
                return <FriendContainer item={item} index={index} />
              }}
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
