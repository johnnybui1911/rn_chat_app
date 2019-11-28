import auth, { firebase } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

import { COLLECTIONS } from '../constants/index'

export default class FirebaseService {
  firestore = firestore
  auth = auth
  chatRef = this.firestore().collection(COLLECTIONS.CHATS)
  usersRef = this.firestore().collection(COLLECTIONS.USERS)
  roomsRef = this.firestore().collection(COLLECTIONS.ROOMS)
  roomDetailsRef = this.firestore().collection(COLLECTIONS.ROOM_DETAILS)

  async fetchUsers() {
    const users = await this.usersRef.get()

    return users.docs
  }

  async fetchUserDetail(uid) {
    const user = await this.usersRef.doc(uid).get()
    return user.data()
  }

  async signIn(email, password) {
    // const email = 'namjackson123@gmail.com'
    // const password = 'Nam191198'
    try {
      const response = await this.auth().signInWithEmailAndPassword(
        email,
        password
      )
      // const response = await this.auth().signInAnonymously()
      return { user: response.user }
    } catch (error) {
      return { error }
    }
  }

  fetchRoomsByUser = async () => {
    const { uid } = this.auth().currentUser
    try {
      const room = await this.usersRef.doc(uid).get()
      const { rooms } = room.data()
      const promises = rooms.map(async roomId => {
        const roomData = await this.roomsRef.doc(roomId).get()
        const admin = await this.usersRef
          .doc(
            roomData.data().id2 === uid
              ? roomData.data().id1
              : roomData.data().id2
          )
          .get()
        const { name } = admin.data()
        return { id: roomId, name, adminId: admin.id }
      })
      const roomList = await Promise.all(promises)
      return roomList
    } catch (e) {
      return []
    }
  }

  async fetchMessages() {
    const messages = await this.chatRef
      .orderBy('createAt', 'desc')
      .limit(10)
      .get()

    return messages.docs
  }

  async createMessage({ message, uid, toUid }) {
    try {
      console.log({ uid, toUid })
      const room = await this.roomsRef
        .where('id1', '==', uid)
        .where('id2', '==', toUid)
        .get()

      const roomReverse = await this.roomsRef
        .where('id1', '==', toUid)
        .where('id2', '==', uid)
        .get()

      if (room.size) {
        console.log('Room defined')
        await room.forEach(async documentSnapshot => {
          console.log(documentSnapshot)
          const roomData = await documentSnapshot.ref
          await roomData.collection('messages').add({
            message,
            createAt: new Date(),
            from_id: uid,
            to_id: toUid
          })
        })
      } else if (roomReverse.size) {
        console.log('Room R defined')
        await roomReverse.forEach(async documentSnapshot => {
          console.log(documentSnapshot)
          const roomData = await documentSnapshot.ref
          await roomData.collection('messages').add({
            message,
            createAt: new Date(),
            from_id: uid,
            to_id: toUid
          })
        })
      } else {
        console.log('Room not defined')
        const roomRef = await this.roomsRef.add({
          id1: uid,
          id2: toUid
        })

        const roomId = roomRef.id

        await roomRef.collection('messages').add({
          message,
          createAt: new Date(),
          from_id: uid,
          to_id: toUid
        })

        await this.usersRef.doc(uid).update({
          rooms: this.firestore.FieldValue.arrayUnion(roomId)
        })

        await this.usersRef.doc(toUid).update({
          rooms: this.firestore.FieldValue.arrayUnion(roomId)
        })
      }

      // if (!room.size && !roomReverse.size) {
      //   console.log('Room not defined')
      //   const roomRef = await this.roomsRef.add({
      //     id1: uid,
      //     id2: toUid
      //   })

      //   const roomId = roomRef.id

      //   await roomRef.collection('messages').add({
      //     message,
      //     createAt: new Date(),
      //     from_id: uid,
      //     to_id: toUid
      //   })

      //   await this.usersRef.doc(uid).update({
      //     rooms: this.firestore.FieldValue.arrayUnion(roomId)
      //   })

      //   await this.usersRef.doc(toUid).update({
      //     rooms: this.firestore.FieldValue.arrayUnion(roomId)
      //   })
      // } else {
      // }
    } catch (e) {
      console.log(e)
      // const roomRef = await this.roomsRef.add({
      //   id1: uid,
      //   id2: toUid
      // })
      // const roomId = roomRef.id
      // await this.chatRef
      //   .doc(roomId)
      //   .collection('messages')
      //   .add({
      //     message,
      //     createAt: new Date(),
      //     user: {
      //       uid
      //     }
      //   })

      // await this.usersRef.doc(uid).update({
      //   rooms: this.firestore.FieldValue.arrayUnion(roomId)
      // })
    }
  }
}
