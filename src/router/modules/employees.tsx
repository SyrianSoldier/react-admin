import { lazy } from 'react'
import Layout from '@/layout'
import { MyRouteObject } from '@/router'

const Employees = lazy(() => import('@/views/employees'))

export default {
  path: '/employees',
  id: 'employees',
  element: <Layout />,
  children: [
    {
      path: '',
      meta: { title: '员工', icon: 'people' },
      element: <Employees />
    }
  ]
} as MyRouteObject
