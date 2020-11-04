import cryptico from 'cryptico'
import {
  sm2
} from 'sm-crypto'
import store from '@/store/index.js'
export function createWssocket(wsurl, onopen, handler) {
  console.log("[createWS.js] createWssocket : " + wsurl);
  var retsocket = {};
  retsocket.handlerList = [];
  if (handler != undefined)
    retsocket.handlerList.push(handler);
  var wssocket = new WebSocket(wsurl);
  console.log(wssocket)
  wssocket.onerror = function(error) {
    console.log(error);
  };

  wssocket.onopen = onopen;
  var onmessage = function(event) {
    var obj = JSON.parse(event.data);
    switch (obj.action) {
      case 'sendNextSegment':
        retsocket.sendNextSegment();
        break;
      case 'sendSeg':
        retsocket.receiveSeg(obj);
        break;
      default:
        for (var i = 0; i < retsocket.handlerList.length; i++) {
          var h = retsocket.handlerList[i];
          h(event, wssocket);
        }
    }
  };

  var reconnect = function(error) {
    setTimeout(function() {
      console.log("[createWS.js] try to reconnect");
      wssocket = new WebSocket(wsurl);
      // wssocket.onclose = reconnect;
      wssocket.onmessage = onmessage;
      // wssocket.onopen = onopen;
    }, 1000);
  };
  wssocket.onclose = reconnect;

  retsocket.receiveSeg = function(obj) {
    if (obj.cid == 'start') {
      retsocket.toReceive = "";
    }
    retsocket.toReceive += obj.data;
    if (obj.cid == 'done') {
      console.log("[receiveSeg] Received AllData:" + retsocket.toReceive);
      var event = {};
      event.data = retsocket.toReceive;
      retsocket.toReceive = "";
      handler(event);
    }
  };
  wssocket.onmessage = onmessage;

  retsocket.isSending = false;
  retsocket.sendList = [];
  retsocket.monitor = function() {
    if (!retsocket.isSending) {
      if (retsocket.sendList.length > 0) {
        retsocket.send(retsocket.sendList.pop());
      }
    }
    setTimeout(retsocket.monitor, 1000);
  };
  // TODO: we don't need monitor at all?
  retsocket.monitor();
  retsocket.send = function(str) {
    if (retsocket.isSending) {
      retsocket.sendList.push(str);
      return;
    }
    if (str.length > 1024) {
      retsocket.isSending = true;
      retsocket.toSend = str.substr(1024);
      var obj = {};
      obj.isSegment = true;
      obj.data = str.substr(0, 1024);
      wssocket.send(JSON.stringify(obj));
    } else
      wssocket.send(str);
  };
  retsocket.sendNextSegment = function() {
    var str = retsocket.toSend;
    if (str.length > 1024) {
      retsocket.toSend = str.substr(1024);
      var obj = {};
      obj.isSegment = true;
      obj.data = str.substr(0, 1024);
      wssocket.send(JSON.stringify(obj));
    } else {
      retsocket.toSend = "";
      var obj = {};
      obj.isSegment = false;
      obj.data = str;
      wssocket.send(JSON.stringify(obj));
      retsocket.isSending = false;
      if (retsocket.sendList.length > 0) {
        retsocket.send(retsocket.sendList.pop());
      }
    }
  };
  retsocket.isOpen = function() {
    return wssocket.readyState;
  }
  retsocket.addHandler = function(handler) {
    retsocket.handlerList.push(handler);
  }
  return retsocket;
};


var aesDecrypt = function(data) {
  data = cryptico.b64to256(data);
  var encryptedBlocks = cryptico.string2bytes(data);
  var exkey = global.aesKey.slice(0);
  aes.ExpandKey(exkey);
  aes.Decrypt(encryptedBlocks, exkey);
  return cryptico.bytes2string(encryptedBlocks);

};
var aesEncrypt = function(data, aesKey) {
  var key = aesKey;
  var exkey = key.slice(0);
  aes.ExpandKey(exkey);
  var blocks = my.string2bytes(data);
  blocks = my.pad16(blocks);
  aes.Encrypt(blocks, exkey);
  ciphertext = cryptico.bytes2string(blocks);
  ciphertext = cryptico.b256to64(ciphertext);
  return ciphertext;
};
var rsaEncrypt = function(data, rsaKey) {
  var rsa = new RSAKey();
  rsa.setPublic(rsaKey.n, rsaKey.e1);
  var result = rsa.encrypt(data);
  return result;
};
var loadRSAKey = function(rsaKey) {
  var str = cryptico.b64to256(rsaKey);
  str = str.split(",");
  var ret = {};
  ret.n = str[0];
  ret.e1 = str[1];
  ret.e2 = str[2];
  return ret;
};
var testRSA = function() {
  pubKey = loadRSAKey(global.privKey);
  reqContent = {};
  reqContent.action = "main";
  reqContent.arg = "[{\"score\":20},{\"score\":20}]";
  reqContent.contractID = "abc";
  eReq = encryptReq(reqContent, pubKey);
  url = "http://localhost:8080/SCIDE/SCManager?action=executeContractEncrypted&contractRequest=" +
    encodeURIComponent(JSON.stringify(eReq));
};

