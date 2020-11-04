import $ from 'jquery'
import {
  createWssocket,
  onExecuteResultInternal
} from '@/assets/js/createWS'
import {
  sm2
} from 'sm-crypto'
import store from '@/store/index.js'
// import {
//   stackOrderInsideOut
// } from 'd3';
var dtLang = {
  sProcessing: '处理中...',
  lengthMenu: '显示 <select>' +
    '<option value="5">5</option>' +
    '<option value="20">20</option>' +
    '<option value="100">100</option>' +
    '<option value="-1">全部</option>' +
    '</select> 项结果',
  sZeroRecords: '没有匹配结果',
  sInfo: '显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项',
  sInfoEmpty: '显示第 0 至 0 项结果，共 0 项',
  sInfoFiltered: '(由 _MAX_ 项结果过滤)',
  sInfoPostFix: '',
  sSearch: '搜索:',
  sUrl: '',
  sEmptyTable: '表中数据为空',
  sLoadingRecords: '载入中...',
  sInfoThousands: ',',
  oPaginate: {
    sFirst: '首页',
    sPrevious: '上页',
    sNext: '下页',
    sLast: '末页'
  },
  oAria: {
    sSortAscending: ': 以升序排列此列',
    sSortDescending: ': 以降序排列此列'
  }
}

