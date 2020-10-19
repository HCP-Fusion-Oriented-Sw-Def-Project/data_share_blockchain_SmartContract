import request from '@/utils/requestTask'
import Qs from 'qs'
import store from '@/store'
// 查询任务列表
export function fetchTaskList(query) {
  return request({
    url: '/vue-element-admin/task/task',
    method: 'get',
    headers: {
      'X-AOHO-UserId': store.getters.id,
      'Authorization': 'Bearer ' + store.getters.token
    },
    params: {
      'page': query.pages,
      'size': query.rows,
      'createBy': query.createBy,
      'name': query.name,
      'state': query.state
    }
  })
}

// 查询当前用户任务列表
export function fetchMyTaskList(query) {
  return request({
    url: '/task/task/myList',
    method: 'get',
    headers: {
      'X-AOHO-UserId': store.getters.id,
      'Authorization': 'Bearer ' + store.getters.token
    },
    params: {
      'page': query.pages,
      'size': query.rows,
      'createBy': query.createBy,
      'name': query.name,
      'state': query.state
    }
  })
}

// 查询当前用户任务列表
export function fetchMyTaskById(data) {
  return request({
    url: '/task/task/' + data,
    method: 'get',
    headers: {
      'X-AOHO-UserId': store.getters.id,
      'Authorization': 'Bearer ' + store.getters.token
    }
  })
}

// 获取数据库数据源的txt文件
export function fetchDatabaseToTxt(data) {
  return request({
    datatype: 'json',
    url: '/algorithm/mysqlToTxt',
    method: 'post',
    headers: {
      'X-AOHO-UserId': store.getters.id,
      'Authorization': 'Bearer ' + store.getters.token
    },
    data: {
      'tablename': data
    }
  })
}

// 添加任务
export function createTask(data) {
  return request({
    datatype: 'json',
    url: '/task/task',
    method: 'post',
    headers: {
      'X-AOHO-UserId': store.getters.id,
      'Authorization': 'Bearer ' + store.getters.token
    },
    data: {
      'isLoadModel': data.isLoadModel,
      'taskTask': data,
      'datasetUrl': data.datasetPath,
      'taskParameterVOList': data.parameters
    }
  })
}

// 更新任务
export function updateTask(data) {
  return request({
    datatype: 'json',
    url: '/task/task',
    method: 'put',
    headers: {
      'X-AOHO-UserId': store.getters.id,
      'Authorization': 'Bearer ' + store.getters.token
    },
    data: {
      'isLoadModel': data.isLoadModel,
      'taskTask': data,
      'taskParameterList': data.parameters
    }
  })
}

// 删除任务
export function deleteTask(data) {
  return request({
    contentType: 'application/json; charset=utf-8',
    transformRequest: [data => Qs.stringify(data)],
    url: '/task/task/' + data,
    method: 'delete',
    headers: {
      'X-AOHO-UserId': store.getters.id,
      'Authorization': 'Bearer ' + store.getters.token
    }
    // data
  })
}

// 批量删除任务
export function deleteTaskInBatches(data) {
  return request({
    datatype: 'json',
    url: '/task/task',
    method: 'delete',
    headers: {
      'X-AOHO-UserId': store.getters.id,
      'Authorization': 'Bearer ' + store.getters.token
    },
    data
  })
}
