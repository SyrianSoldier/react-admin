import {
  SET_TOKEN,
  REMOVE_TOKEN,
  SET_USER_INFO
} from '@/store/modules/user/constants'
import { AppDispatch } from '@/store'
import { BaseUserInfoType, LoginForm, UserInfoType } from '@/types'
import { getBaseUserInfo, getUserInfo, login } from '@/api'

export type UserInfoUnionType = Partial<
  UserInfoType['data'] & BaseUserInfoType['data']
>

export const setTokenAction = (payload: string) => ({
  type: SET_TOKEN as 'SET_TOKEN',
  payload
})

export const removeTokenAction = () => ({
  type: REMOVE_TOKEN as 'REMOVE_TOKEN'
})

export const setUserInfoAction = (payload: UserInfoUnionType) => ({
  type: SET_USER_INFO as 'SET_USER_INFO',
  payload
})

export const loginAction =
  (loginForm: LoginForm) => async (dispatch: AppDispatch) => {
    const { data } = await login(loginForm)
    dispatch(setTokenAction(data.data))
  }

export const setUserInfoThunk = () => async (dispatch: AppDispatch) => {
  const { data: infoData } = await getUserInfo()
  const { data: baseData } = await getBaseUserInfo(infoData.data.userId)

  dispatch(setUserInfoAction({ ...infoData.data, ...baseData.data }))
}
