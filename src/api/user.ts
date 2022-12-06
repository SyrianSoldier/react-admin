import type { AxiosResponse } from 'axios'
import request from '@/utils/request'
import type { LoginData, LoginForm } from '@/types'

export const login = (data: LoginForm) =>
  request.post<any, AxiosResponse<LoginData>, LoginForm>('/sys/login', data)

export default {}
