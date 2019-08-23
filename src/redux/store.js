import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import promise from 'redux-promise-middleware'
import thunk from 'redux-thunk'
import rootReducer from './reducers/root'

const middleware = applyMiddleware(promise,thunk)
export default createStore(rootReducer, composeWithDevTools(middleware))
