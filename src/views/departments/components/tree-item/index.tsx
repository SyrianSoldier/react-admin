import React, { memo, FC, useContext } from 'react'
import { Col, Row, Select, SelectProps, Space, Modal, message } from 'antd'
import { DepartmentsContext, TreeDataNode } from '@/views/departments'
import { delDepartmentApi } from '@/api'

interface TreeItemProps {
  title?: string
  principal?: string
  isRoot?: boolean
  flushDepartments: () => void
  treeNodeData?: TreeDataNode
  setIsShowModal: (flag: boolean) => void
}

const TreeItem: FC<TreeItemProps> = memo(
  ({
    title,
    principal,
    isRoot = false,
    treeNodeData,
    flushDepartments,
    setIsShowModal
  }) => {
    const { setDeptsContextProps, deptsContextProps } =
      useContext(DepartmentsContext)!

    const getSelectOptions = () => {
      let options = [{ label: '添加子部门', value: 'add' }]
      if (!isRoot) {
        options = [
          ...options,
          { label: '编辑子部门', value: 'edit' },
          { label: '删除子部门', value: 'del' }
        ]
      }
      return options
    }

    const selectStrategy = {
      add() {
        setDeptsContextProps({
          ...deptsContextProps,
          isDeptEdit: false,
          currentTreeNode: isRoot ? ({ id: '' } as TreeDataNode) : treeNodeData
        })

        setIsShowModal(true)
      },
      del() {
        if (treeNodeData) {
          Modal.confirm({
            content: '是否确定删除部门?',
            cancelText: '取消',
            okText: '确认',
            onOk: async () => {
              await delDepartmentApi(treeNodeData.id)
              flushDepartments()
              message.success('删除部门成功', 3)
            }
          })
        }
      },
      edit() {
        setDeptsContextProps({
          ...deptsContextProps,
          currentTreeNode: treeNodeData,
          isDeptEdit: true
        })

        setIsShowModal(true)
      }
    }

    const onSelect: SelectProps['onSelect'] = value =>
      selectStrategy[value as keyof typeof selectStrategy]()

    return (
      <Row>
        <Col span={6}>
          <h5 className={'title'}>{title}</h5>
        </Col>
        <Col span={18}>
          <Row justify={'end'}>
            <Space>
              <span>{principal}</span>
              <Select
                defaultValue="操作"
                style={{ width: 80 }}
                options={getSelectOptions()}
                onSelect={onSelect}
              />
            </Space>
          </Row>
        </Col>
      </Row>
    )
  }
)

export default TreeItem
