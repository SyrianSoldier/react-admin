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

export function formatDate(numb: any, format = '/'): any {
  const time = new Date((numb - 1) * 24 * 3600000 + 1) as any
  time.setYear(time.getFullYear() - 70)
  const year = time.getFullYear().toString()
  const month = (time.getMonth() + 1).toString()
  const date = (time.getDate() - 1).toString()
  if (format && format.length === 1) {
    return year + format + month + format + date
  }
  return (
    year + (month < 10 ? `0${month}` : month) + (+date < 10 ? `0${date}` : date)
  )
}
export default {}
