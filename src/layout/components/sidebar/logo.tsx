import React, { memo, FC } from 'react'
import { NavLink } from 'react-router-dom'
import { CSSTransition, SwitchTransition } from 'react-transition-group'

import BigLogo from '@/assets/images/logo.png'
import SmallLogo from '@/assets/images/logo-64.png'

interface LogoProps {
  collapsed: boolean
}

const Logo: FC<LogoProps> = memo(({ collapsed }) => (
  <div className="logo">
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={collapsed ? 'enter' : 'exit'}
        timeout={200}
        classNames={'slideFade'}
      >
        {collapsed ? (
          <div className="small-logo">
            <NavLink to={'/'}>
              <img src={SmallLogo} alt="" />
            </NavLink>
          </div>
        ) : (
          <div className="big-logo">
            <NavLink to={'/'}>
              <img src={BigLogo} alt="" />
            </NavLink>
          </div>
        )}
      </CSSTransition>
    </SwitchTransition>
  </div>
))

export default Logo
