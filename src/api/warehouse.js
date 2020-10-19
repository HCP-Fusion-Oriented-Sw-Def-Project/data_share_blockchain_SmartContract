import request from '@/utils/requestwarehouse'
import Qs from 'qs'
import store from '@/store'
import {stringify} from "zrender/src/tool/color";
/* eslint-disable */
//查询数据链接列表
export function fetchDatabaseList(query) {
  return request({
    // url: '/article/list',
    // method: 'get',
    // params: query
    // contentType:'application/json; charset=utf-8',
    // emulateJSON: false,
    // traditional: true,
    // transformRequest: [data => Qs.stringify(data)],
    datatype:'json',
    // url: '/job/database',
    url: '/extractDbManagement/api/all',
    method: 'get',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    },
    params:{
      "pages": query.pages,
      "rows": query.rows,
      "dbSoftwareType": query.dbSoftwareType,
      "name": query.name,
      "createBy": query.createBy,
      // "database": {
      //   "createBy":query.createBy,
      //   "name":query.name,
      //   "type":query.type,
      // }
    }
  })
}

//查询当前数据连接列表
export function fetchMyDatabaseList(query) {
  return request({
    datatype:'json',
    url: '/job/database',
    method: 'get',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    },
    params:{
      "pages": query.pages,
      "rows": query.rows,
      "database": {

      }
    }
  })
}


//获取日志
export function fetchLog(ID) {
    return request({
        datatype:'json',
        url: '/job/job/fetchLog' + '?jobId=' + ID,
        method: 'post',
        headers: {
            "X-AOHO-UserId" : store.getters.id,
            "Authorization" : 'Bearer ' + store.getters.token,
        }
    });
}

//查询当前数据连接列表
export function fetchChartDatasource(query) {
  return request({
    transformRequest: [data => Qs.stringify(data)],
    url: '/Metadata/getChartDatasource',
    method: 'post',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    },
    data:{
      "databaseId":query.databaseId,
      "tableName":query.tableName,
      "xAxisName":query.xAxisName+'',
      "yAxisName":query.yAxisName+'',
      "zAxisName":query.zAxisName+''
    }
  })
}

//根据id获取数据链接信息
export function getDatabaseInfoById(data) {
  return request({
    contentType:'application/json; charset=utf-8',
    transformRequest: [data => Qs.stringify(data)],
    // url: '/job/database/id/'+data,
    url: '/extractDbManagement/api/'+data,
    method: 'get',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    }

  })
}

//添加数据集
export function addDatabase(data) {
  return request({
    datatype:'json',
    url: '/extractDbManagement/api',
    method: 'post',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    },
    data:{
      "name": data.name,
      "dbSoftwareType": data.dbSoftwareType,
      "hostName": data.hostName,
      "hostPort": data.hostPort,
      "dbName": data.dbName,
      "definedConnect": data.definedConnect,
      "connectUrl": data.connectUrl,
      "sourceType": data.sourceType,
      "userName": data.username,
      "password": data.password
    }
  })
}

//修改数据集
export function updateDatabase(data) {
  return request({
    datatype:'json',
    url: '/Database/updateDb',
    method: 'put',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    },
    data:{
      "database" : data,
      // "driverClassName":data.dirverClassName,
    }
  })
}

//删除数据链接
export function deleteDatabase(data) {
  return request({
    contentType:'application/json; charset=utf-8',
    transformRequest: [data => Qs.stringify(data)],
    url: '/extractDbManagement/api/'+ data,
    method: 'delete',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    }
    // data
  })
}

//批量删除数据集（链接）
export function deleteDatabaseInBatches(data) {
  return request({
    datatype:'json',
    url: '/extractDbManagement/api',
    method: 'delete',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    },
    data
  })
}

