import { lazy } from 'react'
import Layout from '@/layout'
import { MyRouteObject } from '@/router'

const Salarys = lazy(() => import('@/views/salarys'))

export default {
  path: '/salarys',
  id: 'salarys',
  element: <Layout />,
  children: [
    {
      path: '',
      meta: { title: '工资', icon: 'money' },
      element: <Salarys />
    }
  ]
} as MyRouteObject
