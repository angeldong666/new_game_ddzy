import appSuport from './appSuport'
import Vue from 'vue'
import getDomain from './domain'
import { domainJson } from 'src/config/api.js'
import axios from 'src/config/http.js'
import { getDomainName } from 'src/utils/domain_tools'

// if (!Vue.prototype.$http) {
//   Vue.prototype.$http = axios
// }

// let isApp = false
// const LOCAL_DOMAIN = getDomainName()
// let _list = []

// // 获取需要替换的域名列表
// Vue.prototype.$http.get(domainJson).then((response) => {
//   _list = response.data.list
// }, (response) => {
//   // 默认数据
//   _list = ['0gowang.com', '0gow.com']
// })

// export const changeDomain = (url) => {
//   let _url = url
//   // 地址在替换列表内
//   if (_list.indexOf(LOCAL_DOMAIN) != -1) {
//     _list.forEach((item) => {
//       if (url.indexOf('.' + item) != -1 && item != LOCAL_DOMAIN) {
//         _url = url.replace('.' + item, '.' + LOCAL_DOMAIN)
//       }
//     })
//   }
//   return _url
// }

// // 跳转url
// export const urlManagerGoto = (url, uid) => {
//   if (!url) {
//     return
//   }
//   uid = uid || ''
//   isApp = appSuport.isApp()
//   let returnUrl = changeDomain(url)
//   if (isApp) {
//     appSuport.gotoUrl(returnUrl)
//   } else {
//     // 购物车跳转处理
//     if (returnUrl.indexOf('/cart/') != -1 && uid != '') {
//       // //www.0gowang.com/cart/
//       returnUrl = returnUrl + 'mycart?uid=' + uid + '&isAct=1'
//     }
//     console.log(returnUrl)
//     window.location.href = returnUrl
//   }
// }
