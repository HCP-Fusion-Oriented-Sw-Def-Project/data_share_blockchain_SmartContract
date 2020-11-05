import $ from 'jquery'

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
    url: 'https://trybaas.internetapi.cn/api/apps/61830b9d-2cbe-4afb-9247-2e7a1c325994/contracts',
    method: 'GET',
    timeout: '0',
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json, text/plain, */*',
      'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6,zh-TW;q=0.5',
      'authorization': 'Bearer ' + token,
    },
  })
}
