import request from '@/utils/request_graph'
import Qs from 'qs'
import store from '@/store'


//1. 保存单图post接口
// export function createSingleVis(queryContent) {
//   queryContent.filesCsv.forEach((file)=> {
//     let visFileColumnList = file.visFileColumnList;
//     let visFileInfo = file.visFileInfo;
//     visFileColumnList.forEach((column) => {
//       column.colData = column.colData.join(',');
//     });
//     visFileInfo.fileColumn = visFileInfo.fileColumn.join(',');
//   });
//   console.log(queryContent.xAxis);
//   console.log(queryContent.option);
//   return request({
//     datatype:'json',
//     url: '/vis/chart/info',
//     method: 'post',
//     headers: {
//       "X-AOHO-UserId" : store.getters.id,
//       "Authorization" : 'Bearer ' + store.getters.token,
//     },
//     data:{
//             "visChartInfo":{
//               "userId": queryContent.userId,
//               "chartName": queryContent.name,
//               "dataName": queryContent.dataname,
//               "dataPath": queryContent.datapath,
//               "chartType": queryContent.type,
//               "xDim": queryContent.xAxisNum,
//               "yDim": queryContent.yAxisNum,
//               "zDim": queryContent.zAxisNum,
//               "timer": queryContent.timer,
//               "xAxis": queryContent.xAxis,
//               "yAxis": queryContent.yAxis,
//               "zAxis": queryContent.zAxis,
//               "option": queryContent.option
//             },
//             "visChartDatasource":{
//               "databaseId": queryContent.databaseId,
//               "tableName": queryContent.tableName,
//               "xAxisName": queryContent.xAxisName,
//               "yAxisName": queryContent.yAxisName,
//               "zAxisName": queryContent.zAxisName
//             },
//             "visFileInfoVOList": queryContent.filesCsv
//           }
//   })
// }

export function createSingleVis(data) {
  return request({
    datatype:'json',
    url: '/vis/addOne',
    method: 'post',
    headers: {
      // "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    },
    data
  })
}

//2. 保存多图post接口
export function createMultiVis(queryContent) {
  return request({
    datatype:'json',
    url: '/vis/multi/chart',
    method: 'post',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    },
    data:{
      "visMultiChart":{
        "userId": queryContent.userId,
        "multiChartsName":queryContent.name,
        "chartNum":queryContent.graphnumber,
        "timer":queryContent.timer,
      },
      "addSingleId":queryContent.addsingleId,
      "visChartLayoutList":queryContent.multiLayout,
      "ueContent":queryContent.ueContent,
    }
  })
}

//2. 保存多图模板post接口
export function createMultiVisDemo(queryContent) {
  return request({
    datatype:'json',
    url: '/vis/multi/chart/demo',
    method: 'post',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    },
    data:{
      "visMultiChart":{
        "userId": queryContent.userId,
        "multiChartsName":queryContent.name,
        "chartNum":queryContent.graphnumber,
        "timer":queryContent.timer,
        "backgroundWidth": queryContent.backgroundWidth,
        "backgroundHeight": queryContent.backgroundHeight,
        "backgroundColor": queryContent.backgroundColor
      },
      "addSingleId":queryContent.addSingleId,
      "visChartRectList":queryContent.multiLayout,
      "ueContent":queryContent.ueContent,
    }
  })
}

//3. 单图获取list的接口get请求
export function getSingleList(userId) {
  return request({
    url: '/vis/chart/info',
    method: 'get',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    },
    params:{
      "userId": userId,
    }
  })
}

//4. 获取我的可视化列表接口 get请求
// export function getVisualizationList(userId,query) {
//   return request({
//     url: '/vis/chart/info',
//     method: 'get',
//     headers: {
//       "X-AOHO-UserId" : store.getters.id,
//       "Authorization" : 'Bearer ' + store.getters.token,
//     },
//     params: {
//       page: query.pageNum,
//       size: query.pageSize,
//       userId: userId,
//       chartName: query.name
//     }
//   })
// }

//4. 获取我的可视化列表接口 get请求
// export function getVisualizationList1(userId,query) {
//   return request({
//     url: '/vis/multi/chart',
//     method: 'get',
//     headers: {
//       "X-AOHO-UserId" : store.getters.id,
//       "Authorization" : 'Bearer ' + store.getters.token,
//     },
//     params: {
//       page: query.pageNum,
//       size: query.pageSize,
//       userId: userId,
//       multiChartsName: query.name
//     }
//   })
// }

//4. 获取我的可视化列表接口 get请求
// export function getVisualizationList2(userId,query) {
//   return request({
//     url: '/vis/multi/chart/demo',
//     method: 'get',
//     headers: {
//       "X-AOHO-UserId" : store.getters.id,
//       "Authorization" : 'Bearer ' + store.getters.token,
//     },
//     params: {
//       page: query.pageNum,
//       size: query.pageSize,
//       userId: userId,
//       multiChartsName: query.name
//     }
//   })
// }

export function getVisualizationList(query) {
  return request({
    url: '/vis/selectList',
    method: 'get',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    },
    params: {
      pageNum: query.pageNum-1,
      pageSize: query.pageSize,
      visualizationName: query.visualizationName
    }
  })
}

//5. 根据单图id获取单图信息 get请求
// export function getSingleInfo(singleId,count,Id,multipleSelection) {
//   return request({
//     url: '/vis/chart/info/'+singleId,
//     method: 'get',
//     headers: {
//       "X-AOHO-UserId" : store.getters.id,
//       "Authorization" : 'Bearer ' + store.getters.token,
//     }
//   })
// }

