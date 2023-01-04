import { lazy } from 'react'
import Layout from '@/layout'
import { MyRouteObject } from '@/router'

const Permission = lazy(() => import('@/views/permission'))

export default {
  path: '/permission',
  id: 'permissions',
  element: <Layout />,
  children: [
    {
      path: '',
      meta: { title: '权限', icon: 'lock' },
      element: <Permission />
    }
  ]
} as MyRouteObject
