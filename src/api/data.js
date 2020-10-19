import request from '@/utils/requestData'
import Qs from 'qs'
import store from '@/store'
//查询数据列表
export function fetchDataList(query) {
  return request({
    // url: '/article/list',
    // method: 'get',
    // params: query
    // contentType:'application/json; charset=utf-8',
    // emulateJSON: false,
    // traditional: true,
    // transformRequest: [data => Qs.stringify(data)],
    datatype:'json',
    url: '/data/dataset',
    method: 'get',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    },
    params:{
      "page": query.pages,
      "size": query.rows,
      "name": query.name,
      "categoryId": query.categoryId,
      "formatId": query.formatId
    }
  })
}

//查询当前用户数据列表
export function fetchMyDataList(query) {
  return request({
    // url: '/article/list',
    // method: 'get',
    // params: query
    // contentType:'application/json; charset=utf-8',
    // emulateJSON: false,
    // traditional: true,
    // transformRequest: [data => Qs.stringify(data)],
    datatype:'json',
    url: '/data/dataset/myList',
    method: 'get',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    },
    params:{
      "page": query.pages,
      "size": query.rows,
      "name": query.name,
      "categoryId": query.categoryId,
      "formatId": query.formatId
    }
  })
}

//根据id获取数据集信息
export function getDataInfoById(data) {
  return request({
    contentType:'application/json; charset=utf-8',
    transformRequest: [data => Qs.stringify(data)],
    url: '/data/dataset/'+data,
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    },
    method: 'get'
  })
}

//添加数据集
export function addDataset(data) {
  return request({
    datatype:'json',
    url: '/data/dataset',
    method: 'post',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    },
    data
    })
}

//修改数据集
export function updateDataset(data) {
  return request({
    datatype:'json',
    url: '/data/dataset',
    method: 'put',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    },
    data
    })
}

//删除数据集
export function deleteDataset(data) {
  return request({
    contentType:'application/json; charset=utf-8',
    transformRequest: [data => Qs.stringify(data)],
    url: '/data/dataset/'+ data,
    method: 'delete',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    }
    // data
    })
}

//批量删除数据集
export function deleteDataSetInBatches(data) {
  return request({
    datatype:'json',
    url: '/data/dataset',
    method: 'delete',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    },
    data
    })
}

//查询数据格式列表
export function fetchDataFormatList(query) {
  return request({
    url: '/data/format',
    method: 'get',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    },
    params:{
      "page": query.pages,
      "size": query.rows,
      "name": query.name
    }
  })
}

//添加数据格式
export function addDataFormat(data) {
  return request({
    datatype:'json',
    url: '/data/format',
    method: 'post',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    },
    data
    })
}

//修改数据格式
export function updateDataFormat(data) {
  return request({
    datatype:'json',
    url: '/data/format',
    method: 'put',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    },
    data
    })
}

//删除数据格式
export function deleteDataFormat(data) {
  return request({
    contentType:'application/json; charset=utf-8',
    transformRequest: [data => Qs.stringify(data)],
    // datatype:'json',
    url: '/data/format/' + data,
    method: 'delete',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    },
    data
    })
}

//批量删除数据格式
export function deleteDataFormatInBatches(data) {
  return request({
    datatype:'json',
    url: '/data/format',
    method: 'delete',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    },
    data
    })
}

//查询数据类型列表
export function fetchDataTypeList(query) {
  return request({
    // datatype:'json',
    url: '/data/category',
    method: 'get',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    },
    params: query
  })
}

//添加数据类型
export function addDataType(data) {
  return request({
    datatype:'json',
    url: '/data/category',
    method: 'post',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    },
    data
    })
}

//修改数据类型
export function updateDataType(data) {
  return request({
    datatype:'json',
    url: '/data/category',
    method: 'put',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    },
    data
    })
}

//删除数据类型
export function deleteDataType(data) {
  return request({
    datatype:'json',
    url: '/data/category/' + data,
    method: 'delete',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    }
    })
}

//批量删除数据类型
export function deleteDataTypeInBatches(data) {
  return request({
    datatype:'json',
    url: '/data/category',
    method: 'delete',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    },
    data
    })
}

//下载
export function download(data) {
  return request({
    datatype:'json',
    // contentType:'application/json; charset=utf-8',
    // transformRequest: [data => Qs.stringify(data)],
    url: '/data/record',
    method: 'post',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    },
    data:{
      // "record" :data.id,
      "datasetId":data.datasetId,
      "formatId":data.formatId,
      "categoryId":data.categoryId,
      "dataName":data.name,
    }
  })
}

//查询下载记录列表
export function fetchRecordList(data) {
  return request({
    // datatype:'json',
    url: '/data/record',
    method: 'get',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    },
    params:{
      // "record" :data.id,
      "page":data.pages,
      "size":data.rows,
      "dataName":data.name,
    }

  })
}

//删除下载记录
export function deleteRecord(data) {
  return request({
    url: '/data/record/' + data,
    method: 'delete',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    }
  })
}


//批量删除下载记录
export function deleteRecordInBatches(data) {
  return request({
    datatype:'json',
    url: '/data/record',
    method: 'delete',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    },
    data
    })
}

//插入下载记录
export  function updateRecord(data){
  return request({
    datatype:'json',
    contentType:'application/json; charset=utf-8',
    // transformRequest: [data => Qs.stringify(data)],

    url: '/data/record',
    method: 'post',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    },
    data
  })
}

