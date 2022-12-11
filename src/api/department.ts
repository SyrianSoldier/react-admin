import request from '@/utils/request'
import { DepartmentFormData, DepartmentsData, PutDepartmentData } from '@/types'
import { AddBase } from '@/types/base'

export const getDepartmentsApi = () =>
  request.get<DepartmentsData>('/company/department')

export const delDepartmentApi = (id: string) =>
  request.delete<AddBase<null>>(`/company/department/${id}`)

export const addDepartmentApi = (data: DepartmentFormData) =>
  request.post<unknown, AddBase<unknown>, DepartmentFormData>(
    '/company/department',
    data
  )

export const editDepartmentApi = (data: PutDepartmentData) =>
  request.put<unknown, AddBase<unknown>, PutDepartmentData>(
    `/company/department/${data.id}`,
    data
  )

export default {}
