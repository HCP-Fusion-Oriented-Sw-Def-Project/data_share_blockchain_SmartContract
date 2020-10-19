import request from '@/utils/request'
import Qs from 'qs'

export function login(data) {
  return request({
    headers: {
      client_id: 'webapp',
      client_secret: 'webapp'
    },
    url: '/userac/login',
    method: 'post',
    data: Qs.stringify(data)
  })
}

export function getInfo() {
  return request({
    url: '/userac/uac/user/self',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/userac/logout',
    method: 'post'
  })
}

export function getImageCode(randomStr) {
  return request({
    url: '/codeController/getCode',
    method: 'get',
    params: { randomStr: randomStr }
  })
}
