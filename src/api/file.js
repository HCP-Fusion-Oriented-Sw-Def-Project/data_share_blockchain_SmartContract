import request from '@/utils/requestFile'
import Qs from 'qs'
import store from '@/store'

// 查看文件内容
export function fetchFileInfo(param) {
  return new Promise((resolve, reject) => {
    window.executeContract('algoModule', 'openReadFile', param, (res) => {
      console.log(res)
      resolve(res)
    })
  })
}

// 查看文件列表
export function fetchFileList(param) {
  return request({
    contentType: 'application/json; charset=utf-8',
    transformRequest: [data => Qs.stringify(data)],
    url: '/hdfs/fileList',
    method: 'get',
    headers: {
      'X-AOHO-UserId': store.getters.id,
      'Authorization': 'Bearer ' + store.getters.token
    },
    params: {
      filePath: param
    }
  })
}

// 查看文件夹情况
export function fetchDirectory(param) {
  return request({
    contentType: 'application/json; charset=utf-8',
    transformRequest: [data => Qs.stringify(data)],
    url: '/hdfs/summaryDirectory',
    method: 'get',
    headers: {
      'X-AOHO-UserId': store.getters.id,
      'Authorization': 'Bearer ' + store.getters.token
    },
    params: {
      filePath: param
    }
  })
}

// 下载文件
export function downloadFile(param) {
  return request({
    contentType: 'application/json; charset=utf-8',
    transformRequest: [data => Qs.stringify(data)],
    url: '/hdfs/downloadFile',
    responseType: 'blob',
    // responseType: 'arraybuffer',
    method: 'get',
    headers: {
      'X-AOHO-UserId': store.getters.id,
      'Authorization': 'Bearer ' + store.getters.token
    },
    params: {
      filePath: param
    }
  })
}

// 下载图片文件
export function downloadImageFile(param) {
  return request({
    contentType: 'application/json; charset=utf-8',
    transformRequest: [data => Qs.stringify(data)],
    url: '/hdfs/downloadFile',
    responseType: 'arraybuffer',
    method: 'get',
    headers: {
      'X-AOHO-UserId': store.getters.id,
      'Authorization': 'Bearer ' + store.getters.token
    },
    params: {
      filePath: param
    }
  })
}

// 保存新建单图上传的文件
export function saveSingleFile(formdata) {
  return request({
    datatype: 'form-data',
    url: '/hdfs/createWriteFileByFile',
    method: 'post',
    headers: {
      'X-AOHO-UserId': store.getters.id,
      'Authorization': 'Bearer ' + store.getters.token
    },
    data: formdata
  })
}

