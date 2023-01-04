import React, { FC, memo } from 'react'
import { Layout as LayoutAntd, Menu, MenuProps } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'

import SideBarWrapper from './style'
import Logo from '@/layout/components/sidebar/logo'
import { MyRouteObject } from '@/router'
import { useAppSelector } from '@/hooks'

const { Sider } = LayoutAntd

/*
 * 返回值为数组[boolean,number]
 * 第一项是否包含默认子路由, 第二项为默认子路由的下标
 * */
const hasDefaultChildRoute = (
  childrenRoutes: MyRouteObject[]
): [boolean, number] => {
  let result: [boolean, number] = [false, -1]

  childrenRoutes.forEach((route, index) => {
    if (!route.hidden && route.path === '') {
      result = [true, index]
    }
  })

  return result
}

const routesToMenuItems = (
  // eslint-disable-next-line no-shadow
  routes: MyRouteObject[],
  target: MenuProps['items'] = []
): MenuProps['items'] => {
  routes.forEach(route => {
    if (!route.hidden) {
      let menuItem = {} as any

      if (route.meta?.title) {
        menuItem.label = route.meta.title
      }

      if (route.meta?.icon) {
        menuItem.icon = <i className={`iconfont icon-${route.meta.icon}`}></i>
      }

      menuItem.key = route.path

      if (route.children) {
        // 1): 如果有children检查是否有默认子路由, 并且只有一个, 那么menuItem根据默认子路由生成
        // 2): 如果children检查是否有默认子路由, 但子路由不止一个, menuItem根据默认子路由生成,
        // children字段根据剩下的子路由生成
        // 3): 没有默认子路由, 正常生成
        const [flag, index] = hasDefaultChildRoute(route.children)

        if (flag) {
          const defaultChildRoute = route.children[index] as MyRouteObject

          menuItem = {
            ...menuItem,
            label: defaultChildRoute.meta?.title,
            icon: (
              <i
                className={`iconfont icon-${defaultChildRoute.meta?.icon}`}
              ></i>
            )
          }

          if (route.children.length > 1) {
            menuItem.children = routesToMenuItems(
              route.children.filter((a, idx) => idx !== index)
            )
          }
        } else {
          menuItem.children = routesToMenuItems(route.children)
        }
      }

      target?.push(menuItem)
    }
  })

  return target.length > 0 ? target : undefined
}

interface SideBarProps {
  collapsed: boolean
}

const SideBar: FC<SideBarProps> = memo(({ collapsed }) => {
  const navigate = useNavigate()
  const onMenuItem: MenuProps['onSelect'] = ({ key: path }) => navigate(path)
  const location = useLocation()
  const routes = useAppSelector(state => state.permission.routes)
  const items = routesToMenuItems(routes)

  return (
    <SideBarWrapper>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className={'menu'}
      >
        <Logo collapsed={collapsed} />
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          items={items}
          onSelect={onMenuItem}
        ></Menu>
      </Sider>
    </SideBarWrapper>
  )
})

export default SideBar
