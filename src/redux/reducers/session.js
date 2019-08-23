const initialState = {
  loggedIn: !!localStorage.token,
  errors: {}
}

export default (state = initialState, action) => {
  switch (action.type) {

    case 'ERRORS':
      return {...state, errors: {[action.errType]: action.errors} }

    case 'LOG_IN': {
      localStorage.setItem('token', action.token)
      return {...state, loggedIn: true }
    }

    case 'LOG_OUT': {
      localStorage.removeItem('token')
      return {...state, loggedIn: false }
    }

    default:
      return state
  }
}
