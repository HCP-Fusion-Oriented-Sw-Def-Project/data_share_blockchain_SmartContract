import request from '@/utils/request'
// import Qs from 'qs'
import store from '@/store'
export function getRoutes() {
  return request({
    url: '/vue-element-admin/routes',
    method: 'get'
  })
}

export function getRoles() {
  return request({
    url: '/vue-element-admin/roles',
    method: 'get'
  })
}

export function addRole(data) {
  return request({
    url: '/vue-element-admin/role',
    method: 'post',
    data
  })
}

export function updateRole(id, data) {
  return request({
    url: `/vue-element-admin/role/${id}`,
    method: 'put',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/vue-element-admin/role/${id}`,
    method: 'delete'
  })
}

// 查询角色列表
export function fetchRoleList(query) {
  return request({
    url: '/userac/uac/role',
    method: 'get',
    params: {
      pageSize: query.size,
      pageNum: query.page
    }
  })
}
// 查询角色列表
export function fetchRoleListByName(query) {
  return request({
    url: '/userac/uac/role',
    method: 'get',
    params: {
      pageSize: query.size,
      pageNum: query.page,
      name: query.name,
      enname: query.enname
    }
  })
}
//  获取角色信息
export function fetchRoleInfoById(data) {
  return request({
    url: '/userac/uac/role/' + data,
    method: 'get'
  })
}
// 查询角色列表
export function fetchRoleListAll() {
  return request({
    url: '/userac/uac/role/all',
    method: 'get'
  })
}
// 查询action列表
//  export function fetchActionList(query){
//    return request({
//      url: '/userac/uac/menu',
//      method: 'get',
//      headers: {
//        'X-AOHO-UserId' : store.getters.id,
//        'Authorization' : 'Bearer ' + store.getters.token
//      },
//      params:query
//    })
//  }

// 创建角色
export function createRole(data) {
  return request({
    datatype: 'json',
    url: '/userac/uac/role',
    method: 'post',
    data
  })
}

// 更新角色
export function handleUpdateRole(data) {
  return request({
    url: '/userac/uac/role',
    method: 'put',
    data
  })
}

// 删除角色
export function deleteLogicalRole(data) {
  return request({
    datatype: 'json',
    url: '/userac/uac/role/' + data,
    method: 'delete'
  })
}

// 批量删除角色
export function deleteRoleInBatches(data) {
  return request({
    datatype: 'json',
    url: '/userac/uac/role',
    method: 'delete',
    // params: {
    //   ids: data
    // }
    data
  })
}

// 新增角色与用户的映射
export function addRoleUser(data) {
  return request({
    datatype: 'json',
    url: '/userac/uac/role/saveUser/' + data.roleId,
    method: 'post',
    headers: {
      'X-AOHO-UserId': store.getters.id,
      'Authorization': 'Bearer ' + store.getters.token
    },
    params: {
      userIds: data.userId
    }
  })
}

// 删除角色与用户的映射
export function deleteRoleUser(data) {
  return request({
    datatype: 'json',
    url: '/userac/uac/role/deleteUser/' + data.roleId,
    method: 'delete',
    params: {
      userIds: data.userId
    }
  })
}

// 新增角色与机构的映射
export function addRoleOffice(data) {
  return request({
    datatype: 'json',
    url: '/userac/uac/role/saveOffice/' + data.roleId,
    method: 'post',
    params: {
      officeIds: data.officeIds
    }
  })
}
// 新增角色与权限的映射
export function addRoleMenu(data) {
  //  console.log(data.menuIds, 'ids')
  return request({
    datatype: 'json',
    url: '/userac/uac/role/saveMenu/' + data.roleId,
    method: 'post',
    params: {
      menuIds: data.menuIds
    }
  })
}

