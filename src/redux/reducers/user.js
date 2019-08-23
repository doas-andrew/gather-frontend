let initialState = {
  // id: null,
  // friends: [],
  // messages: [],
  // sent_messages: []
}

export default (state = initialState, action) => {
  switch (action.type) {

    case 'SET_USER':
      return {...action.user }

    case 'MESSAGE_SENT': {
      let newArr = state.sent_messages.slice()
      newArr.push(action.message)
      return {...state, sent_messages: newArr }
    }

    case 'NEW_EVENT': {
      let newArr = state.events.slice()
      newArr.push(action.event)
      return {...state, events: newArr }
    }

    case 'MESSAGE_SEEN': {
      let messages = state.messages
      messages.find(msg => msg.id === action.message_id).seen = true

      return {...state, messages }
    }

    default: { return state }
  }
}
