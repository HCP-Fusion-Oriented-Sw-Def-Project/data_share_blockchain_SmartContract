/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * @param {string} input value
 * @returns {number} output value
 */
export function byteLength(str) {
  // returns the byte length of an utf8 string
  let s = str.length
  for (var i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) s++
    else if (code > 0x7ff && code <= 0xffff) s += 2
    if (code >= 0xDC00 && code <= 0xDFFF) i--
  }
  return s
}

/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function param(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}

/**
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

/**
 * @param {string} type
 * @returns {Date}
 */
export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

/**
 * @returns {string}
 */
export function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}


const alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
export default {
  getCsvFromFile(f) {


  },
  generateHeaders(len) {

    var res = alphabets.slice(0, len);
    for (var i = 0; i < alphabets.length && res.length < len; ++i) {
      for (var j = 0; j < alphabets.length && res.length < len; ++j) {
        res.push(alphabets[i] + alphabets[j]);
      }
    }
    return res;
  },

  hsv_to_rgb(h, s, v) {
    let h_i = parseInt(h * 6);
    let f = h * 6 - h_i;
    let p = v * (1 - s);
    let q = v * (1 - f * s);
    let t = v * (1 - (1 - f) * s);
    let r = 0, g = 0, b = 0;
    if (h_i === 0) {
      r = v;
      g = t;
      b = p;
    } else if (h_i === 1) {
      r = q;
      g = v;
      b = p;
    } else if (h_i === 2) {
      r = p;
      g = v;
      b = t;
    } else if (h_i === 3) {
      r = p;
      g = q;
      b = v;
    } else if (h_i === 4) {
      r = t;
      g = p;
      b = v;
    } else if (h_i === 5) {
      r = v;
      g = p;
      b = q;
    }
    return 'rgb(' + parseInt(r * 256) + ',' + parseInt(g * 256) + ',' + parseInt(b * 256) + ')';

  },
  //颜色对象
  getRandomColor(colorNum) {
    let golden_ratio_conjugate = 0.618033988749895;
    let res = [];
    for (let i = 0; i < colorNum; ++i) {
      let h = (Math.random() + golden_ratio_conjugate) % 1;
      res.push(this.hsv_to_rgb(h, 0.5, 0.95));
    }

    return res;
  },

  getObjectValue(obj) {
    return Object.keys(obj).map(key => obj[key]);
  },

  getObjectValueExcept(obj, xset) {
    if (xset === null || xset === undefined) {
      return Object.keys(obj).map(key => obj[key]);
    }
    let keys = Object.keys(obj);
    let value = [];
    keys.forEach((v, i) => {
      if (xset.indexOf(v) < 0) {
        value.push(obj[v]);
      }
    });
    return value;
  },
  countNumberLength(num) {
    // x = Number(String(num).replace(/[^0-9]/g, ''));
    // return (Math.log10((x ^ (x >> 31)) - (x >> 31)) | 0) + 1;
    return num.toString().length;
  },

  guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  },

  serverDataToClientData(data) {
    let headers = this.generateHeaders(data[0].data.length);
    let rows = data.map(row => {
      let nrow = {id: row.id};
      console.log(row.id)
      headers.forEach((v, i) => {
        console.log(v)
        nrow[v] = row.data[i];
      });
      return nrow;
    });
    return {headers: headers, rows: rows};
  },

  // 归并排序(过程：从下向上)
  mergeSort(arr, index, order) {
    if (!Array.isArray(arr)) return [];
    var index = Array.isArray(index) ? index : [];
    // 对数组arr做若干次合并：数组arr的总长度为len，将它分为若干个长度为gap的子数组；
    // 将"每2个相邻的子数组" 进行合并排序。
    // len = 数组的长度，gap = 子数组的长度
    function mergeGroups(arr, len, gap) {
      // 对arr[0..len)做一趟归并排序
      // 将"每2个相邻的子数组"进行合并排序
      for (var i = 0; i + 2 * gap - 1 < len; i += gap * 2) {
        merge(arr, i, i + gap - 1, i + 2 * gap - 1);  // 归并长度为len的两个相邻子数组
      }
      // 注意：
      // 若i ≤ len - 1且i + gap - 1 ≥ len - 1时，则剩余一个子数组轮空，无须归并
      // 若i + gap - 1 < len - 1，则剩余一个子数组没有配对
      // 将该子数组合并到已排序的数组中
      if (i + gap - 1 < len - 1) {                              // 尚有两个子文件，其中后一个长度小于len - 1
        merge(arr, i, i + gap - 1, len - 1);           // 归并最后两个子数组
      }
    }

    // 核心排序过程
    function merge(arr, start, mid, end) {
      var i = start;      // 第1个有序区的索引，遍历区间是：arr数组中的[start..mid]
      var j = mid + 1;    // 第2个有序区的索引，遍历区间是：arr数组中的[mid + 1..end]
      var aTmp = [];     // 汇总2个有序区临时数组
      var kTmp = [];
      var isAsc = (order + '').toLowerCase() !== 'desc';
      /* 排序过程开始 */
      while (i <= mid && j <= end) {   // 遍历2个有序区，当该while循环终止时，2个有序区必然有1个已经遍历并排序完毕
        if ((!isAsc && arr[i] <= arr[j]) || (isAsc && arr[i] >= arr[j])) {  // 并逐个从2个有序区分别取1个数进行比较，将较小的数存到临时数组aTmp中
          aTmp.push(arr[i]);
          kTmp.push(index[i++]);
        } else {
          aTmp.push(arr[j]);
          kTmp.push(index[j++]);
        }
      }
      // 将剩余有序区的剩余元素添加到临时数组aTmp中
      while (i <= mid) {
        aTmp.push(arr[i]);
        kTmp.push(index[i++]);
      }
      while (j <= end) {
        aTmp.push(arr[j]);
        kTmp.push(index[j++]);
      }
      /*排序过程结束*/
      var len = aTmp.length, k;
      // 此时，aTmp数组是经过排序后的有序数列，然后将其重新整合到数组arr中
      for (k = 0; k < len; k++) {
        arr[start + k] = aTmp[k];
        index[start + k] = kTmp[k];
      }
    }

    // 归并排序(从下往上)
    return (function (arr) {
      // 采用自底向上的方法，对arr[0..len)进行二路归并排序
      var len = arr.length;
      if (len <= 0) return arr;
      for (var i = 1; i < len; i *= 2) {   // 共log2(len - 1)趟归并
        mergeGroups(arr, len, i);        // 有序段长度 ≥ len时终止
      }
    })(arr);

  },

  contractDataTOJSON(data) {
    let res = JSON.parse(data);
    res = JSON.parse(data.result);
    return res;
  }


}

/**
 *Created by hanhuaxu on 19/9/6.
 */

export function createRandomId() {
  return (Math.random()*10000000).toString(16).substr(0,4)+'-'+(new Date()).getTime()+'-'+Math.random().toString().substr(2,5);
}



//缩放数据到指定范围
export  function dataArrayScale(dataArray, rangeMin, rangeMax) {
  let min = dataArray[0];
  let max = dataArray[0];
  for (let data of dataArray) {
    max = Math.max(max, data);
    min = Math.min(min, data);
  }
  return dataArray.map((value) =>{
    if (max === min){
      return rangeMin;
    }else {
      return (value-min)/(max-min) * (rangeMax-rangeMin) + rangeMin;
    }
  });
}