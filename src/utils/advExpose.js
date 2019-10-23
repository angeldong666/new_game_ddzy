/**
 * 广告统计代码用
 * @type {[type]}
 */
import Vue from 'vue'
import { advExposeApi } from '../config/api'

// 发送间隔，2s
const TIME_INTERVAL = 2000
let _timer = null

let _agidList = ''

// 发送数据
const sendAdvData = () => {
  if (_agidList === '') {
    return
  }
  let _params = {
    // url: encodeURIComponent(window.location.host + window.location.pathname),
    url: encodeURIComponent(window.location.pathname + window.location.search),
    pt: 1,
    // 广告统计用
    // adv_goods_id: _agidList.substr(0, _agidList.length - 1)
    ids: _agidList.substr(0, _agidList.length - 1)
  }
  console.log(_params)
  // 本地测试
  if (window.location.host.indexOf(':8080') != -1) {
    console.log(`本地测试,状态还原，否则只会console一次`)
    resetState()
    return
  }
  // 发送数据
  Vue.prototype.$http.get(advExposeApi, {params: _params}).then(function (response) {
    const _data = response.data
    if (_data.code === 1) {
      console.log('====统计发送成功====')
    }
  }, function (response) {
    console.log(response)
  })
  // 还原状态
  resetState()
}

const resetState = () => {
  _timer = null
  _agidList = ''
}

/**
 * 广告统计代码
 * @param  {[type]} agid  广告商品ID，可以用半角逗号分隔开
 * @return {[type]}       [description]
 */
export const advExpose = (agid) => {
  if (agid == '' || agid == 0) {
    return
  }
  _agidList += agid + ','
  // 添加计时器
  if (_timer === null) {
    _timer = setTimeout(() => {
      sendAdvData()
    }, TIME_INTERVAL)
  }
}
