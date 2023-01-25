export const getFirstScreenTime = () => {
  let navigationFetchStart = 0

  const observer = new PerformanceObserver(list => {
    list.getEntries().forEach(entry => {
      if ((entry as any).initiatorType === 'navigation') {
        navigationFetchStart = (entry as any).fetchStart
      }

      if (/login(.*)\.jpg/.test(entry.name)) {
        console.log(
          `首屏加载时间为： ${
            ((entry as any).responseEnd - navigationFetchStart) / 1000
          }秒`
        )
      }
    })
  })
  observer.observe({ entryTypes: ['resource', 'navigation'] })
}

export default {}