var encryptReq = function(reqContent, pubKey) {
  // global.pubKey = loadRSAKey(global.privKey);
  var aes = {};
  aes.key = cryptico.generateAESKey();
  var aesObj = JSON.stringify(aes);
  var rsa = new RSAKey();
  rsa.setPrivate(pubKey.n, pubKey.e1, pubKey.e2);
  var encrypedReq = {};
  encrypedReq.action = rsa.decrypt(aesObj);
  encrypedReq.contractID = reqContent.contractID;
  reqContent.contractID = undefined;
  encrypedReq.arg = JSON.stringify(reqContent);
  encrypedReq.arg = aesEncrypt(encrypedReq.arg, aes.key);
  encrypedReq.requester = pubKey.n + "," + pubKey.e1 + "," + "0";
  encrypedReq.requester = cryptico.b256to64(encrypedReq.requester);
  return encrypedReq;
};

export function onExecuteResultInternal(data) {
  console.log(data, "onExecuteResultInternal");
  global.executeResult = JSON.parse(data.data);
  var reqId = data.responseID;
  var callback = global.cbs[data.responseID];
  if (callback != undefined) {
    callback(global.executeResult, data);
  }
};
window.executeContract = function(contractID, method, strarg, cb) {
  // var sm2Key = global.sm2Key;
  var request = {};
  request.action = "executeContract";
  request.requestID = new Date().getTime() + "_" +
    Math.floor(Math.random() * 10000);
  var res = store.getters.pubKey.split(",")
  // if (store.getters.contractKey !== '' && store.getters.contractKey !== undefined)
  //   res = store.getters.contractKey.split(",")
  global.cbs[request.requestID] = cb;
  request.contractID = contractID;
  request.operation = method;
  request.arg = strarg;
  request.pubkey = res[0];
  request.signature = sm2.doSignature(request.contractID + "|" +
    method + "|" + strarg + "|" + res[0],
    res[1]);

  if (sm2Key == undefined) {

    // request.pubkey = "04e559f40ad2449d02b3c40d7a18d7c625fd75560f96a43ba2c979631c8a0366e622fdc9440d71b14b4b108e22891f32ad73383eab4b3b164864b6d4d7b788eca5";

    // request.signature = sm2.doSignature(request.contractID + "|" +
    //   method + "|" + strarg + "|" + sm2Key.publicKey,
    //   "05effe8a0f89bcb5a3cc5303fc21b5ee4cea43702b15bc78c0ca583b4c0ee3f4");
  }
  global.wssocket.send(JSON.stringify(request));
};
window.listProjects = function(isPrivate) {
  var request = {};
  var res = store.getters.pubKey.split(",")
  request.action = "listProjects";
  if (isPrivate) {
    request.isPrivate = true
    request.pubKey = res[0];
  }
  wssocket.send(JSON.stringify(request));
}
window.generateMySQLProject = function(args, fieldList) {
  var request = {}
  request.action = "generateMySQLProject"
  request.contractName = args.contractName
  var res = store.getters.pubKey.split(",")
  request.publicKey = res[0]
  console.log(res[0], res[1])
  request.defaultAccept = true
  if (args.defaultAccept === '2')
    request.defaultAccept = false
  request.tableName = args.tableName
  request.dbUserName = args.dbUserName
  request.dbUrl = args.dbUrl
  request.dbPWD = args.dbPWD
  request.fieldList = fieldList
  // request.fieldDescList = [""]
  request.accessPolicy = args.accessPolicy
  request.basicInfo = {
    type: args.type,
    name: args.contractName
  }
  // request.defaultAccept = args.defaultAccept
  request.requestID = new Date().getTime() + "_" +
    Math.floor(Math.random() * 10000);
  global.wssocket.send(JSON.stringify(request));
}

