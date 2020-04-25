import { combineReducers } from 'redux'
import userReducer from '../reducers/userReducer'
import loginReducer from '../reducers/loginReducer'

const mergedReducers = combineReducers({
  loginState: loginReducer,
  userState: userReducer,
})

export default mergedReducers
