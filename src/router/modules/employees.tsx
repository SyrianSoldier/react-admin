import { lazy } from 'react'
import Layout from '@/layout'
import { MyRouteObject } from '@/router'

const Employees = lazy(() => import('@/views/employees'))
const EmployeesDetail = lazy(
  () => import('@/views/employees/components/employees-detail')
)
export default {
  path: '/employees',
  id: 'employees',
  element: <Layout />,
  children: [
    {
      path: '',
      meta: { title: '员工', icon: 'people' },
      element: <Employees />
    },
    {
      path: '/employees/detail/:id',
      hidden: true,
      element: <EmployeesDetail />
    }
  ]
} as MyRouteObject