window.generateCSVProject = function(args, fieldList) {
  var request = {}
  request.action = "generateCSVProject"
  request.contractName = args.contractName
  var res = store.getters.pubKey.split(",")
  request.publicKey = res[0]
  console.log(res[0], res[1])
  request.isPrivate = args.isPrivate
  // request.fieldList = fieldList
  request.accessPolicy = args.accessPolicy
  request.base64EncodedData = args.base64EncodedData
  // request.basicInfo = {
  //   type: args.type,
  //   name: args.contractName
  // }
  request.defaultAccept = true
  if (args.defaultAccept === '2')
    request.defaultAccept = false
  request.requestID = new Date().getTime() + "_" +
    Math.floor(Math.random() * 10000);
  global.wssocket.send(JSON.stringify(request));
}
window.startContract = function(contractName) {
  var request = {}
  request.action = "startContract"
  request.isPrivate = true
  request.requestID = new Date().getTime() + "_" +
    Math.floor(Math.random() * 10000);
  var res = store.getters.contractKey.split(",")
  request.owner = res[0];
  request.script = "empty";
  // request.path = "/" + contractName + '_' + contractName + + "/manifest.json";
  request.path = "/" + contractName + "/manifest.json";
  request.signature = sm2.doSignature("Fixed|" + request.path + "|" + res[0], res[1]);
  global.wssocket.send(JSON.stringify(request));
}
window.killContractProcess = function(contractid) {
  var request = {}
  request.action = "killContractProcess";
  request.id = contractid;
  request.requestID = new Date().getTime() + "";
  wssocket.send(JSON.stringify(request));
}
window.listContractProcess = function() {
  var request = {}
  request.action = "listContractProcess"
  global.wssocket.send(JSON.stringify(request));
}
window.listAllContractProcess = function() {
  var request = {}
  request.action = "listAllContractProcess"
  global.wssocket.send(JSON.stringify(request));
}
window.executeCurrentContract = function(method, strarg, cb) {
  var contract = global.currentContract;
  executeContract(contract.id, method, strarg, cb);
};
// 删除合约实例
window.deleteFile = function(contractName) {
  var request = {}
  request.action = "deleteFile"
  request.id = contractName
  // request.isPrivate = true
  global.wssocket.send(JSON.stringify(request))
}
// 删除合约之前要先停止
window.stopContract = function(contractName) {
  var request = {}
  request.action = "stopContract"
  request.file = contractName
  // request.isPrivate = true
  global.wssocket.send(JSON.stringify(request))
}

window.loadBDWareWebSDK = function(url, onopen, handler) {
  if (window.global == undefined) {
    window.global = {};
  }
  if (global.sm2Key == undefined) {
    if (sm2 != undefined)
      global.sm2Key = sm2.generateKeyPairHex();
  }
  if (global.cbs == undefined) {
    global.cbs = {};
  }
  if (global.wssocket == undefined) {
    global.wssocket = createWssocket(url, onopen, function(event, wss) {
      var data = event.data;
      var obj = JSON.parse(data);
      switch (obj.action) {
        case 'onExecuteResult':
          onExecuteResultInternal(obj);
        default:
      }
      handler(event, global.wssocket);
    });
  } else {
    if (onopen != undefined)
      onopen();
    global.wssocket.addHandler(handler);
  }
};

window.countContractLogGroupByCategory = function(start, end, interval, category) {
  // console.log('window.countContractLogGroupByCategory')
  var request = {}
  request.action = "countContractLogGroupByCategory"
  request.start = start
  if (end !== 0)
    request.end = end
  if (interval !== 0)
    request.interval = interval
  if (category !== '')
    request.category = category
  global.wssocket.send(JSON.stringify(request));
}

window.queryContractLogByDate = function(start, end, category) {
  // console.log('window.queryContractLogByDate')
  var request = {}
  request.action = "queryContractLogByDate"
  request.start = start
  request.end = end
  if (category !== '')
    request.category = category
  global.wssocket.send(JSON.stringify(request));
}

window.queryContractLogByOffset = function(count, offset, contractName) {
  // console.log('window.queryContractLogByOffset')
  var request = {}
  request.action = "queryContractLogByOffset"
  request.count = count
  if (offset !== 0)
    request.offset = offset
  if (contractName !== '')
    request.category = contractName
  global.wssocket.send(JSON.stringify(request));
}

// Usage:
// Approach 1:
// var url = "ws://" +
// document.location.host+(document.location.pathname.replace("scide.html",
// "SCExecutor"));
// global.wssocket = createWssocket(url, WSHandler);

// Approach 2:
// loadBDWareWebSDK(url,function(){},WSHandler);
// global.currentContract = {'id':'DataAnalysisSample'};
// executeContract("contractID","methodName","arg",function(data){
// });
// executeCurrentContract("methodName","arg",function(data){
// });
// the bdware client won't call this method