//根据id获取数据表信息
export function fetchMyDatasetList(data) {
  return request({
    // datatype:'json',
    contentType:'application/json; charset=utf-8',
    transformRequest: [data=> Qs.stringify(data)],
    url: '/extractDbManagement/api/metadata/'+data.databaseId,
    method: 'get',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    },
    // params:{
    //   //"tableName": data.name,
    //   "id": data.databaseId,
    // },
  })
}
//根据id获取数据表信息
export function fetchMyDatasetfieldList(datasetId) {
  return request({
    contentType:'application/json; charset=utf-8',
    transformRequest: [datasetId=> Qs.stringify(datasetId)],
    url: '/Metadata/queryList/'+datasetId,
    method: 'get',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    }

  })
}
//获取数据表详细数据信息
export function fetchDatafromServer(data){
  return request({
    // datatype:'json',
    contentType:'application/json; charset=utf-8',
    transformRequest: [data=> Qs.stringify(data)],
    url: '/extractDbManagement/api/table/'+data.databaseId+'/'+data.tableName,
    method: 'get',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    },
    // data:{
    //   "tableName": data.tableName,
    //   "databaseId": data.databaseId,
    // },
  })
}

//获取数据表详细数据信息--Hive
export function fetchDatafromServerHive(data){
  return request({
    // datatype:'json',
    contentType:'application/json; charset=utf-8',
    transformRequest: [data=> Qs.stringify(data)],
    url: '/bigdata/listHiveData',
    method: 'post',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    },
    data:{
      "tableName": data.tableName,
      "databaseId": data.databaseId,
    },
  })
}



//查询作业列表
export function fetchJobList(query) {
  return request({
    datatype:'json',
    url: '/job/job',
    method: 'get',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    },
    params:{
      "pages": query.pages,
      "rows": query.rows,
      // "job": {
      //   "name":query.name,
      //   // "sourceDatabaseId":query.ydata,
      //   // "targetDatabaseId":query.mdata,
      //   // "timing":query.runstatus,
      // },
      // "parameters":query.parameters,
      "name":query.name,
    }
  })
}


//根据id获取作业信息
export function getJobInfoById(data) {
  return request({
    contentType:'application/json; charset=utf-8',
    transformRequest: [data => Qs.stringify(data)],
    url: '/job/job/'+data,//Job
    method: 'get',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    }
  })
}


//删除作业
export function deleteJob(data) {
  return request({
    contentType:'application/json; charset=utf-8',
    transformRequest: [data => Qs.stringify(data)],
    url: '/job/job/'+data,
    method: 'delete',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    }
    // data
  })
}

//批量删除作业
export function deleteJobInBatches(data) {
  return request({
    datatype:'json',
    url: '/deleteJobs',
    method: 'delete',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    },
    data
  })
}

//添加作业
export function createJob(data) {
  return request({
    datatype:'json',
    url: '/job/job',
    method: 'post',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    },
    data
  })
}

//修改作业
export function updateJob(data) {
  return request({

    datatype:'json',
    contentType:'application/json; charset=utf-8',
    transformRequest: [data => Qs.stringify(data)],

    url: '/job/job',
    method: 'put',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    },
    data:{
      "params" : data,
      // "functionMemberModels":data.functionMemberModels,
      // "instepParameters":data.instepParameters,
      // "outstepParameters":data.outstepParameters
    }
  })
}

//在目标数据连接中添加数据表
export function addDataTable(data){
  return request({
    // datatype:'json',
    contentType:'application/json; charset=utf-8',
    transformRequest: [data => Qs.stringify(data)],
    url: '/job/metadata/table/'+data.id+"/"+data.name,
    method: 'post',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    },
    data:{
      // "databaseId": data.id,
      // "tableName":data.name,
      "tableFields": data.tableColumn
    }
  })
}

//删除数据表
export function deleteDataTable(data) {
  return request({
    // datatype:'json',
    contentType:'application/json; charset=utf-8',
    transformRequest: [data => Qs.stringify(data)],
    url: '/job/metadata/table/'+data.databaseId+"/"+data.tableName,
    method: 'delete',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    },
    // data:{
    //   "databaseId": data.databaseId,
    //   "tableName":data.tableName,
    //   // "tableFields": data.tableColumn,
    // }
  })
}