var applyRole = function(role) {
  global.wssocket.send(
    '{"action":"applyNodeRole","role":"' +
    role +
    '","pubKey":"' +
    global.sm2Key.publicKey +
    '"}'
  )
}
var WSHandler = function(event) {
  console.log(event)
  var data = event.data
  // console.log(" -->" + data);
  try {
    var obj = JSON.parse(data)

    switch (obj.action) {
      case 'onListPersonalProjects':
        onListPersonalProjects(obj)
        break
      case 'onListAllContractProcess':
        onListAllContractProcess(obj)
        break
      case 'onStartContract':
        onStartContract(obj)
        break
      case 'onGenerateMySQLProject':
        onGenerateMySQLProject(obj)
        break
      case 'onGenerateCSVProject':
        onGenerateCSVProject(obj)
        break
      case 'onTransferTo':
        onTransferTo(obj)
        break
      case 'onHashResult':
        onHashResult(obj)
        break
      case 'onListMemoryFiles':
        onListMemoryFiles(obj)
        break
      case 'onDumpContract':
        onDumpContract(obj)
        break
      case 'onChangeDumpPeriod':
        onChangeDumpPeriod(obj)
        break
      case 'onGetDumpPeriod':
        onGetDumpPeriod(obj)
        break
      case 'onStaticVerifyResult':
        onStaticVerifyResult(obj)
        break
      case 'onListContractProcess':
        onListContractProcess(obj)
        break
      case 'onDeleteFile':
        onDeleteFile(obj)
        break
      case 'onCancelAuth':
        onCancelAuth(obj)
        break
      case 'onDownloadContract':
        onDownloadFile(obj)
        break
      case 'onChangePublic':
        onChangePublic(obj)
        break
      case 'onListProjects':
        onListProjects(obj)
        break
      case 'onListProject':
        onListProject(obj)
        break
      case 'onListLocalNodeLog':
        onListLocalNodeLog(obj)
        break
      case 'onListLocalNodeLogPie':
        onListLocalNodeLogPie(obj)
        break
      case 'onListLocalNodeLogLine':
        onListLocalNodeLogLine(obj)
        break
      case 'onListLocalContractLog':
        onListLocalContractLog(obj)
        break
      case 'onListLocalContractLogPie':
        onListLocalContractLogPie(obj)
        break
      case 'onListLocalContractLogLine':
        onListLocalContractLogLine(obj)
        break
      case 'onGetNodeSessionID':
      case 'onSessionID':
        onGetNodeSessionID(obj)
        break
      case 'onLogin':
        onNodeLogin(obj)
        break
      case 'onGetNodeRole':
      case 'onGetRole':
        onGetNodeRole(obj)
        break

      case 'onApplyRole':
        onApplyRole(obj)
        break
      case 'onListAllAuthRole':
        onListAllAuthRole(obj)
        break
      case 'onListUnAuthRole':
        onListUnAuthRole(obj)
        break
      case 'onDeleteRole':
        onDeleteRole(obj)
        break
      case 'onCountRole':
        onCountRole(obj)
        break
      case 'onAuthNodeRole':
        onAuthNodeRole(obj)
        break
      case 'onApplyNet':
        onApplyNet(obj)
        break
      case 'onLoadNodeConfig':
        onLoadNodeConfig(obj)
        break
      case 'onChangeNodeName':
        onChangeNodeName(obj)
        break
      case 'onChangeYJSPath':
        onChangeYJSPath(obj)
        break
      case 'onGetLicenceExpiredDate':
        $('#expiredDate').html(convertDate(data.data))
        break
      case 'onGetPeerID':
        global.peerID = obj.data
        // getNodeTrustUnits();//still connecting to centerportalws
        break
      case 'onViewContractInstance':
        onViewContractInstance(obj)
        break
      case 'onExecuteResult':
        onExecuteResult(obj)
        break
      case 'onExecuteContractTrustfully':
        onExecuteContractTrustfully(obj)
        break
      case 'onUploadFile':
        onUploadFile(obj)
        break
      case 'onStartContract':
        onStartContract(obj)
        break
      case 'onKillContractProcess':
        onStopContract(obj)
        break
      case 'onKillAllContract':
        onKillAllContract(obj)
        break
      case 'onSetPermission':
        onSetPermission(obj)
        break
      case 'onOutputStream':
        displayOutput(obj)
        break
      // case 'onOutputStream':
      //   displayOutput(obj);
      //   break;
      case 'onChangeNodeCenter':
        console.log('onChangeNodeCenter')
        onChangeNodeCenter(obj)
        break
      case 'onStartContractP2PTrustfully':
        onStartContractP2PTrustfully(obj)
        break
      case 'onException':
        onException(obj)
      // logException(obj);
      // break;
      case 'onHashResult':
        onHashResult(obj)
        break
      case 'onCountContractLogGroupByCategory':
        onCountContractLogGroupByCategory(obj)
        break
      case 'onQueryContractLogByDate':
        onQueryContractLogByDate(obj)
        break
      case 'onQueryContractLogByOffset':
        onQueryContractLogByOffset(obj)
        break
      default:
        displayOutput(obj)
        break
    }
  } catch (err) {
    console.log(err)
  }
}
var onException = function(obj) {
  if (obj.data.startsWith('unauthorised action')) {
    var action = obj.data.replace('unauthorised action ', '')
    // switch (action) {
    //   case 'listContractProcess':
    //     // mainVue.contracts = []
    //     // alertNoPermission(
    //     //   'listContractProcess无授权，请申请ContractUser权限',
    //     //   '提示'
    //     // )
    //     break
    //   default:
    //     alertNoPermission(action + '无权限', '提示')
    // }
  }
}
// var showDialog = function(title, cb, cancelcb) {
//   $('#dialogTitleH5').html(title)
//   $('#dialogConfimBtn')
//     .off('click')
//     .on('click', cb)
//   $('#dialogCloseBtn')
//     .off('click')
//     .on('click', cancelcb)
//   $('#dialog').modal('show')
// }

// var alertNoPermission = function(message, title) {
//   if ($('#nopermissionSpan').length > 0) {
//     console.log(message + ' status:' + $('#dialog')[0].getAttribute('class'))
//     $('#nopermissionSpan').append('<br/>' + message)
//   } else {
//     var body =
//       "<div class='row'><div class='col-sm-12'><span id='nopermissionSpan'>"
//     body += message
//     body += '</span></div></div>'
//     $('#dialogBodyDiv').html(body)
//     showDialog('提示', function() {
//       $('#dialogBodyDiv').html('')
//     })
//   }
//   return
// }

