import auth, { firebase } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

import COLLECTIONS from '../constants'

export default class FirebaseService {
  firestore = firestore
  auth = auth
  messageRef = this.firestore().collection('messages')

  async signIn() {
    const email = 'namjackson123@gmail.com'
    const password = 'Nam191198'
    try {
      const response = await this.auth().signInWithEmailAndPassword(
        email,
        password
      )
      // const response = await this.auth().signInAnonymously()
      return { user: response.user }
    } catch (error) {
      console.log(error.message)
      return { error }
    }
  }

  async fetchMessages() {
    const messages = await this.messageRef
      .orderBy('created_at', 'desc')
      .limit(10)
      .get()

    return messages.docs
  }

  async createMessage({ message, uid }) {
    await this.messageRef.add({
      message,
      user_id: uid,
      created_at: new Date()
    })
  }
}
