import { Table as AntdTable, TableProps } from 'antd'
import React, { FC, memo } from 'react'

function withPagination<RecordType extends object>(
  Table: typeof AntdTable
): FC<TableProps<RecordType>> {
  return memo(props => {
    const defaultPagination: TableProps<RecordType>['pagination'] = {
      defaultCurrent: 1,
      defaultPageSize: 10,
      showQuickJumper: true,
      showTotal: (total, [num1, num2]) => (
        <span>
          {num1}-{num2}条 / 共{total}条
        </span>
      )
    }

    const newProps = {
      ...props,
      pagination: { ...defaultPagination, ...props.pagination }
    }

    return <Table {...newProps} />
  })
}

export default withPagination
