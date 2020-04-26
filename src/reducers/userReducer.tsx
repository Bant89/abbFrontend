import {
  FETCH_USER_ERROR,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  UserState,
  UserActionTypes
} from '../utils/ReduxTypes'

const initialState: UserState = {
  user: {
    id: '',
    name: '',
    bio: '',
    email: '',
    country: '',
    languagues: [],
    isHost: false,
  },
  error: '',
  isLoading: false,
}

const userReducer = (
  state = initialState,
  action: UserActionTypes
): UserState => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        error: '',
        isLoading: true,
      }

    case FETCH_USER_SUCCESS:
      return {
        ...state,
        error: '',
        isLoading: false,
        user: action.payload
      }
    case FETCH_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    default:
      return state
  }
}

export default userReducer
