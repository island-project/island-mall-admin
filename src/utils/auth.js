import Cookies from 'js-cookie'

const AccessTokenKey = 'island_mall_access_token'
const RefreshTokenKey = 'island_mall_refresh_token'

export function removeToken() {
  Cookies.remove(RefreshTokenKey)
  return Cookies.remove(AccessTokenKey)
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
