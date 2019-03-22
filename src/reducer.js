import { combineReducers } from 'redux'
import { user } from './redux/user-redux'
import { chatuser } from './redux/chatuser'

export default combineReducers({ user, chatuser })
