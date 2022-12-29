import React, { memo, FC } from 'react'
import {
  Button,
  DatePicker,
  Form,
  Image,
  Input,
  Radio,
  Select,
  Space
} from 'antd'

const { Item } = Form
interface JobInfoProps {}

const JobInfo: FC<JobInfoProps> = memo(() => {
  return (
    <Form labelAlign={'left'} size={'small'} wrapperCol={{ span: 8 }}>
      <Item label={'最高学历'}>
        <Select options={[{ label: '初中' }, { label: '高中' }]}></Select>
      </Item>
      <Item label={'员工照片'}>
        <Image></Image>
      </Item>
      <Item label={'国家/地区'}>
        <Select></Select>
      </Item>
      <Item label={'护照号'}>
        <Input></Input>
      </Item>
      <Item label={'身份证号'}>
        <Input></Input>
      </Item>
      <Item label={'籍贯'}>
        <Input></Input>
      </Item>
      <Item label={'民族'}>
        <Input></Input>
      </Item>
      <Item label={'婚姻状况'}>
        <Input></Input>
      </Item>
      <Item label={'生日'}>
        <DatePicker></DatePicker>
      </Item>
      <Item label={'年龄'}>
        <Input></Input>
      </Item>
      <Item label={'星座'}>
        <Select></Select>
      </Item>
      <Item label={'血型'}>
        <Select></Select>
      </Item>
      <Item label={'户籍所在地'}>
        <Input></Input>
      </Item>
      <Item label={'政治面貌'}>
        <Input></Input>
      </Item>
      <Item label={'入党时间'}>
        <DatePicker></DatePicker>
      </Item>
      <Item label={'存档机构'}>
        <Input></Input>
      </Item>
      <Item label={'子女状态'}>
        <Input></Input>
      </Item>
      <Item label={'子女有无商业险'}>
        <Radio></Radio>
        <Radio></Radio>
      </Item>
      <Item label={'有无违法违纪状态'}>
        <Input></Input>
      </Item>
      <Space>
        <Button type={'primary'}>保存更新</Button>
        <Button>返回</Button>
      </Space>
    </Form>
  )
})

JobInfo.displayName = 'JobInfo'
export default JobInfo