var onExecuteResult = onExecuteResultInternal

var onExecuteContractTrustfully = function(obj) {
  console.log(obj)
  var list = obj.data
  var finalResult = obj
  if (global.responseCollector[obj.responseID] == undefined) {
    global.responseCollector[obj.responseID] = []
  }
  var list = global.responseCollector[obj.responseID]
  list.push(finalResult)
  var isConsistency = true
  for (var i = 0; i < list.length; i++) {
    var r = list[i]
    if (finalResult.data != r.data) {
      isConsistency = false
    }
  }
  if (isConsistency) {
    $('#consistencyResult').html(list.length + '个结果一致')
  } else {
    showInconsistentResult(list)
  }
  if (finalResult != undefined) {
    console.log(finalResult)
    onExecuteResult(finalResult)
  }
}
var showInconsistentResult = function(list) {
  global.resultList = list
  var html =
    "<table class='table table-striped'><thead><tr><td>status</td><td>executeTime</td><td>result</td></tr></thead><tbody>"
  for (var i = 0; i < list.length; i++) {
    var r = list[i]
    html += '<tr><td>'
    var data = JSON.parse(r.data)
    html += data.status
    html += '</td><td>'
    html += r.executeTime
    html += "</td><td><textarea class='form-control'>"
    html += data.result
    html += '</textarea></td></tr>'
  }
  html += '</tbody></table>'
  if ($('#consistencyResult').length > 0) {
    $('#consistencyResult').html(html)
  } else {
    $('#dialogBodyDiv').html(html)
    showDialog('调用结果不一致', function() { }, function() { })
  }
}

var showDialog = function(title, cb, cancelcb) {
  $('#dialogTitleH5').html(title)
  $('#dialogConfimBtn')
    .off('click')
    .on('click', cb)
  $('#dialogCloseBtn')
    .off('click')
    .on('click', cancelcb)
  $('#dialog').modal('show')
}

var onHashResult = function(obj) {
  $('#hashDisplayDiv').html('溯源指纹:' + obj.data)
}
var displayOutput = function(obj) {
  // console.log(obj);
}

