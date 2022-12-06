import { SET_TOKEN, REMOVE_TOKEN } from '@/store/modules/user/constants'
import { AppDispatch } from '@/store'
import { LoginForm } from '@/types'
import { login } from '@/api'

export const setTokenAction = (payload: string) => ({
  type: SET_TOKEN as 'SET_TOKEN',
  payload
})

export const removeTokenAction = (payload: never) => ({
  type: REMOVE_TOKEN as 'REMOVE_TOKEN',
  payload
})

export const loginAction =
  (loginForm: LoginForm) => async (dispatch: AppDispatch) => {
    const { data } = await login(loginForm)
    dispatch(setTokenAction(data.data))
  }
