/* 常用工具 */
import { loginUrl } from '../config/api'

// 对象是否为空
export const isEmptyObj = (obj) => {
  for(var key in obj) {
    if(obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

// 获取url参数
export const getQueryString = (name) => {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  let r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}

//获取字符串url中的参数
export const getUrlString = (url,name) => {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    let r = url.split('?')[1].match(reg);
    if (r != null) return unescape(r[2])
    return null
}
// 获取url参数
export const getQueryAll = () => {
  let url = location.search
  let theRequest = new Object()
  if (url.indexOf('?') != -1) {
    let str = url.substr(1)
    let strs = str.split('&')
    for(let i = 0; i < strs.length; i ++) {
      theRequest[strs[i].split('=')[0]] = decodeURI(strs[i].split('=')[1])
    }
  }
  return theRequest;
}
// 返回上一页刷新
export const gobackRefresh = (cb) => {
  window.onpageshow = function(event) {
    if (event.persisted) {
      console.log('=======onpageshow=======')
      if (cb) {
        cb()
      } else {
        window.location.reload()
      }
    }
  };
}

// loading动画管理
export const showLoading = (status) => {
  document.getElementById('loading').style.display = status ? 'block' : 'none'
}

// 取页面url,添加token参数
export const mergeUrlToken = (path, query, token) => {
  let _href = window.location.href.split('#')[0] + '#' + path + '?'
  query.token = token
  for (let k in query) {
    _href += k + '=' + query[k] + '&'
  }
  // _href.substr(1)
  _href = _href.substring(0, _href.length - 1)
  let _url = loginUrl + encodeURIComponent(encodeURIComponent(_href))
  return _url
}

// 自定义url，添加token参数
export const mergeShareUrl = (url, path, query, token) => {
  // let _href = window.location.href.split('#')[0] + '#' + path + '?'
  let _href = url + '#' + path + '?'
  query.token = token
  for (let k in query) {
    _href += k + '=' + query[k] + '&'
  }
  // _href.substr(1)
  _href = _href.substring(0, _href.length - 1)
  console.log(_href)
  let _url = loginUrl + encodeURIComponent(encodeURIComponent(_href))
  return _url
}

// url添加token参数
export const getPtShare = (routername, params) => {
  params = params || {}
  let _url = window.location.origin + window.location.pathname + '?isFromWx=1&type=25&'
  switch (routername) {
    case 'subjects':
      params.source = 'object'
      break;
    case 'subject':
      params.source = 'subjectinfo'
      break;
    case 'ptgoods':
      params.source = 'ptgoods'
      break;
    default:
      params.source = 'index'
      break;
  }
  for (let k in params) {
    _url += k + '=' + params[k] + '&'
  }
  _url = _url.substring(0, _url.length - 1)
  return _url
}
/**
 * 兼容微信设置页面的title
 */
export const setDocumentTitle = (title) => {
  document.title = title
  let ua = navigator.userAgent
  if (/\bMicroMessenger\/([\d.]+)/.test(ua) && /ip(hone|od|ad)/i.test(ua)) {
    var i = document.createElement('iframe')
    i.src = '/favicon.ico'
    i.style.display = 'none'
    i.onload = function () {
      setTimeout(function () {
        i.remove()
      }, 10)
    }
    document.body.appendChild(i)
  }
}


/**
 * 数组随机
 */
export const randomArray = (array, num) => {
  let _arr = array
  let _temp = []
  let _result = []
  let _len = _arr.length
  let n = num < _len ? num : _len
  while (n-- > 0) {
    let _index = Math.random() * _len | 0
    _result[n] = _temp[_index] || _arr[_index]
    --_len
    _temp[_index] = _temp[_len] || _arr[_len]
  }
  return _result
}

/**
 * 货币格式过滤为xx.xx，补全小数点后00
 */
export const currency = (value, currency, decimals) => {
  const digitsRE = /(\d{3})(?=\d)/g
  value = parseFloat(value)
  if (!isFinite(value) || (!value && value !== 0)) return ''
  currency = currency != null ? currency : '¥'
  decimals = decimals != null ? decimals : 2
  const stringified = Math.abs(value).toFixed(decimals)
  const _int = decimals ? stringified.slice(0, -1 - decimals) : stringified
  const i = _int.length % 3
  const head = i > 0 ? (_int.slice(0, i) + (_int.length > 3 ? ',' : '')) : ''
  const _float = decimals ? stringified.slice(-1 - decimals) : ''
  const sign = value < 0 ? '-' : ''
  return sign + currency + head + _int.slice(i).replace(digitsRE, '$1,') + _float
}

/**
 * 销量数据处理，超过1万显示x.x万，超过10w显示xx万
 */
export const saleCount = (val) => {
  const _num = parseInt(val) || 0
  if (_num >= 100000) {
    return (_num / 100000).toFixed(0) + '万'
  } else if (_num >= 10000) {
    return (_num / 10000).toFixed(1) + '万'
  } else {
    return _num
  }
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
function find (list, f) {
  return list.filter(f)[0]
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
export function deepCopy (obj, cache = []) {
  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  const hit = find(cache, c => c.original === obj)
  if (hit) {
    return hit.copy
  }

  const copy = Array.isArray(obj) ? [] : {}
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy
  })

  Object.keys(obj).forEach(key => {
    copy[key] = deepCopy(obj[key], cache)
  })

  return copy
}
/*
* 判断是否微信端浏览器
*
*/
export const isWeiXin = ()=> {
    var ua = window.navigator.userAgent.toLowerCase();
    //console.log(ua);
    // mozilla/5.0 (iphone; cpu iphone os 9_1 like mac os x) applewebkit/601.1.46 (khtml, like gecko)version/9.0 mobile/13b143 safari/601.1
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}
/**
 * js将http的资源换成https的
 */
export const imgHttpsSrc = function (imgUrl) {
  if (!imgUrl || typeof(imgUrl) != 'string'  || imgUrl == '' || imgUrl.replace(/^\s+|\s+$/g,'') == '') {
    return ''
  }
  const httpsMap = {
    '//idux3ew.qiniudns.com': '//ojn8uqheg.qnssl.com',
    '//iduxm45.qiniudns.com': '//ojn8uqheg.qnssl.com',
    '//iduxf21.qiniudns.com': '//ojn89n2tq.qnssl.com',
    '//7xo3u7.com1.z0.glb.clouddn.com': '//ojn98tluc.qnssl.com',
    '//7xo3u7.v1.com.z0.glb.qiniudns.com': '//ojn98tluc.qnssl.com',
    '//iduvlp1.qiniudns.com': '//ojn81nujc.qnssl.com',
    '//iduvlp2.qiniudns.com': '//ojn9dd5la.qnssl.com',
    '//iduwq5z.qiniudns.com': '//ojn8rdkav.qnssl.com',
    '//iduwky2.qiniudns.com': '//ojn89n2tq.qnssl.com',
    '//7xp28h.com1.z0.glb.clouddn.com': '//ojn89n2tq.qnssl.com',
    '//7xog32.com1.z0.glb.clouddn.com': '//ojn81nujc.qnssl.com',
    '//7xp9pg.com1.z0.glb.clouddn.com': '//ojn9dd5la.qnssl.com',
    '//7xt1hu.com1.z0.glb.clouddn.com': '//ojn8rdkav.qnssl.com',
    '//7xt1hu.com2.z0.glb.clouddn.com': '//ojn8rdkav.qnssl.com',
    '//7xt1hu.com2.z0.glb.qiniucdn.com': '//ojn8rdkav.qnssl.com',
    '//7xp5tt.com1.z0.glb.clouddn.com': '//oj1k43q6b.qnssl.com',
    '//o9o8tynkc.bkt.clouddn.com': '//oj1k5v8zt.qnssl.com',
    '//7xuy7v.com1.z0.glb.clouddn.com': '//ojn8uqheg.qnssl.com',
    '//7xuy7v.com2.z0.glb.clouddn.com': '//ojn8uqheg.qnssl.com',
    '//7xuy7v.com2.z0.glb.qiniucdn.com': '//ojn8uqheg.qnssl.com',
    // '//p.0gow.com': '//p.0gow.com',
    '//p1.0gow.com': '//ojn89n2tq.qnssl.com',
    // '//p2.0gow.com': '//p2.0gow.com',
    '//p3.0gow.com': '//ojn98tluc.qnssl.com',
    '//p4.0gow.com': '//ojn81nujc.qnssl.com',
    '//p5.0gow.com': '//ojn9dd5la.qnssl.com',
    '//p5.0gowang.com': '//ojn9dd5la.qnssl.com',
    // '//p6.0gow.com': '//p6.0gow.com',
    '//p7.0gow.com': '//ojn8rdkav.qnssl.com',
    '//p8.0gow.com': '//ojn89n2tq.qnssl.com',
    // '//ojn8uqheg.qnssl.com': '//ojn8uqheg.qnssl.com',
    // '//ojn89n2tq.qnssl.com': '//ojn89n2tq.qnssl.com',
    // '//ojn98tluc.qnssl.com': '//ojn98tluc.qnssl.com',
    // '//ojn81nujc.qnssl.com': '//ojn81nujc.qnssl.com',
    // '//ojn9dd5la.qnssl.com': '//ojn9dd5la.qnssl.com',
    // '//ojn8rdkav.qnssl.com': '//ojn8rdkav.qnssl.com',
    // '//oj1k43q6b.qnssl.com': '//oj1k43q6b.qnssl.com',
    // '//oj1k5v8zt.qnssl.com': '//oj1k5v8zt.qnssl.com',
  }
  const HTTP_HEAD = /http(s)?:+/gi
  imgUrl = imgUrl.replace(HTTP_HEAD, '')
  // 遍历数组比较
  // 这个比下面的执行效率快一些
  for (var k in httpsMap) {
    if (imgUrl.indexOf(k) !== -1) {
      var val = httpsMap[k];
      var regExp = new RegExp(k, 'gim')
      imgUrl = imgUrl.replace(regExp, val)
    }
  }
  // 获取域名
  // const hostname = imgUrl.match(/\/\/[^\/\?#:]+/)[0]
  // if (httpsMap[hostname]) {
  //   var val = httpsMap[hostname];
  //   var regExp = new RegExp(hostname, 'gim')
  //   imgUrl = imgUrl.replace(regExp, val)
  // }

  // 七牛优化
  const isCDN = /qnssl.com/gi
  if(imgUrl.indexOf('?imageMogr2/thumbnail/') !== -1 || imgUrl.indexOf('?imageMogr2/') !== -1){
    const QINIU_PARAM = /\/quality\/\d\d\/format\/(jp(e)?g|png|gif|webp)/gi
    imgUrl = imgUrl.replace(QINIU_PARAM, '$&|imageslim')
  } else if (isCDN.test(imgUrl)) {
    const QINIU_PARAM = /.(jp(e)?g|png|gif|webp)/gi
    imgUrl = imgUrl.replace(QINIU_PARAM, '$&?imageslim')
    // imgUrl += '?imageslim'
  }
  return imgUrl
}
/*将uid转换为token*/
export const uidToToken = (uid)=> {
  if(parseInt(uid)){
    return parseInt(uid).toString(16);
  }
};

