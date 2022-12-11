import { useEffect } from 'react'
import { useRoutes, Navigate } from 'react-router-dom'
import { shallowEqual } from 'react-redux'
import NProgress from 'nprogress'
import routes from '@/router'
import { useAppDispatch, useAppSelector } from '@/hooks'
import 'nprogress/nprogress.css'
import { setUserInfoThunk } from '@/store/modules/user/action-creator'

const usePermissionRoutes = () => {
  const token = useAppSelector(state => state.user.token)
  const userInfo = useAppSelector(state => state.user.userInfo, shallowEqual)
  const dispatch = useAppDispatch()
  const RouteElement = useRoutes(routes)
  const whiteList = ['*', '/login']
  const path = RouteElement?.props.match.route.path

  NProgress.start()
  useEffect(() => {
    // 渲染路由组件后做一些事情, 相当于全局后置守卫
    NProgress.done()
  }, [RouteElement, NProgress])

  // 有token
  //  - 登录页? 跳转到首页
  //  - 不是登录页?渲染路由组件
  // 无token
  //  - 在白名单? 渲染路由组件
  //  - 不在白名单? 跳转到登录页
  if (token) {
    if (path === '/login') {
      return <Navigate to={'/'} />
    }

    if (!userInfo.userId) {
      // 如果没有用户信息(权限信息), 发送请求, 并什么也不渲染, 等信息拉回来会重新渲染的
      dispatch(setUserInfoThunk() as any)
      return null
    }

    return RouteElement
  }

  if (whiteList.includes(path)) return RouteElement

  return <Navigate to={'/login'} />
}
export default usePermissionRoutes