export function getSingleInfo(singleId) {
  return request({
    url: '/vis/selectOne/',
    method: 'get',
    headers: {
      // "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    },
    params: {
      id: singleId
    }
  })
}

//6. 根据多图id获取多图信息 get请求
export function getMultiInfo(multiId) {
  return request({
    url: '/vis/multi/chart/'+multiId,
    method: 'get',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    }
  })
}

//6. 根据多图id获取多图模板信息 get请求
export function getMultiInfoDemo(multiId) {
  return request({
    url: '/vis/multi/chart/demo/'+multiId,
    method: 'get',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    }
  })
}

//7.获取多图列表 post请求
export function getMultiList(userid) {
  return request({
    url: '/vis/multi/chart',
    method: 'get',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    },
    params:{
      "userId": userid,
    }
  })
}

//8.更新单图信息 post请求
// export function updateSingle(queryContent) {
//   return request({
//     datatype:'json',
//     url: '/vis/chart/info',
//     method: 'put',
//     headers: {
//       "X-AOHO-UserId" : store.getters.id,
//       "Authorization" : 'Bearer ' + store.getters.token,
//     },
//     data:{
//       "visChartInfo":{
//         "id":queryContent.sid,
//         "userId": queryContent.userId,
//         "chartName": queryContent.name,
//         "dataName":queryContent.dataname,
//         "dataPath":queryContent.datapath,
//         "chartType":queryContent.type,
//         "xDim": queryContent.xAxisNum,
//         "yDim": queryContent.yAxisNum,
//         "zDim": queryContent.zAxisNum,
//         "timer": queryContent.timer,
//         "xAxis": queryContent.xAxis,
//         "yAxis": queryContent.yAxis,
//         "zAxis": queryContent.zAxis
//       },
//       "visChartDatasource":{
//         "id":queryContent.datasourceId,
//         "databaseId": queryContent.databaseId,
//         "tableName": queryContent.tableName,
//         "xAxisName": queryContent.xAxisName,
//         "yAxisName": queryContent.yAxisName,
//         "zAxisName": queryContent.zAxisName
//       },
//       "visFileInfoVOList": queryContent.filesCsv
//     }
//   })
// }
export function updateSingle(data) {
  return request({
    datatype:'json',
    url: '/vis/updateOne ',
    method: 'post',
    headers: {
      // "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    },
    data
  })
}

//9.更新多图信息 post请求
export function updateMulti(queryContent) {
  return request({
   datatype:'json',
    url: '/vis/multi/chart',
    method: 'put',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    },
    data:{
      "visMultiChart":{
        "id":queryContent.id,
        "userId": queryContent.userId,
        "multiChartsName":queryContent.name,
        "chartNum":queryContent.num,
        "timer":queryContent.timer,
      },
      "visChartLayoutList":queryContent.multiLayout,
      "delSingleId":queryContent.delSingleId,
      "addSingleId":queryContent.addSingleId,
      "ueContent":queryContent.ueContent,
    }
  })
}

//9.更新多图模板信息 post请求
export function updateMultiDemo(queryContent) {
  return request({
   datatype:'json',
    url: '/vis/multi/chart/demo',
    method: 'put',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    },
    data:{
      "visMultiChart":{
        "id":queryContent.id,
        "userId": queryContent.userId,
        "multiChartsName": queryContent.name,
        "chartNum": queryContent.graphnumber,
        "timer": queryContent.timer,
        "remark": queryContent.remark,
        "backgroundWidth": queryContent.backgroundWidth,
        "backgroundHeight": queryContent.backgroundHeight,
        "backgroundColor": queryContent.backgroundColor

      },
      "addSingleId":queryContent.addsingleId,
      "visChartRectList":queryContent.multiLayout,
      "delSingleId":queryContent.delSingleId,
      "ueContent":queryContent.ueContent,
    }
  })
}


//10.删除单图 delete请求
// export function deleteSingle(singleId) {
//   return request({
//     datatype:'json',
//     url: '/vis/chart/info/'+singleId,
//     method: 'delete',
//     headers: {
//       "X-AOHO-UserId" : store.getters.id,
//       "Authorization" : 'Bearer ' + store.getters.token,
//     }
//   })
// }

export function deleteSingle(singleId) {
  return request({
    datatype:'json',
    url: '/vis/deleteOne',
    method: 'get',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    },
    params: {
      id: singleId
    }
  })
}

//11.  删除多图 delete请求
export function deleteMulti(multiId) {
  return request({
    datatype:'json',
    url: '/vis/multi/chart/'+multiId,
    method: 'delete',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    }
  })
}

//12.  获取关联图表 get请求
export function getRelation(singleId) {
  return request({
    datatype:'json',
    url: '/vis/chart/relation/getRelationGraph',
    method: 'get',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    },
    params:{
      id: singleId
    }
  })
}

//13.批量删除单图get请求
export function deleteSingleList(ids) {
  return request({
    datatype:'json',
    url: '/vis/deleteList',
    method: 'get',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    },
    params: {
      ids: ids
    }
  })
}

export function connectDatasource(contractID, method, args) {
  return new Promise((resolve, reject) => {
    window.executeContract(contractID, method, JSON.stringify(args), (res) => {
      resolve(res)
    })
  })
}
