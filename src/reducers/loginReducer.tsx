import { LOGIN_REQUEST, LOGOUT, LOGIN_SUCCESS, FAILED_LOGIN, LoginState, LoginActionsTypes } from '../utils/ReduxTypes'

const initialState: LoginState = { user_id: '', email: '', password: '', error: '', isLoading: false, access_token: '' };

const loginReducer = (
  state = initialState,
  action: LoginActionsTypes
): LoginState => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user_id: action.payload.user_id,
        access_token: action.payload.access_token
      }
      case LOGIN_REQUEST:
        return {
          ...state,
          isLoading: true,
          email: action.payload.email,
          password: action.payload.password
        }
    case LOGOUT:
      return {
        ...state,
        user_id: '',
        password: '',
        email: '',
        isLoading: false
      }
    case FAILED_LOGIN:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      }
    default:
      return state
  }
}

export default loginReducer
