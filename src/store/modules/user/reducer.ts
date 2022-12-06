import { PayloadAction } from '@/store'
import { REMOVE_TOKEN, SET_TOKEN } from './constants'
import { getToken, removeToken, setToken } from '@/utils/auth'

export interface UserState {
  token?: string
}

export type UserAction =
  | PayloadAction<typeof SET_TOKEN, string>
  | PayloadAction<typeof REMOVE_TOKEN, never>

const initState: UserState = {
  token: getToken()
}

const user = (state = initState, action: UserAction) => {
  switch (action.type) {
    case SET_TOKEN:
      setToken(action.payload)
      return { ...state, token: action.payload }
    case REMOVE_TOKEN:
      removeToken()
      return { ...state, token: undefined }
    default:
      return state
  }
}

export default user
