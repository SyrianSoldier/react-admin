import styled from 'styled-components'
import { cardBoxShadow } from '@/styles/mixin'

const PageToolsWrapper = styled.div`
  ${cardBoxShadow()};
  .ant-alert {
    display: inline-block;

    .ant-alert-content {
      display: inline-block;
    }
  }
`

export default PageToolsWrapper