var initWSocket = function() {
  var host = '39.104.201.40:21030'
  console.log(store.getters.nodeAddr)
  if (store.getters.nodeAddr !== undefined && store.getters.nodeAddr !== '')
    host = store.getters.nodeAddr
  if (!host.startsWith('ws')) {
    host = 'ws://' + host
  }
  if (host.endsWith('/SCIDE')) {
    host += '/SCExecutor'
  } else if (host.endsWith('/SCIDE/')) {
    host += 'SCExecutor'
  } else if (host.endsWith('NodeCenterWS')) {
    //..
  } else if (!host.endsWith('/SCIDE/SCExecutor')) {
    host += '/SCIDE/SCExecutor'
  }
  console.log('connect ws:' + host)
  global.wssocket = createWssocket(
    host,
    function() {
      getSession()
    },
    WSHandler
  )
  global.responseCollector = {}
}
//sss
var getSession = function() {
  global.wssocket.send('{"action":"getSessionID"}')
}
var exportSMKeyPair = function() {
  $('#dialog').html('Save Your key:<br/>' + JSON.stringify(global.sm2Key))
  $('#dialog').dialog('open')
}
// ====== wsHandler
var onGetNodeSessionID = function(data) {
  console.log('onGetNodeSessionID')
  global.session = data.session
  var loginParam = {}
  var res = store.getters.pubKey.split(",")
  if (store.getters.contractKey !== '' && store.getters.contractKey !== undefined) {
    console.log(store.getters.contractKey)
    res = store.getters.contractKey.split(",")
  }
  loginParam.pubKey = res[0]
  // loginParam.pubKey = global.sm2Key.publicKey
  // loginParam.pubKey =
  //   '04e559f40ad2449d02b3c40d7a18d7c625fd75560f96a43ba2c979631c8a0366e622fdc9440d71b14b4b108e22891f32ad73383eab4b3b164864b6d4d7b788eca5'
  // loginParam.signature = sm2.doSignature(
  //   global.session,
  //   global.sm2Key.privateKey
  // )
  loginParam.signature = sm2.doSignature(
    global.session,
    // '05effe8a0f89bcb5a3cc5303fc21b5ee4cea43702b15bc78c0ca583b4c0ee3f4'
    res[1]
  )
  loginParam.action = 'login'
  global.wssocket.send(JSON.stringify(loginParam))
}
var onNodeLogin = function(data) {
  console.log('onNodeLogin')
  global.myRole = data.data
  listContracts()
}
var onListProjects = function(data) {
  console.log('onListProjects', data.data, typeof data)
  store.commit('setListProjects', JSON.parse(data.data))
  global.projects = data.data
}
var onGetNodeRole = function(data) {
  console.log('onGetNodeRole')
  console.log(data)
  // pubkeyDialogVue.myRole = data.data;
  // global.myRole = data.data;
  // listContracts();
}
var onStartContract = function(data) {
  console.log(data, typeof data.cid)
  store.commit('setStartContract', data)
}
var onCountContractLogGroupByCategory = function(data) {
  // console.log('onCountContractLogGroupByCategory')
  // console.log(data)
  // if(data.data.constructor === Array){
  //   store.commit('setCountContractLog', data)
  // }else{
  //   store.commit('setCountContractLogByContractName',data)
  // }
  store.commit('setCountContractLog', data)
}
var onQueryContractLogByOffset = function(data) {
  // console.log('onQueryContractLogByOffset')
  // console.log(data)
  store.commit('setContractLogList', data)
}
var onQueryContractLogByDate = function(data) {
  // console.log('onQueryContractLogByDate')
  // console.log(data)
  store.commit('setContractLogListByDate', data)
}
var onStopContract = function(data) {
  console.log(data)
}
var onGenerateMySQLProject = function(data) {
  console.log('onGenerateMySQLProject', data)
}
var onGenerateCSVProject = function(data) {
  console.log('onGenerateCSVProject', data)
}
//ssss
var listContracts = function() {
  var request = {}
  if (store.state.user.roles.indexOf('admin') !== -1) {
    console.log('wsCluster listAllContractProcess')
    request.action = 'listAllContractProcess'
  } else {
    console.log('wsCluster listContractProcess')
    request.action = 'listAllContractProcess'
  }
  // request.action = 'listContractProcess'
  global.wssocket.send(JSON.stringify(request))
}
var onListAllContractProcess = function(data) {
  console.log('onListAllContractProcess')
  console.log(data)
  store.commit('setContractProcessList', JSON.parse(data.data))
  // var request = {}
  // request.action = "listAllContractProcess"
  // global.wssocket.send(JSON.stringify(request));
}
var changeApp = function() {
  global.currentContract = global.contracts[$('#selectContract')[0].value]
  if (global.currentContract == undefined) return
  var requireRendering = needRender(global.currentContract)
  changeAppInternal(requireRendering)
}
var changeAppInternal = function(requireRendering) {
  if (global.urlparam['noRender'] != 'true' && requireRendering) {
    executeCurrentContract('getMainFrame', '', parseMainFrame)
  } else {
    var title = '只包含计算逻辑'
    if (requireRendering) title = '包含界面'
    title += getContractDesp()

    var html =
      '   <div class=\'container\'>  <div class="card mt-3 ">\n' +
      '        <div class="card-body">\n' +
      '          <h5 class="card-title">' +
      title +
      '</h5>\n' +
      '          <div class="card-body" >\n' +
      '            <div class="row">\n' +
      '              <div class="col-sm-12 d-flex justify-content-center">\n' +
      '                <div class="input-group mb-2">\n' +
      '                  <div class="input-group-prepend">\n' +
      '	            <select id="selectAction" onchange="showDescription()" class="custom-select" style="-webkit-appearance: none;"><option value="-1">选择方法</option></select>		\n' +
      '                  </div>\n' +
      '                  <input type="text" class="form-control" id="argInput" placeholder="填写参数" >\n' +
      '                  <div class="input-group-append">\n' +
      '                    <button class="btn btn-outline-secondary" type="button" \n' +
      '                            onclick="triggerExecuteCurrentContract()">\n' +
      '                      调用\n' +
      '                    </button>\n' +
      '                  </div>\n' +
      '                </div>\n' +
      '              </div>\n' +
      '            </div>' +
      "<div class='row mb-2'><div class='col-sm-12 d-flex '>" +
      '<div class="input-group" ><div class="input-group-prepend" > <span class="input-group-text" >方法描述</span></div><input class="input-group-text form-control" id="descriptionSpan" placeholder="暂无"></input></div>' +
      '</div></div>' +
      "<div class='row mb-4'><div class='col-sm-12 d-flex'>" +
      '<div class="input-group " ><div class="input-group-prepend" > <span class="input-group-text" >http接口</span></div><input class="input-group-text form-control" id="sigOutput"></input></div></div></div>\n' +
      '            <h5 class="card-title">调用结果</h5>\n' +
      '	    <div class="input-group mb-3">\n' +
      '              <div class="input-group-prepend">\n' +
      '                <span class="input-group-text" id="statusSpan">调用状态</span>\n' +
      '              </div>\n' +
      '		<span class="input-group-text" id="reqIDSpan">请求ID</span>\n' +
      '		<span class="input-group-text" id="timeSpan">调用耗时</span>\n' +
      '		<textarea id="responseArea" class="form-control"></textarea>\n' +
      "            </div><div class='row mb-4'><div class='col-sm-12 d-flex' id='consistencyResult'> </div></div>" +
      '          </div>\n' +
      '        </div>\n' +
      '      </div></div>\n' +
      ''
    $('#mainDiv')[0].innerHTML = html
    for (var i = 0; i < global.currentContract.exportedFunctions.length; i++) {
      $('#selectAction').append(
        "<option value='" +
        i +
        "'>" +
        global.currentContract.exportedFunctions[i].functionName +
        '</option>'
      )
    }
  }
}
var getContractDesp = function() {
  try {
    var annos = global.currentContract.annotations
    for (var i = 0; i < annos.length; i++) {
      if (annos[i].type == 'Description') {
        return ', ' + JSON.parse(annos[i].args[0])
      }
    }
  } catch (e) {
    console.log(e)
  }
  return ''
}
var triggerExecuteCurrentContract = function() {
  var funPos = $('#selectAction')[0].value
  var funNode = global.currentContract.exportedFunctions[funPos]
  executeCurrentContract(
    funNode.functionName,
    $('#argInput')[0].value,
    fillResultInternal
  )
  var iHtml =
    '/SCIDE/SCManager?action=executeContract&contractID=' +
    global.currentContract.name +
    '&operation=' +
    funNode.functionName +
    '&arg=' +
    $('#argInput')[0].value +
    '&pubkey=' +
    global.sm2Key.publicKey +
    '&signature='
  var toSign =
    global.currentContract.name +
    '|' +
    funNode.functionName +
    '|' +
    $('#argInput')[0].value +
    '|' +
    global.sm2Key.publicKey
  var signature = sm2.doSignature(toSign, global.sm2Key.privateKey)
  var urlPre = $('#urlInput')[0].value
  if (urlPre.startsWith('ws')) urlPre = urlPre.replace('ws', 'http')
  $('#sigOutput')[0].value = urlPre + iHtml + signature
}
var showDescription = function() {
  var funPos = $('#selectAction')[0].value
  var funNode = global.currentContract.exportedFunctions[funPos]
  for (var i = 0; i < funNode.annotations.length; i++) {
    var anno = funNode.annotations[i]
    if (anno.type == 'Description') {
      descriptionSpan.value = JSON.parse(anno.args[0])
    }
  }
}
var fillResultInternal = function(result, data) {
  $('#statusSpan')[0].innerHTML = result.status
  $('#reqIDSpan')[0].innerHTML = data.responseID
  $('#timeSpan')[0].innerHTML = '调用耗时:' + data.executeTime + '(ms)'
  $('#responseArea')[0].value = result.result
}
var parseMainFrame = function(data) {
  console.log('parseMainFrame')
  console.log(data)
  var mainHtml = data.result
  executeCurrentContract('loadResource', mainHtml, loadMain)
}
var loadMain = function(data) {
  var html = data.result
  $('#mainDiv').append(html)
  setTimeout(function() {
    console.log('listSize:')
    var list = $('#mainDiv script')
    global.scriptList = []
    global.scriptOrder = 0
    console.log('listSize:' + list.length)
    for (var i = 0; i < list.length; i++) {
      var re = list[i].getAttribute('fromContract')
      if (re == undefined) continue
      global.scriptList.push(re)
    }
    if (global.scriptList.length > 0)
      executeCurrentContract('loadResource', global.scriptList[0], loadScript)
    var list = $('#mainDiv link')
    for (var i = 0; i < list.length; i++) {
      var re = list[i].getAttribute('fromContract')
      executeCurrentContract('loadResource', re, loadCss)
    }
  }, 100)
}
var loadScript = function(data) {
  console.log('loadScript')
  global.lastScript = data
  setTimeout(eval, 1, global.lastScript.result)
  global.scriptOrder++
  if (global.scriptOrder < global.scriptList.length) {
    executeCurrentContract(
      'loadResource',
      global.scriptList[global.scriptOrder],
      loadScript
    )
  }
}

