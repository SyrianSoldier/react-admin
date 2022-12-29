import React, { memo, FC } from 'react'
import { Table as AntdTable, TableProps } from 'antd'
import { ColumnType } from 'antd/es/table'

interface TablePropsExpand<RecordType> extends TableProps<RecordType> {
  indexConfig?: Omit<ColumnType<RecordType>, 'render'>
}

function withIndexTable<RecordType extends object>(
  Table: typeof AntdTable
): FC<TablePropsExpand<RecordType>> {
  return memo(props => {
    const { indexConfig, pagination, columns } = props

    if (
      columns &&
      indexConfig &&
      pagination &&
      pagination.current &&
      pagination.pageSize
    ) {
      columns.unshift({
        ...indexConfig,
        render: (a, b, index) => {
          const { current, pageSize } = pagination
          return (current! - 1) * pageSize! + index
        }
      })
    }

    return <Table {...props} />
  })
}

export default withIndexTable
