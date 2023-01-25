import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from '@redux-devtools/extension'
import user from '@/store/modules/user/reducer'
import permission from './modules/permission/reducer'
import local from './modules/local/reducer'

const rootReducer = combineReducers({
  user,
  permission,
  local
})

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type PayloadAction<T, P = undefined> = P extends undefined
  ? {
      type: T
    }
  : {
      type: T
      payload: P
    }

export default store
