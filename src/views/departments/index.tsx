import React, {
  memo,
  FC,
  useEffect,
  useState,
  useCallback,
  createContext,
  useMemo
} from 'react'
import { Divider, Tree } from 'antd'
import type { DataNode } from 'antd/es/tree'
import TreeItem from '@/views/departments/components/tree-item'
import DepartmentsWrapper from './style'
import { getDepartmentsApi } from '@/api'
import { toTreeDepts } from '@/utils'
import { DeptsType } from '@/types'
import AddDepts from '@/views/departments/components/add-depts'

export type TreeDataNode = Pick<DataNode, keyof DataNode> & {
  principal?: string
} & DeptsType

interface DeptsContextProps {
  deptsContextProps: { currentTreeNode?: TreeDataNode; isDeptEdit: boolean }
  setDeptsContextProps: (props: DeptsContextProps['deptsContextProps']) => void
}

export const DepartmentsContext = createContext<DeptsContextProps | undefined>(
  undefined
)

const Departments: FC = memo(() => {
  const [deptData, setDeptData] = useState({
    companyName: '',
    depts: [] as TreeDataNode[]
  })

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [deptsContextProps, setDeptsContextProps] = useState<
    DeptsContextProps['deptsContextProps']
  >({
    currentTreeNode: undefined,
    isDeptEdit: false
  })

  const getDepartments = async () => {
    const { data } = (await getDepartmentsApi()).data
    setDeptData({
      companyName: data.companyName,
      depts: toTreeDepts(data.depts)
    })
  }

  useEffect(() => {
    getDepartments()
  }, [])

  const flushDepartments = useCallback(getDepartments, [])
  const deptsContextPropsMemo = useMemo(
    () => ({ deptsContextProps, setDeptsContextProps }),
    [deptsContextProps]
  )

  const titleRender = (node: TreeDataNode) => (
    <TreeItem
      title={node.title as string}
      principal={node.principal}
      treeNodeData={node}
      flushDepartments={flushDepartments}
      setIsShowModal={setIsModalOpen}
    />
  )

  return (
    <DepartmentsWrapper>
      {/* 头部 */}
      <DepartmentsContext.Provider value={deptsContextPropsMemo}>
        <TreeItem
          title={deptData.companyName}
          principal={'负责人'}
          isRoot
          flushDepartments={flushDepartments}
          setIsShowModal={setIsModalOpen}
        />

        <Divider />

        {/* 树形部门结构 */}
        {deptData.depts.length > 0 && (
          <Tree
            blockNode
            defaultExpandAll
            treeData={deptData.depts}
            titleRender={titleRender}
          />
        )}

        {/* 添加数据的模态框 */}
        <AddDepts
          isModalOpen={isModalOpen}
          setIsShowModal={setIsModalOpen}
          flushDepartments={flushDepartments}
        />
      </DepartmentsContext.Provider>
    </DepartmentsWrapper>
  )
})

export default Departments
