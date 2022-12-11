import { PayloadAction } from '@/store'
import { REMOVE_TOKEN, SET_TOKEN, SET_USER_INFO } from './constants'
import { getToken, removeToken, setToken } from '@/utils/auth'
import { UserInfoUnionType } from './action-creator'

export interface UserState {
  token?: string
  userInfo: UserInfoUnionType
}

export type UserAction =
  | PayloadAction<typeof SET_TOKEN, string>
  | PayloadAction<typeof REMOVE_TOKEN>
  | PayloadAction<typeof SET_USER_INFO, UserInfoUnionType>

const initState: UserState = {
  token: getToken(),
  userInfo: {}
}

const user = (state = initState, action: UserAction) => {
  switch (action.type) {
    case SET_TOKEN:
      setToken(action.payload)
      return { ...state, token: action.payload }
    case REMOVE_TOKEN:
      removeToken()
      return { ...state, token: undefined }
    case SET_USER_INFO:
      return { ...state, userInfo: action.payload }
    default:
      return state
  }
}

export default user
