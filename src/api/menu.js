import request from '@/utils/request'

export function getMenu() {
  return request({
    url: '/island/admin/menu/getMenu',
    method: 'get'
  })
}