var loadCss = function(data) {
  console.log('loadScript')
  global.lastCss = data
  var ele = document.createElement('style')
  ele.setAttribute('type', 'text/css')
  ele.innerHTML = data.result
  document.body.append(ele)
}

var needRender = function(con) {
  for (var i = 0; i < con.exportedFunctions.length; i++) {
    var fun = con.exportedFunctions[i]
    console.log(fun)
    if (fun.functionName == 'needRender') return true
  }
  return false
}
var onListPersonalProjects = function(data) {
  console.log(data)
}
var onListContractProcess = function(data) {
  // store.getters.startContract = JSON.parse(data.data)
  // console.log('onListContractProcess')
  // console.log(JSON.parse(data.data))
  // store.commit('setContractProcessList', JSON.parse(data.data))
  // $('#selectContract').html('')
  // global.contracts = JSON.parse(data.data)
  // $('#selectContract').append("<option value='-1'>选择合约</option>")
  // var selectValue = -1
  // for (var i = 0; i < global.contracts.length; i++) {
  //   if (global.contracts[i].id == undefined)
  //     global.contracts[i].id = global.contracts[i].contractID
  //   if (global.contracts[i].name == undefined)
  //     global.contracts[i].name = global.contracts[i].contractName

  //   $('#selectContract').append(
  //     "<option value='" + i + "'>" + global.contracts[i].name + '</option>'
  //   )
  //   if (global.urlparam['contract'] != undefined) {
  //     if (
  //       global.urlparam['contract'] == global.contracts[i].name ||
  //       global.urlparam['contract'] == global.contracts[i].id
  //     ) {
  //       selectValue = i
  //     }
  //   }
  // }
  // if ($('#selectContract')[0] != undefined)
  //   $('#selectContract')[0].value = selectValue
  // if (global.urlparam['contract'] != undefined) {
  //   changeApp()
  // }
}

