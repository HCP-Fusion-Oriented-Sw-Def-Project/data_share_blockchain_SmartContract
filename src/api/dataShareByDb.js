import request from '@/utils/requestDataShareByDb'
// import Qs from 'qs'

// 获取数据清单信息
export function getDataShareInfoBase(data) {
  return request({
    dataType: 'json',
    url: '/dataShareInfoBase',
    method: 'get',
    params: {
      dataNames: data
    }
  })
}

// 获取我的共享记录
export function getMyShare() {
  return request({
    dataType: 'json',
    url: '/dataShareInfoBase/user',
    method: 'get'
  })
}

// 获取我的共享字段
export function getMyShareParam(id) {
  return request({
    dataType: 'json',
    url: '/dataShareInfoBase/' + id,
    method: 'get'
  })
}

// 新增我的共享记录
export function addDataShareInfoBase(data) {
  return request({
    dataType: 'json',
    url: '/dataShareInfoBase',
    method: 'post',
    data: data
  })
}

// 编辑我的共享
export function editMyShare(data) {
  return request({
    dataType: 'json',
    url: '/dataShareInfoBase',
    method: 'put',
    data
  })
}

// 删除我的共享
export function deleteMyShare(id) {
  return request({
    dataType: 'json',
    url: '/dataShareInfoBase/' + id,
    method: 'delete'
  })
}

// 批量删除我的共享记录
export function deleteDataShareByIds(data) {
  return request({
    dataType: 'json',
    url: '/dataShareInfoBase',
    method: 'delete',
    data
  })
}

// 根据名称/类别/状态组合查询
export function searchInfo(data) {
  return request({
    dataType: 'json',
    url: '/dataShareInfoBase/conditon',
    method: 'get',
    params: {
      dataName: data.dataName,
      industryType: data.industryType,
      auditState: data.auditState
    }
  })
}

// 删除我的共享字段
export function deleteDataShare(id) {
  return request({
    dataType: 'json',
    url: '/dataShareInfoField/' + id,
    method: 'delete'
  })
}

// 编辑我的共享数据信息
export function editDataShare(data) {
  return request({
    dataType: 'json',
    url: '/dataShareInfoBase',
    method: 'put',
    data
  })
}

// 编辑数据共享状态
export function editDataShareStatus(data) {
  return request({
    dataType: 'json',
    url: '/dataShareInfoBase/status',
    method: 'put',
    data
  })
}

// 获取我的申请记录
export function getMyApplication(data) {
  return request({
    dataType: 'json',
    url: '/dataShareApplication/user',
    method: 'get',
    params: {
      isHistory: data
    }
  })
}

// 新增申请
export function addApplication(data) {
  return request({
    dataType: 'json',
    url: '/dataShareApplication',
    method: 'post',
    data
  })
}

// 删除审核申请
export function deleteApplication(id) {
  return request({
    dataType: 'json',
    url: '/dataShareApplication/' + id,
    method: 'delete'
  })
}

// 获取我的共享被申请的记录
export function getAppliedList(data) {
  return request({
    dataType: 'json',
    url: '/dataShareApplication/manage',
    method: 'get',
    params: {
      isHistory: data
    }
  })
}

// 是否申请
export function getJudgeAccess(data) {
  return request({
    dataType: 'json',
    url: '/dataShareApplication',
    method: 'put',
    data
  })
}
