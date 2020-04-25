import { UserCredentials, User } from '../utils/Types'

// AUTH AND USER ACTIONS

export const LOGIN_REQUEST = 'LOGIN_REQUEST'

export const login_request = (values: UserCredentials) => {
  return {
    type: LOGIN_REQUEST,
    payload: { values },
  }
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'

export const login_success = (user_id: String) => {
  return {
    type: LOGIN_SUCCESS,
    payload: { user_id },
  }
}

export const LOGOUT = 'LOGOUT'

export const logout = () => {
  return {
    type: LOGOUT,
  }
}

export const FAILED_LOGIN = 'FAILED_LOGIN'

export const failed_login = (error: String) => {
  return {
    type: FAILED_LOGIN,
    payload: {
      error,
    },
  }
}

export const FETCH_USER_ERROR = 'FETCH_USER_ERROR'

export const fetchUserError = (error: String) => {
  return {
    type: FETCH_USER_ERROR,
    payload: {
      error,
    },
  }
}

export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST'

export const fetchUserRequest = (userId: String) => {
  return {
    type: FETCH_USER_REQUEST,
    payload: {
      userId,
    },
  }
}

export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'

export const fetchUserSuccess = (result: User) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: {
      result,
    },
  }
}
