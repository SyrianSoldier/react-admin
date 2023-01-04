import { lazy } from 'react'
import Layout from '@/layout'
import { MyRouteObject } from '@/router'

const Social = lazy(() => import('@/views/social'))

export default {
  path: '/social',
  id: 'social_securitys',
  element: <Layout />,
  children: [
    {
      path: '',
      meta: { title: '社保', icon: 'table' },
      element: <Social />
    }
  ]
} as MyRouteObject
