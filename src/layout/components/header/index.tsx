import React, { memo, FC } from 'react'
import { Layout } from 'antd'

import HeaderWrapper from './style'
import Hamburger from '@/components/hamburger'
import Toolbar from './toolbar'

const { Header: HeaderAntd } = Layout

interface HeaderProps {
  collapsed: boolean
  setCollapsed: (bool: boolean) => void
}

const Header: FC<HeaderProps> = memo(({ collapsed, setCollapsed }) => {
  return (
    <HeaderWrapper>
      <HeaderAntd>
        {/* 面包按钮 */}
        <Hamburger
          isActive={collapsed}
          onClick={() => setCollapsed(!collapsed)}
          style={{ color: '#fff' }}
        />

        {/* 公司描述 */}
        <div className="text">
          <span className="company-text">江苏传智播客教育科技股份有限公司</span>
          <span className="breadBtn">体验版</span>
        </div>

        {/* 右侧工具栏 */}
        <Toolbar />
      </HeaderAntd>
    </HeaderWrapper>
  )
})

export default Header
