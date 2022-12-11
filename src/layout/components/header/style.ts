import styled from 'styled-components'

const HeaderWrapper = styled.div`
  .ant-layout-header {
    display: flex;
    align-items: center;
    padding: 0;
    background-image: -webkit-linear-gradient(left, #3d6df8, #5b8cff);

    .trigger {
      font-size: 20px;
      margin-left: 20px;
    }

    .text {
      display: inline-block;
      font-size: 18px;
      line-height: 50px;
      margin-left: 10px;
      color: #fff;
      cursor: text;
      .breadBtn {
        background: #84a9fe;
        font-size: 14px;
        padding: 0 10px;
        display: inline-block;
        height: 30px;
        line-height: 30px;
        border-radius: 10px;
        margin-left: 15px;
      }
    }

    .toolbar {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 10px;
      color: #fff;

      .selector {
        cursor: default;
      }
    }
  }
`

export default HeaderWrapper
