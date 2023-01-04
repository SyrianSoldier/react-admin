import { useEffect } from 'react'
import { useRoutes, Navigate } from 'react-router-dom'
import { shallowEqual } from 'react-redux'
import { useAsyncEffect } from 'ahooks'
import NProgress from 'nprogress'
import { useAppDispatch, useAppSelector } from '@/hooks'
import 'nprogress/nprogress.css'
import { setUserInfoThunk } from '@/store/modules/user/action-creator'
import { generateRoutes } from './store/modules/permission/action-creators'

const usePermissionRoutes = () => {
  const token = useAppSelector(state => state.user.token)
  const userInfo = useAppSelector(state => state.user.userInfo, shallowEqual)
  const routes = useAppSelector(state => state.permission.routes, shallowEqual)
  const RouteElement = useRoutes(routes)
  const dispatch = useAppDispatch()
  const whiteList = ['*', '/login']
  const path = RouteElement?.props.match.route.path

  NProgress.start()
  useEffect(() => {
    // 渲染路由组件后做一些事情, 相当于全局后置守卫
    NProgress.done()
  }, [RouteElement])

  // 当第一次登陆时候获取用户信息并生成动态路由
  useAsyncEffect(async () => {
    if (token && !userInfo.id) {
      const { roles } = await dispatch(setUserInfoThunk() as any)
      dispatch(generateRoutes(roles.menus))
    }
  }, [token, userInfo])

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

    return RouteElement
  }

  if (whiteList.includes(path)) return RouteElement
  return <Navigate to={'/login'} />
}
export default usePermissionRoutes
