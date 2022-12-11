import type { RouteObject } from 'react-router-dom'
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

import Layout from '@/layout'
import Login from '@/views/login'
import NotFoundPage from '@/views/404'

import ApprovalsRoute from '@/router/modules/approvals'
import AttendancesRoute from '@/router/modules/attendances'
import DepartmentsRoute from '@/router/modules/departments'
import employeesRoute from '@/router/modules/employees'
import PermissionRoute from '@/router/modules/permission'
import SalarysRoute from '@/router/modules/salarys'
import SettingRoute from '@/router/modules/setting'
import SocialRoute from '@/router/modules/social'

const Dashboard = lazy(() => import('@/views/dashboard'))
export type MyRouteObject = RouteObject & {
  hidden?: boolean
  meta?: {
    title?: string
    icon?: string
  }
  children?: MyRouteObject[]
}

const constantRoutes: MyRouteObject[] = [
  {
    path: '/',
    element: <Navigate to={'/dashboard'} />,
    hidden: true
  },
  {
    path: '/dashboard',
    element: <Layout />,
    children: [
      {
        path: '',
        meta: { title: '首页', icon: 'dashboard' },
        element: <Dashboard />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />,
    hidden: true
  },
  {
    path: '*',
    element: <NotFoundPage />,
    hidden: true
  }
]

export const dynamicRoutes: MyRouteObject[] = [
  ApprovalsRoute,
  AttendancesRoute,
  DepartmentsRoute,
  employeesRoute,
  PermissionRoute,
  SalarysRoute,
  SettingRoute,
  SocialRoute
]

export default [...constantRoutes, ...dynamicRoutes]