//运行作业
export function runJob(data) {
  return request({
    datatype:'json',
    url: '/Job/runJob',
    method: 'post',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    },
    data:{
      "id":data,
      // "sourceDatabaseId":data.sourceDatabaseId,
      // "targetDatabaseId":data.targetDatabaseId,
      // "sourceTableName":data.sourceTableName,
      // "targetTableName":data.targetTableName,
      // "parameters" :data.parameters,
    }
  })
}

//根据id获取数据转换关系
export function getConvertInfoById(data) {
  return request({
    contentType:'application/json; charset=utf-8',
    transformRequest: [data => Qs.stringify(data)],
    url: '/Job/runJob/'+data,
    method: 'get',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    }
  })
}

//根据id暂停作业
export function stopConvertById(data) {
  return request({
    contentType:'application/json; charset=utf-8',
    transformRequest: [data => Qs.stringify(data)],
    url: '/Job/pauseJob/'+data,
    method: 'post',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    }
  })
}

//新建字段
export function addRow(data) {
  return request({
    // datatype:'json',
    contentType:'application/x-www-form-urlencoded; charset=utf-8',
    transformRequest: [data => Qs.stringify(data)],
    url: '/job/metadata/columnAdd',
    method: 'post',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    },
    data:{
      "databaseId": data.databaseId,
      "tableName":data.tableName,
      "name": data.columnName,
      "type":data.columnType
    }
  })
}

//更新字段
export function updateRow(data) {
  return request({
    // datatype:'json',
    contentType:'application/x-www-form-urlencoded; charset=utf-8',
    transformRequest: [data => Qs.stringify(data)],
    url: '/job/metadata/columnUpdate',
    method: 'post',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    },
    data:{
      "databaseId": data.databaseId,
      "tableName":data.tableName,
      "columnName": data.columnName,
      "type": data.columnType,
      "isNullable": data.isNull,
      "size": data.typeLength,
      "originColumnName": data.newColumnName
    }

  })
}

//删除字段
export function deleteField(data) {
  return request({
    // datatype:'json',
    contentType:'application/json; charset=utf-8',
    transformRequest: [data => Qs.stringify(data)],
    url: '/job/metadata/column?databaseId='+data.databaseId+"&tableName="+data.tableName+"&columnName="+data.columnName+"&columnType="+data.columnType,
    method: 'delete',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    },
    // data:{
    //   "databaseId": data.databaseId,
    //   "tableName":data.tableName,
    //   "columnName": data.columnName,
    //   "columnType": data.columnType,
    // }
  })
}

//查询转换函数列表
export function fetchEtlFunction() {
  return request({
    // datatype:'json',
    contentType:'application/json; charset=utf-8',
    transformRequest: [data => Qs.stringify(data)],
    url: '/Job/listEtlFunctions',
    method: 'post',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    }
    // data:{
    //   "databaseId": data.databaseId,
    //   "tableName":data.tableName,
    //   "columnName": data.columnName,
    // }
  })
}

//根据Id查询转换函数参数
export function getEltFunctionInfoById(data) {
  return request({
    // datatype:'json',
    contentType:'application/json; charset=utf-8',
    transformRequest: [data => Qs.stringify(data)],
    url: '/Job/getEltFunctionById',
    method: 'post',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    },
    data:{
      "functionId": data,
      // "tableName":data.tableName,
      // "columnName": data.columnName,
    }
  })
}

//查询当前IP下的数据库
export function fetchDatabaseNames(data) {
  return request({
    datatype:'json',
    url: '/job/database',
    method: 'post',
    headers: {
      "X-AOHO-UserId" : store.getters.id,
      "Authorization" : 'Bearer ' + store.getters.token,
    },
    data:{
      "dbType":data.type,
      "hostName":data.hostName,
      "port":data.port,
      "username":data.username,
      "password":data.password,
      "name":data.name,
    }
  })
}
