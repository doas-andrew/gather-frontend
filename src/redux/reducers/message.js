const initialState = {
  deleteMode: false,
  messagesToDelete: [],
  showMessage: false
}

export default (state = initialState, action) => {
  switch (action.type) {

    case 'TOGGLE_DELETE_MODE':
      return {...state, deleteMode: !state.deleteMode }

    case 'MARK_FOR_DELETION': {
      let newArr = state.messagesToDelete

      if (newArr.includes(action.message_id))
        newArr.splice(newArr.indexOf(action.message_id), 1)
      else
        newArr.push(action.message_id)

      return {...state, messagesToDelete: newArr }
    }

    case 'OPEN_MODAL':
      return {...state, showMessage: action.message }

    case 'CLOSE_MODAL':
      return {...state, showMessage: null }

    default: return state
  }
}
