import styled from 'styled-components'
import BGImg from '@/assets/images/login.jpg'
import TitleImg from '@/assets/images/login-logo.png'
import { flexCenter } from '@/styles/mixin'

const LoginWrapper = styled.div`
  ${flexCenter()}
  height: 100vh;
  background: url(${BGImg}) no-repeat 0 0 / cover;

  #loginForm {
    width: 450px;
    height: 333px;
    overflow: hidden;

    .titleContainer {
      height: 30px;
      margin-bottom: 40px;
      background: url(${TitleImg}) no-repeat center / contain;
    }

    .input {
      .ant-input-affix-wrapper {
        height: 48px;
      }
    }

    .login-form-button {
      width: 100%;
      height: 36px;
      background-color: #1890ff;
      margin-bottom: 30px;
    }
  }
`

export default LoginWrapper
