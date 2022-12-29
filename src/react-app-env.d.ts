/// <reference types="react-scripts" />
declare namespace NodeJS {
  interface ProcessEnv {
    readonly REACT_APP_PORT: number
    readonly REACT_APP_BASE_URL: string
  }
}
declare module '*.xlsx' {
  const href: string
  export default href
}
