import styled from 'styled-components'
import { flexCenter } from '@/styles/mixin'

const UploadExcelWrapper = styled.div`
  display: flex;
  width: 700px;
  height: 160px;
  cursor: pointer;
  transition: border-color 0.3s;
  margin: 80px auto 0;

  .drag-enter-done,
  .drag-enter-active {
    border-color: #1677ff;
  }
  .drag-exit-done {
    border-color: #d9d9d9;
  }

  .click-upload {
    flex: 1;
    ${flexCenter()};
    border: 1px dotted #d9d9d9;
    border-bottom-left-radius: 8px;
    border-top-left-radius: 8px;
    transition: border-color 300ms ease;
  }
  .drag-upload {
    flex: 1;
    ${flexCenter()};
    flex-direction: column;
    color: #bbbbbb;
    cursor: default;
    border: 1px dotted #d9d9d9;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;

    .upload-icon {
      font-size: 50px;
      margin-bottom: 10px;
    }
  }
`

export default UploadExcelWrapper