var onListLocalNodeLog = function(data) {
  var userManTab = $('#v-pills-userManager-tab')[0]
  var isActive = userManTab.getAttribute('aria-selected') == 'true'
  if (isActive) {
    drawUserActivityGraph(data)
  } else {
    drawLocalLogGraphs(data)
  }
}
var onListAllAuthRole = function(data) {
  console.log('onListAllAuthRole')
  fillAuthRoleData(data.data)
}

var onListUnAuthRole = function(data) {
  console.log('onListUnAuthRole')
  fillUnAuthRoleData(data.data)
}

var onApplyNet = function(data) {
  console.log('onApplyNet')
}
var onCountRole = function(data) {
  console.log('onCountRole')
  setUserTypeDistribution(data.data)
}

var onAuthNodeRole = function(data) {
  myToast('授权/忽略操作', data.data)
  if (data.data == 'success') {
    var arg = {}
    arg.action = 'listAllAuthRole'
    global.wssocket.send(JSON.stringify(arg))
    var arg = {}
    arg.action = 'listUnAuthRole'
    global.wssocket.send(JSON.stringify(arg))
  }
}

var onApplyRole = function(data) {
  console.log(data.data)
  myToast('申请操作', data.data)
}
var onDeleteRole = function(data) {
  myToast('删除操作', data.data)
  var loginAllUser = {}
  loginAllUser.action = 'listAllAuthRole'
  global.wssocket.send(JSON.stringify(loginAllUser))
}

