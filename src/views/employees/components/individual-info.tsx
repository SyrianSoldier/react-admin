import React, { memo, FC } from 'react'
import {
  Button,
  DatePicker,
  Form,
  Image,
  Input,
  Select,
  Space,
  TreeSelect
} from 'antd'
import { useNavigate } from 'react-router-dom'

const { Item } = Form
interface IndividualInfoProps {}

const IndividualInfo: FC<IndividualInfoProps> = memo(() => {
  const naviage = useNavigate()
  return (
    <>
      <Button type="primary" onClick={() => naviage('/print')}>
        打印
      </Button>
      <Form labelAlign={'left'} size={'small'} wrapperCol={{ span: 8 }}>
        <Item label={'工号'}>
          <Input></Input>
        </Item>
        <Item label={'入职时间'}>
          <DatePicker></DatePicker>
        </Item>
        <Item label={'姓名'}>
          <Input></Input>
        </Item>
        <Item label={'部门'}>
          <TreeSelect></TreeSelect>
        </Item>
        <Item label={'手机'}>
          <Input></Input>
        </Item>
        <Item label={'聘用形式'}>
          <Select options={[{ label: '正式' }, { label: '非正式' }]}></Select>
        </Item>
        <Item label={'员工头像'}>
          <Image></Image>
        </Item>

        <Space>
          <Button type={'primary'}>保存更新</Button>
          <Button>返回</Button>
        </Space>
      </Form>
    </>
  )
})

IndividualInfo.displayName = 'IndividualInfo'
export default IndividualInfo
