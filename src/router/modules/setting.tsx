import { lazy } from 'react'
import Layout from '@/layout'
import { MyRouteObject } from '@/router'

const Setting = lazy(() => import('@/views/setting'))

export default {
  path: '/setting',
  id: 'setting',
  element: <Layout />,
  children: [
    {
      path: '',
      meta: { title: '公司设置', icon: 'setting' },
      element: <Setting />
    }
  ]
} as MyRouteObject
