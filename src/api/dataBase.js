import request from '@/utils/requestUnitData'

// 获取所有数据库信息
export function getAllDatabase() {
  return request({
    url: '/extractDbManagement/api/all',
    method: 'get'
  })
}

// 分页查询数据库列表
export function getDatabaseList(data) {
  return request({
    url: '/extractDbManagement/api',
    method: 'get',
    params: {
      pageNum: data.pageNum,
      pageSize: data.pageSize,
      dbSoftwareType: data.dbSoftwareType
    }
  })
}

// 查询所有数据库信息
export function getDatabaseListAll(query) {
  return request({
    url: '/extractDbManagement/api/all',
    method: 'get',
    params: {
      dbSoftwareType: query.dbSoftwareType
    }
  })
}

// 根据数据库id查询数据库
export function getDatabaseListById(queryId) {
  return request({
    url: '/extractDbManagement/api',
    method: 'get',
    params: {
      id: queryId
    }
  })
}

// // 根据ID获得数据库的表数据
// export function getTableById(id) {
//   return request({
//     url: '/extractDbManagement/api/metadata/' + id,
//     method: 'get'
//   })
// }

// 获取所有表名和字段名
export function getTableParam(id) {
  return request({
    url: '/extractDbManagement/api/metadata/' + id,
    method: 'get'
  })
}
