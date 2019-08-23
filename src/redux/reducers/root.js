import { combineReducers } from 'redux'
import sessionReducer from './session'
import userReducer from './user'
// import messageReducer from './message'

export default combineReducers({
  session: sessionReducer,
  user: userReducer
})
