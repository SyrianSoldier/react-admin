import Cookies from 'js-cookie'

export const TOKEN = 'TOKEN_VALUE'
export type TokenType = typeof TOKEN

export const setToken = (token: string) => Cookies.set(TOKEN, token)
export const getToken = () => Cookies.get(TOKEN)
export const removeToken = () => Cookies.remove(TOKEN)
