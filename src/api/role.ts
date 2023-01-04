import request from '@/utils/request'
import type { AddRoleData, GetRoleListParams, GetRoleListRes } from '@/types'
import { UpdateRoleData, GetRoleDetailRes } from '@/types'

export const getRoleList = (params: GetRoleListParams) =>
  request.get<GetRoleListRes>('/sys/role', {
    params
  })

export const deleteRoleApi = (roleId: number | string) =>
  request.delete<unknown, unknown>(`/sys/role/${roleId}`)

export const updateRoleApi = (data: UpdateRoleData) =>
  request.put<unknown, unknown, UpdateRoleData>(`sys/role/${data.id}`, data)

export const addRoleApi = (data: AddRoleData) =>
  request.post<unknown, unknown, AddRoleData>('/sys/role', data)

export const getRoleDetailApi = (id: string) =>
  request.get<GetRoleDetailRes>(`/sys/role/${id}`)

export const assignRolePermissionApi = (data: {
  id: string
  permIds: string[]
}) => request.put<unknown>('/sys/role/assignPrem', data)

export default {}
