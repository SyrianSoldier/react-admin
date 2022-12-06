import { FC, useEffect } from 'react'
import { useRoutes, Navigate } from 'react-router-dom'
import NProgress from 'nprogress'
import routes from '@/router'
import { useAppSelector } from '@/hooks'
import 'nprogress/nprogress.css'

const PermissionRoues: FC = () => {
  const token = useAppSelector(state => state.user.token)
  const RouteElement = useRoutes(routes)
  const whiteList = ['/', '/login']
  const path = RouteElement?.props.match.route.path
  console.log('当前路由为:', path)
  NProgress.start()
  useEffect(() => {
    // 渲染路由组件后做一些事情, 相当于全局后置守卫
    NProgress.done()
  }, [RouteElement, NProgress])

  // 有token
  //  - 登录页? 跳转到首页
  //  - 渲染路由组件
  if (token) {
    if (path === '/login') return <Navigate to={'/'} />
    return RouteElement
  }
  // 无token
  //  - 在白名单? 渲染路由组件
  //  - 不在白名单? 跳转到登录页
  if (whiteList.includes(path)) return RouteElement
  return <Navigate to={'/login'} />
}

export default PermissionRoues
