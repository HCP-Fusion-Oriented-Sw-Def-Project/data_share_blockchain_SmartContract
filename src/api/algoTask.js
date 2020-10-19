import request from '@/utils/requestAlgoTask'

// 获得算法作业列表
export function getAlgoTaskList() {
  return request({
    dataType: 'json',
    url: '/algoTask/all',
    method: 'get',
    // params: {
    //   pageNum: '1',
    //   pageSize: '10'
    // }
  })
}

// 新增算法作业
export function addAlgoTask(data) {
  return request({
    dataType: 'json',
    url: '/algoTask',
    method: 'post',
    data
  })
}

// 修改算法作业
export function modifyAlgoTask(data) {
  return request({
    dataType: 'json',
    url: '/algoTask',
    method: 'put',
    data
  })
}

// 删除算法作业
export function deleteAlgoTask(id) {
  return request({
    dataType: 'json',
    url: '/algoTask/' + id,
    method: 'delete'
  })
}

// 批量删除算法作业
export function deleteAlgoTaskByIds(data) {
  return request({
    dataType: 'json',
    url: '/algoTask',
    method: 'delete',
    data
  })
}
