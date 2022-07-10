import Cookies from 'js-cookie'

const TokenKey = 'island_mall_token'
const AccessTokenKey = 'island_mall_access_token'
const RefreshTokenKey = 'island_mall_refresh_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getAccessToken() {
  return Cookies.get(AccessTokenKey)
}

export function setAccessToken(token) {
  return Cookies.set(AccessTokenKey, token)
}

export function getRefreshToken() {
  return Cookies.get(RefreshTokenKey)
}

export function setRefreshToken(token) {
  return Cookies.set(RefreshTokenKey, token)
}
