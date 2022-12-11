import { lazy } from 'react'
import Layout from '@/layout'
import { MyRouteObject } from '@/router'

const Attendances = lazy(() => import('@/views/attendances'))

export default {
  path: '/attendances',
  id: 'attendances',
  element: <Layout />,
  children: [
    {
      path: '',
      meta: { title: '考勤', icon: 'skill' },
      element: <Attendances />
    }
  ]
} as MyRouteObject
