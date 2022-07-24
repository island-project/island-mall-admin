import request from '@/utils/request'

export function getOneDictData(params) {
  return request({
    url: '/sys/dict/get',
    method: 'get',
    params: params
  })
}
