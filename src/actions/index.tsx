import { UserCredentials, User } from '../utils/Types'
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  FAILED_LOGIN,
  FETCH_USER_ERROR,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  LoginActionsTypes,
  UserActionTypes,
} from '../utils/ReduxTypes'

// AUTH AND USER ACTIONS

export const login_request = (values: UserCredentials): LoginActionsTypes => {
  return {
    type: LOGIN_REQUEST,
    payload: values,
  }
}

export const login_success = (user_id: string): LoginActionsTypes => {
  return {
    type: LOGIN_SUCCESS,
    payload: user_id,
  }
}

export const logout = (): LoginActionsTypes => {
  return {
    type: LOGOUT,
  }
}

export const failed_login = (error: string): LoginActionsTypes => {
  return {
    type: FAILED_LOGIN,
    payload: error,
  }
}

export const fetchUserError = (error: string): UserActionTypes => {
  return {
    type: FETCH_USER_ERROR,
    payload: error,
  }
}

export const fetchUserRequest = (userId: string): UserActionTypes => {
  return {
    type: FETCH_USER_REQUEST,
    payload: userId,
  }
}

export const fetchUserSuccess = (result: User): UserActionTypes => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: result,
  }
}
