import type { RouteObject } from 'react-router-dom'
import { lazy } from 'react'

const Login = lazy(() => import('@/views/login'))

const routes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />
  }
]

export default routes
