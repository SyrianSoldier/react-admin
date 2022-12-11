import React, { memo, FC, useState } from 'react'
import { Layout as LayoutAntd } from 'antd'
import LayoutWrapper from './style'
import Sidebar from '@/layout/components/sidebar'
import Content from '@/layout/components/content'
import Header from '@/layout/components/header'

const Layout: FC = memo(() => {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <LayoutWrapper>
      <LayoutAntd className="layout-antd">
        <Sidebar collapsed={collapsed} />
        <LayoutAntd className="site-layout">
          <Header collapsed={collapsed} setCollapsed={setCollapsed} />
          <Content />
        </LayoutAntd>
      </LayoutAntd>
    </LayoutWrapper>
  )
})

export default Layout
