import styled from 'styled-components'
import { flexCenter } from '@/styles/mixin'
import { slideFade } from '@/styles/transition'
import { themeColor } from '@/styles/varibles'

const SideBarWrapper = styled.div`
  .ant-layout-sider {
    height: 100%;
  }

  .menu {
    background-color: ${themeColor};
    .ant-menu {
      background-color: ${themeColor};
      color: #fff;
    }
  }

  .logo {
    ${flexCenter()}
    ${slideFade};
    height: 55px;
    margin: 15px 0;

    .small-logo {
      img {
        width: 40px;
        height: 40px;
      }
    }
  }
`

export default SideBarWrapper
