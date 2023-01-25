import { LocalAction } from './action-creators'
import en from '@/locals/en-US'
import { CHANGE_LOCAL } from './constants'

const initialState = {
  currentLocal: en
}

const local = (state = initialState, action: LocalAction) => {
  switch (action.type) {
    case CHANGE_LOCAL:
      return { ...state, currentLocal: action.payload }
    default:
      return { ...state }
  }
}

export default local
