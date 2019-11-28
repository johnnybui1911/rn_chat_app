/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { unionWith } from 'lodash'
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import moment from 'moment'
import pallete from '../../assets/pallete'
import InputKeyboard from './InputKeyboard'
import Header from './Header'
import { UserContext } from '../../contexts'
import { firebaseService } from '../../services'
import { messagesReducer } from './reducers'

const MessagesScreen = ({ navigation }) => {
  const {
    user: { uid }
  } = React.useContext(UserContext)

  const newMess = navigation.getParam('newMess', false)

  const item = navigation.getParam('item', {
    adminId: 'GeL5IBbaBobBo6PIHVVREmgGLxs2',
    name: 'Nam Jose',
    id: '0AzZ0jcEJyOMj90yEFEO'
  })
  const { name, id, adminId } = item

  const toUid = newMess ? id : adminId
  const roomId = newMess ? '' : id

  // const [messages, dispatchMessages] = React.useReducer(messagesReducer, [])
  const [loading, setLoading] = React.useState(true)
  const [messages, setMessages] = React.useState([])

  React.useEffect(() => {
    // console.log(roomId)
    const unsubcribe = firebaseService.roomsRef
      .doc(roomId)
      .collection('messages')
      .onSnapshot(snapshot => {
        const newMessages = unionWith(messages, snapshot.docs, (a, b) => {
          return a.id === b.id
        }).sort((a, b) => {
          const aData = a.data()
          const bData = b.data()

          return bData.createAt.seconds - aData.createAt.seconds
        })
        setMessages(newMessages)
        setLoading(false)
        // dispatchMessages({ type: 'add', payload: snapshot.docs })
      })

    return () => {
      unsubcribe()
    }
  }, [false])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: pallete.primaryColor }}>
      <Header navigation={navigation} label={name} />
      <View
        style={{
          flex: 1,
          justifyContent: 'center'
        }}
      >
        <FlatList
          inverted
          ListHeaderComponent={() => {
            return loading ? (
              <ActivityIndicator size="large" color={pallete.primaryColor} />
            ) : null
          }}
          data={messages}
          showsVerticalScrollIndicator={false}
          style={{
            backgroundColor: pallete.whiteColor,
            zIndex: 1,
            flex: 1
          }}
          contentContainerStyle={{
            paddingTop: 100
          }}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <View style={{ paddingVertical: 6 }} />}
          renderItem={({ item, index }) => {
            const data = item.data()
            console.log(data)
            const { from_id, message, createAt } = data
            const time_str = moment(createAt.toDate()).format('H:mm A')
            const user_id = from_id
            if (user_id === uid) {
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
                    <Text style={{ marginBottom: 6 }}>{time_str}</Text>
                    <Text>{message}</Text>
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
                    <Text style={{ marginBottom: 6 }}>{time_str}</Text>
                    <Text>{message}</Text>
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
      <InputKeyboard toUid={toUid} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  headerTitle: { color: '#fff', marginRight: 32, fontSize: 18 }
})

export default MessagesScreen
