import React, { memo, useEffect, MouseEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { shallowEqual } from 'react-redux'
import { useLocalStorageState } from 'ahooks'

import { CloseOutlined } from '@ant-design/icons'
import TagsViewWrapper from './style'
import { useAppSelector } from '@/hooks'
import { MyRouteObject } from '@/router'
import { hasDefaultChildRoute } from '@/layout/components/sidebar'

interface Tag {
  path?: string
  title?: string
}

export const findRoute = (
  routes: MyRouteObject[],
  pathname: string
): MyRouteObject | undefined => {
  let target

  routes.forEach(item => {
    if (item.path === pathname) {
      target = item
    } else if (item.children) {
      const route = findRoute(item.children, pathname)
      if (route) target = route
    }
  })

  return target
}

export const useCurrentRoute = () => {
  const { pathname } = useLocation()
  const routes = useAppSelector(state => state.permission.routes, shallowEqual)

  return findRoute(routes, pathname)
}

export const useRoute = (pathname: string) => {
  const routes = useAppSelector(state => state.permission.routes, shallowEqual)

  return findRoute(routes, pathname)
}

const routeToTag = (route: MyRouteObject): Tag => {
  const { path, meta, children } = route
  let tag = { title: meta?.title, path }

  // 需要检查默认子路由
  if (children && children.length > 0) {
    const [flag, index] = hasDefaultChildRoute(children)
    if (flag) {
      const defaultRoute = children[index]
      tag = { ...tag, title: defaultRoute.meta?.title }
    }
  }

  return tag
}

const TagView = memo(() => {
  const currentRoute = useCurrentRoute()
  const navigate = useNavigate()
  const dashbord = useRoute('/dashboard')
  const { pathname } = useLocation()
  const [tagVisited, setTagVisted] = useLocalStorageState<Tag[]>('TAGS', {
    defaultValue: [routeToTag(dashbord!)]
  })

  const isActiveTag = (tag: Tag) => pathname === tag.path

  const addTag = (route: MyRouteObject): void => {
    if (tagVisited.some(item => item.path === route.path)) return

    setTagVisted([...tagVisited, routeToTag(route)])
  }

  const deleteTag = (tag: Tag) => (e: MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation()
    e.preventDefault()

    const filteredTags = tagVisited.filter(item => item.path !== tag.path)

    if (isActiveTag(tag) && filteredTags.length > 0) {
      navigate(filteredTags.at(-1)!.path!)
    }

    setTagVisted(filteredTags)
  }

  useEffect(() => {
    addTag(currentRoute!)
  }, [currentRoute])

  return (
    <TagsViewWrapper>
      {tagVisited.map(view => (
        <Link
          key={view.path}
          to={view.path!}
          className={`tag-link ${isActiveTag(view) ? 'active' : ''}`}
        >
          <span className="title">{view.title}</span>
          <span className="close-icon-wrapper" onClick={deleteTag(view)}>
            <CloseOutlined className="close-icon" />
          </span>
        </Link>
      ))}
    </TagsViewWrapper>
  )
})

export default TagView
