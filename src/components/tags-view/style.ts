import styled from 'styled-components'

const TagsViewWrapper = styled.div`
  .active {
    position: relative;
    background-color: #409eff !important;
    color: #fff !important;
    border-color: !important;
    padding-left: 15px !important;

    .title {
      margin-left: 7px !important;
    }
    &:before {
      content: '';
      width: 8px;
      height: 8px;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 5px;
      transform: translateY(-50%);
      background-color: #fff;
    }
  }

  .tag-link {
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 16px;
    margin-left: 5px;
    margin-top: 4px;
    padding-right: 25px;

    .close-icon-wrapper {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 18px;
      height: 18px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 5px;
      border-radius: 50%;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

      &:hover {
        background-color: #999999c7;
        color: #fff;
      }

      .close-icon {
        transform: scale(0.6);
        margin-top: 3px;
      }
    }
  }
`

export default TagsViewWrapper