// ====== wsHandler done!
var myToast = function(title, msg) {
  toastVue.toastTitle = title
  toastVue.toastMessage = msg
  $('#alertDiv').toast('show')
}

var countChar = function(str, c) {
  var ret = 0
  for (var i = 0; i < str.length; i++) {
    if (str.charAt(i) == c) ret++
  }
  return ret
}
var generate = function() {
  var key = sm2.generateKeyPairHex()
  global.sm2Key = key
  localStorage.setItem('PrivKey', JSON.stringify(key))
}

var killAllContract = function() {
  var request = {}
  request.action = 'killAllContract'
  global.wssocket.send(JSON.stringify(request))
}
var onDeleteFile = function(data) {
  console.log(data)
}
var init = function() {
  // initVue();
  //
  // initGlobal();
  global.sm2Key = localStorage.getItem('PrivKey')
  if (
    global.sm2Key == undefined ||
    global.sm2Key == null ||
    global.sm2Key.length < 100
  ) {
    global.sm2Key = sm2.generateKeyPairHex()
    localStorage.setItem('PrivKey', JSON.stringify(sm2Key))
  } else {
    global.sm2Key = JSON.parse(global.sm2Key)
  }

  global.urlparam = getRequestParameters()
  //
  if (global.urlparam['noRender'] == 'true')
    switchRenderBtn.innerHTML = '加载界面'
  global.cbs = {}

  // if (global.urlparam["self"] == "true") {
  //   if (document.location.href.startsWith("http")) {
  //     var path = document.location.origin+document.location.pathname;
  //     path = path.replace("/client/bdwareclient.html","");
  //     $("#urlInput")[0].value = path.replace("http",
  //       "ws");
  //
  //     connectNode();
  //   }
  // } else {
  //
  //   var lastNode = localStorage.getItem("lastNode");
  //   if (lastNode != undefined) {
  //     $("#urlInput")[0].value = lastNode;
  //     connectNode();
  //   }
  // }
  initWSocket()
}

var connectNode = function() {
  localStorage.setItem('lastNode', $('#urlInput')[0].value)
  initWSocket()
}

var getRequestParameters = function() {
  var arr = (location.search || '').replace(/^\?/, '').split('&')
  var params = {}
  for (var i = 0; i < arr.length; i++) {
    var data = arr[i].split('=')
    if (data.length == 2) {
      params[data[0]] = data[1]
    }
  }
  return params
}

var changeRender = function() {
  if (global.urlparam['noRender'] == 'true') {
    global.urlparam['noRender'] = undefined
    switchRenderBtn.innerHTML = '不加载界面'
  } else {
    global.urlparam['noRender'] = 'true'

    switchRenderBtn.innerHTML = '加载界面'
  }
  changeApp()
}

init()

export {
  initWSocket,
  init
}
