import request from '@/utils/requestDynamic'

export function getDynamicList(data) {
  return request({
    url: '/marketCodeDemo',
    method: 'get',
    params: {
      'pageNum': data.page,
      'pageSize': data.size,
      'name': data.name,
      'productType': data.productType
    }
  })
}

export function addDynamic(data) {
  return request({
    url: '/marketCodeDemo',
    method: 'post',
    data
  })
}

export function deleteDynamic(data) {
  return request({
    url: '/marketCodeDemo',
    method: 'delete',
    data
  })
}

export function dynamicRuleList(data) {
  return request({
    url: '/marketCodeRule',
    method: 'get',
    params: {
      'pageNum': data.page,
      'pageSize': data.size,
      'name': data.name,
      'productType': data.productType
    }
  })
}

export function addDynamicRule(data) {
  return request({
    url: '/marketCodeRule',
    method: 'post',
    data
  })
}

export function deleteDynamicRule(data) {
  return request({
    url: '/marketCodeRule',
    method: 'delete',
    data
  })
}
