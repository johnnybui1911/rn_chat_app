import { unionWith } from 'lodash'

export function messagesReducer(state, action) {
  switch (action.type) {
    case 'add':
      return unionWith(state, action.payload, (a, b) => {
        return a.id === b.id
      }).sort((a, b) => {
        const aData = a.data()
        const bData = b.data()

        return bData.created_at.seconds - aData.created_at.seconds
      })

    default:
      throw new Error('Action type is not implemented')
  }
}
