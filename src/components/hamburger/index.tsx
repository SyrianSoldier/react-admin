import React, { memo, FC, CSSProperties } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

interface HamburgerProps {
  isActive: boolean
  onClick: () => void
  style: CSSProperties
}

const Hamburger: FC<HamburgerProps> = memo(({ isActive, onClick, style }) =>
  React.createElement(isActive ? MenuUnfoldOutlined : MenuFoldOutlined, {
    className: 'trigger',
    onClick,
    style
  })
)

export default Hamburger
