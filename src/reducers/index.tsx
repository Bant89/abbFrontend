import { combineReducers } from 'redux'
import userReducer from './userReducer'
import loginReducer from './loginReducer'

export const mergedReducers = combineReducers({
  loginState: loginReducer,
  userState: userReducer,
})

export type RootState = ReturnType<typeof mergedReducers>
