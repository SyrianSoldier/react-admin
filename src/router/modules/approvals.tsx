import { lazy } from 'react'
import Layout from '@/layout'
import { MyRouteObject } from '@/router'

const Approvals = lazy(() => import('@/views/approvals'))

export default {
  path: '/approvals',
  id: 'approvals',
  element: <Layout />,
  children: [
    {
      path: '',
      meta: { title: '审批', icon: 'tree-table' },
      element: <Approvals />
    }
  ]
} as MyRouteObject
