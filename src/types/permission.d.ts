import { AddBase } from './base'

export type Permission = {
  id: string
  name: string
  type: string | number
  code: string
  description: string
  pid: string
  enVisible: string
}

export type GetAllPermissionsRes = AddBase<Permission[]>
