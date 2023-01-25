import React, { memo, FC } from 'react'
import { shallowEqual } from 'react-redux'
import { Avatar, Dropdown, MenuProps, Space, Select } from 'antd'
import { CaretDownOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '@/hooks'
import {
  removeTokenAction,
  setUserInfoAction
} from '@/store/modules/user/action-creator'
import { resetRoutes } from '@/store/modules/permission/action-creators'
import useLocale from '@/hooks/useLocale'
import { LocalFields } from '@/locals/local'

const Toolbar: FC = memo(() => {
  const userInfo = useAppSelector(state => state.user.userInfo, shallowEqual)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [locale, setLocale] = useLocale()

  const logout = () => {
    dispatch(setUserInfoAction({})) // 清除用户信息
    dispatch(removeTokenAction()) // 清除token
    dispatch(resetRoutes()) // 清楚路由
    navigate('/login') // 回到登录页
  }
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <Link to="/">首页</Link>
    },
    {
      key: '2',
      label: <Link to="/">项目地址</Link>
    },
    {
      key: '3',
      label: (
        <Link to="/" onClick={logout}>
          登出
        </Link>
      )
    }
  ]

  let isFullscreen = false
  const fullscreen = () => {
    const html = document.documentElement
    if (isFullscreen) {
      document.exitFullscreen()
      isFullscreen = false
    } else {
      html.requestFullscreen()
      isFullscreen = true
    }
  }

  const changeLocal = (value: LocalFields) => {
    setLocale(value)
  }

  return (
    <div className="toolbar">
      <Space>
        <Select
          defaultValue={locale.locale as LocalFields}
          onChange={changeLocal}
          options={[
            {
              label: '中文',
              value: 'zh-CN'
            },
            {
              label: 'english',
              value: 'en-US'
            }
          ]}
        />
        <div onClick={fullscreen}>全屏</div>

        <Dropdown menu={{ items }}>
          <Space className="selector">
            <Avatar src={userInfo.staffPhoto} />
            <span className="username">{userInfo.username}</span>
            <CaretDownOutlined />
          </Space>
        </Dropdown>
      </Space>
    </div>
  )
})

export default Toolbar
