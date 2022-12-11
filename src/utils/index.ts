export const toTreeDepts = (depts: any[], pid = '') => {
  const result = [] as any

  depts.forEach(item => {
    if (item.pid === pid) {
      result.push(item)

      item.title = item.name
      item.key = item.id
      item.principal = item.manager

      const children = toTreeDepts(depts, item.id)
      if (children.length > 0) {
        item.children = children
      }
    }
  })

  return result
}
export default {}
