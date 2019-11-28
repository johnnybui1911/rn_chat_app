import React, { useContext, useReducer, useEffect } from 'react'
import { FlatList, SafeAreaView, View } from 'react-native'
import Input from '../Input'
import Message from '../Message'

import { chatRoomStyles as styles } from '../../styles'
import { UserContext } from '../../contexts'
import { messagesReducer } from './reducers'
import { firebaseService } from '../../services'

export default function HooksExample() {
  const {
    user: { uid }
  } = useContext(UserContext)
  const [messages, dispatchMessages] = useReducer(messagesReducer, [])

  useEffect(() => {
    firebaseService.messageRef
      .orderBy('createAt', 'desc')
      .onSnapshot(snapshot => {
        dispatchMessages({ type: 'add', payload: snapshot.docs })
      })
  }, [false])

  return (
    <SafeAreaView>
      <View style={styles.messagesContainer}>
        <FlatList
          inverted
          data={messages}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => {
            const data = item.data()
            const side = data.user_id === uid ? 'right' : 'left'
            return <Message side={side} message={data.message} />
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Input />
      </View>
    </SafeAreaView>
  )
}
