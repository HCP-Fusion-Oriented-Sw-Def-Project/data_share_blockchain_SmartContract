import $ from 'jquery'
// import axios from 'axios'
export function loginBaas() {
  return fetch('https://trybaas.internetapi.cn/api/auth/login', {
    headers: {
      'accept': 'application/json, text/plain, */*',
      'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6,zh-TW;q=0.5',
      'content-type': 'application/json;charset=UTF-8',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin'
    },
    referrer: 'https://trybaas.internetapi.cn/',
    referrerPolicy: 'strict-origin-when-cross-origin',
    body: JSON.stringify({ email: 'demo@bdware.org', password: 'test@123' }),
    method: 'POST',
    mode: 'cors'
  })
  // .then(response => response.headers.get('authorization'))
}

export function getList(token) {
  return $.ajax({
    url: 'https://trybaas.internetapi.cn/api/apps/ecffe8fc-6913-4f64-99ff-940a12937515/contracts',
    method: 'GET',
    // dataType: 'jsonp',
    // jsonp: 'callback', // 指定一个查询参数名称来覆盖默认的 jsonp 回调参数名 callback
    // jsonpCallback: 'handleResponse', // 设置回调函数名
    timeout: '0',
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json, text/plain, */*',
      'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6,zh-TW;q=0.5',
      'authorization': 'Bearer ' + token,
    },
    // success: function(response, status, xhr) {
    //   console.log('状态为：' + status + ',状态是：' + xhr.statusText)
    //   console.log(response)
    // }
  })
}
// export function getList(token) {
//   return axios.get('https://trybaas.internetapi.cn/api/apps/ecffe8fc-6913-4f64-99ff-940a12937515/contracts', {
//     headers: {
//       'Content-Type': 'application/json',
//       'accept': 'application/json, text/plain, */*',
//       'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6,zh-TW;q=0.5',
//       'authorization': 'Bearer ' + token,
//     },
//   })
// }
