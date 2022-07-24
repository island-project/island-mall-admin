import request from '@/utils/request'

/**
 * 获取商品数据
 * @param {*} params 必传分页参数
 * @returns
 */
export function getProductListData(params) {
  return request({
    url: '/admin/product/getProductList',
    method: 'get',
    params
  })
}
