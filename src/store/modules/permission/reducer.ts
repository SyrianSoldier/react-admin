import { MyRouteObject, dynamicRoutes, constantRoutes } from '@/router'
import { PermissionActions } from './action-creators'
import { GENERARATE_ROUTES, RESET_ROUTES } from './constants'

export const generateRoutes = (menus: string[], oldRoutes = dynamicRoutes) => {
  const routes = [] as MyRouteObject[]

  oldRoutes.forEach(route => {
    // 如果没有id或者命中权限， 则添加进去
    if (!route.id || menus.includes(route.id)) {
      const temp = { ...route }

      if (temp.children) {
        const children = generateRoutes(menus, temp.children)
        if (children.length > 0) {
          temp.children = children
        }
      }
      routes.push(temp)
    }
  })

  return routes
}

export const initialState = {
  routes: constantRoutes
}

const permission = (state = initialState, action: PermissionActions) => {
  switch (action.type) {
    case GENERARATE_ROUTES:
      return {
        ...state,
        routes: [...constantRoutes, ...generateRoutes(action.payload)]
      }
    case RESET_ROUTES:
      return { ...state, routes: constantRoutes }

    default:
      return { ...state }
  }
}
export default permission
