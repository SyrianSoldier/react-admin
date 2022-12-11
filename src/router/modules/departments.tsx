import { lazy } from 'react'
import Layout from '@/layout'
import { MyRouteObject } from '@/router'

const Departments = lazy(() => import('@/views/departments'))

export default {
  path: '/departments',
  id: 'departments',
  element: <Layout />,
  children: [
    {
      path: '',
      meta: { title: '组织架构', icon: 'tree' },
      element: <Departments />
    }
  ]
} as MyRouteObject
