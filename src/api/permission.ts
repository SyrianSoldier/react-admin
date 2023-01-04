import request from '@/utils/request'
import { GetAllPermissionsRes } from '@/types'

export const getAllPermissions = () =>
  request.get<GetAllPermissionsRes>('/sys/permission')

export default {}
