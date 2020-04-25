import {
  FETCH_USER_ERROR,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
} from '../actions/index'

const userReducer = (
  state = {
    user: {
      id: '',
      name: '',
      bio: '',
      email: '',
      country: '',
      languagues: [],
      isHost: null,
    },
    error: '',
    isLoading: null,
  },
  action
) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
        user: action.payload.result,
      }

    case FETCH_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case FETCH_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      }
    default:
      return state
  }
}

export default userReducer
