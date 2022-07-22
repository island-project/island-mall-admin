import request from '@/utils/request'

export function getMenu() {
  return request({
    url: '/admin/menu/getMenu',
    method: 'get'
  })
}
