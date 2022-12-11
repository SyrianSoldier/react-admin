import type { AxiosResponse } from 'axios'
import request from '@/utils/request'
import type {
  BaseUserInfoType,
  LoginData,
  LoginForm,
  UserInfoType
} from '@/types'

export const login = (data: LoginForm) =>
  request.post<any, AxiosResponse<LoginData>, LoginForm>('/sys/login', data)

export const getUserInfo = () => request.post<UserInfoType>('/sys/profile')

export const getBaseUserInfo = (id: string) =>
  request.get<BaseUserInfoType>(`/sys/user/${id}`)

export default {}
