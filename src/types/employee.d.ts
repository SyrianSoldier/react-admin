import { AddBase } from './base'

export type EmployeeSimpleRes = AddBase<
  Array<{
    username: string
    id: string
  }>
>
