import request from '@/utils/request'
// import store from '@/store'

// 查询菜单列表
export function fetchMenuList() {
  return request({
    datatype: 'json',
    url: '/userac/uac/menu/all',
    method: 'get'
  })
}
// 新增菜单
export function addMenu(data) {
  return request({
    datatype: 'json',
    url: '/userac/uac/menu',
    method: 'post',
    data
  })
}
// 编辑菜单
export function editMenu(data) {
  return request({
    datatype: 'json',
    url: '/userac/uac/menu',
    method: 'put',
    data
  })
}
// 删除
export function deleteMenu(data) {
  return request({
    datatype: 'json',
    url: '/userac/uac/menu/' + data,
    method: 'delete'
  })
}
// 批量删除
export function deleteMenus(data) {
  return request({
    datatype: 'json',
    url: '/userac/uac/menu',
    method: 'delete',
    params: {
      ids: data
    }
  })
}
