import request from '@/utils/request'
import Qs from 'qs'
// import store from '@/store'
export function login(data) {
  return request({
    url: '/vue-element-admin/user/login',
    method: 'post',
    data
  })
}

export function loginByUsername(username, password, imageCode, randomStr) {
  const data = {
    username,
    password,
    imageCode,
    randomStr
  }
  return request({
    // headers: {
    //      'Content-Type': 'application/x-www-form-urlencoded'
    // },
    // transformRequest: [data => Qs.stringify(data)],
    // url: '/login/login',
    // method: 'post',
    // data
    headers: {
      client_id: 'webapp',
      client_secret: 'webapp'
    },
    withCredentials: false,
    url: '/login',
    method: 'post',
    data: Qs.stringify(data)
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}

// export function logout() {
//   return request({
//     url: '/login/logout',
//     method: 'post'
//   })
// }

export function getUserInfo() {
  return request({
    datatype: 'json',
    url: '/userac/uac/user/self',
    method: 'get'
  })
}
//  查询用户列表
export function fetchUserList(query) {
  return request({
    datatype: 'json',
    url: '/userac/uac/user',
    method: 'get',
    params: {
      pageSize: query.size,
      pageNum: query.page,
      loginName: query.loginName,
      name: query.name,
      phone: query.phone,
      'uacOffice.id': query.uacOffice.id
    }
  })
}

// 通过用户名查询用户是否存在
export function checkLoginName(data) {
  // console.log(typeof(data), data)
  return request({
    datatype: 'json',
    url: '/userac/uac/user/checkLoginName',
    method: 'get',
    params: {
      loginName: data
    }
    // data
  })
}

//  通过角色id查询所有用户
export function getUseByRoleId(query) {
  return request({
    datatype: 'json',
    url: '/userac/uac/user/role/' + query.roleId,
    method: 'get',
    params: {
      pageNum: query.page,
      pageSize: query.size,
      name: query.name,
      loginName: query.loginName,
      phone: query.phone
    }

  })
}

//  根据id获取用户信息
export function getUserInfoById(data) {
  return request({
    contentType: 'application/json; charset=utf-8',
    transformRequest: [data => Qs.stringify(data)],
    url: '/userac/uac/user/' + data,
    method: 'get'
  })
}

//  添加用户
export function createUser(data) {
  return request({
    // url: '/article/list',
    // method: 'get',
    // params: query
    // contentType:'application/json; charset=utf-8',
    // emulateJSON: false,
    // traditional: true,
    // transformRequest: [data => Qs.stringify(data)],
    datatype: 'json',
    url: '/userac/uac/user',
    method: 'post',
    data: {
      'loginName': data.loginName,
      'loginPwd': data.loginPwd,
      'confirmPwd': data.confirmPwd,
      'userCode': data.userCode,
      'name': data.name,
      'phone': data.phone,
      'email': data.email,
      'userSource': data.userSource,
      'status': data.status,
      'photo': data.photo,
      'roleList': data.roleList,
      'officeList': data.officeList,
      'remarks': data.remarks
    }
  })
}

//  更新用户
export function updateUser(data) {
  return request({
    datatype: 'json',
    url: '/userac/uac/user',
    method: 'put',
    data: {
      'id': data.id,
      'loginName': data.loginName,
      'loginPwd': data.loginPwd,
      'confirmPwd': data.confirmPwd,
      'userCode': data.userCode,
      'name': data.name,
      'phone': data.phone,
      'email': data.email,
      'userSource': data.userSource,
      'status': data.status,
      'photo': data.photo,
      'roleList': data.roleList,
      'officeList': data.officeList,
      'remarks': data.remarks
    }
  })
}

//  当前用户修改信息
export function updateUserInfo(data) {
  return request({
    datatype: 'json',
    url: '/SysUser/info',
    method: 'post',
    data
  })
}

//  当前用户修改密码
// export function updatePassword(data) {
//   return request({
//     // datatype:'json',
//     contentType: 'application/json; charset=utf-8',
//     transformRequest: [data => Qs.stringify(data)],
//     url: '/SysUser/modifyPwd',
//     method: 'post',
//     data
//   })
// }

// 修改当前用户密码
export function updatePassword(data) {
  return request({
    datatype: 'json',
    url: '/userac/uac/user/changePassword',
    method: 'post',
    data: {
      'userId': data.id,
      'forgetPassword': true,
      'passwordOld': data.passwordOld,
      'passwordNew': data.passwordNew
      // 'resetPasswordDto': data
    }
  })
}

//  删除用户
export function deleteLogicalUser(data) {
  return request({
    contentType: 'application/json; charset=utf-8',
    transformRequest: [data => Qs.stringify(data)],
    url: '/userac/uac/user/' + data,
    method: 'delete'
  })
}

//  批量删除用户
export function deleteUserInBatches(data) {
  return request({
    datatype: 'json',
    url: '/userac/uac/user',
    method: 'delete',
    data: {
      ids: data
    }
  })
}

//  更改状态
export function userModifyStatus(data) {
  return request({
    datatype: 'json',
    url: '/SysUser/loginFlag',
    method: 'post',
    data: {
      'id': data.id,
      'loginFlag': data.loginFlag
    }
  })
}

// 添加用户到角色
export function addUserToRole(data) {
  return request({
    datatype: 'json',
    url: '/userac/uac/role/saveUser/',
    method: 'post',
    data: {
      'roleId': data
    }
  })
}

// 用户头像上传
export function uploadImage(file) {
  return request({
    contentType: 'form-data',
    // transformRequest: [data => Qs.stringify(data)],
    url: '/userac/uac/file/upload',
    method: 'post',
    data: file
  })
}
