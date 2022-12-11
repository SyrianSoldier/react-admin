import type { FormRule } from 'antd'
import { AddBase } from '@/types/base'

export type LoginFields = 'password' | 'mobile'

export type LoginRules = {
  [p in LoginFields]: FormRule[]
}

export type LoginForm = {
  [p in LoginFields]: string
}

export type LoginData = AddBase<string>

export type RolesType = {
  menus: Array<string>
  points: Array<string>
  apis: Array<string>
}

export type UserInfoType = AddBase<{
  userId: string
  mobile: string
  username: string
  roles: RolesType
  companyId: string
  company: string
}>

export type BaseUserInfoType = AddBase<{
  staffPhoto: string
  id: string
  mobile: string
  username: string
  password: string
  timeOfEntry: string
  workNumber: string
  correctionTime: string
  departmentName: string
  roleIds: Array<string>
  companyId: string
  companyName: string
}>

export default {}
