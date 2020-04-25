import { User, UserCredentials } from './Types'

export type LoginState = {
  user_id: string
  email: string
  password: string
  error: string
  isLoading: boolean
}

export type UserState = {
  user: User
  error: string
  isLoading: boolean
}

export const LOGIN_REQUEST = 'LOGIN_REQUEST'

interface LoginRequestAction {
  type: typeof LOGIN_REQUEST
  payload: UserCredentials
}


export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS
  payload: string
}

export const LOGOUT = 'LOGOUT'

interface LogoutAction {
  type: typeof LOGOUT
}

export const FAILED_LOGIN = 'FAILED_LOGIN'

interface FailedLoginAction {
  type: typeof FAILED_LOGIN
  payload: string
}

export type LoginActionsTypes = LoginRequestAction | LoginSuccessAction | LogoutAction | FailedLoginAction

export const FETCH_USER_ERROR = 'FETCH_USER_ERROR'

interface FetchUserErrorAction {
  type: typeof FETCH_USER_ERROR
  payload: string
}

export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST'

interface FetchUserRequestAction {
  type: typeof FETCH_USER_REQUEST
  payload: string
}

export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'

interface FetchUserSuccessAction {
  type: typeof FETCH_USER_SUCCESS
  payload: User
}

export type UserActionTypes = FailedLoginAction | FetchUserErrorAction | FetchUserRequestAction | FetchUserSuccessAction