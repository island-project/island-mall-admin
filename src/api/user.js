import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sys/auth/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
