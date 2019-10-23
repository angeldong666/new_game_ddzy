import Vue from 'vue'
// import { shareApi } from '../config/api.js'
import wx from 'weixin-js-sdk'

// let isProd = process.env.NODE_ENV === 'production'

/*
 * 微信分享
 * 切换路由需要更换分享内容时需要重新wx.config
 */
const wxshare = (shareObj, successFun) => {
  // alert(JSON.stringify(shareObj))
  wx.config({
    debug: false,
    appId: shareObj.appId,
    timestamp: shareObj.timestamp,
    nonceStr: shareObj.nonceStr,
    signature: shareObj.signature,
    jsApiList: [
      'checkJsApi',
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareWeibo',
      'hideMenuItems',
      'showMenuItems',
      'hideAllNonBaseMenuItem',
      'showAllNonBaseMenuItem',
      'translateVoice',
      'startRecord',
      'stopRecord',
      'onRecordEnd',
      'playVoice',
      'pauseVoice',
      'stopVoice',
      'uploadVoice',
      'downloadVoice',
      'chooseImage',
      'previewImage',
      'uploadImage',
      'downloadImage',
      'getNetworkType',
      'openLocation',
      'getLocation',
      'hideOptionMenu',
      'showOptionMenu',
      'closeWindow',
      'scanQRCode',
      'chooseWXPay',
      'openProductSpecificView',
      'addCard',
      'chooseCard',
      'openCard'
    ]
  })
  wx.ready(function () {
    wx.onMenuShareAppMessage({
      title: shareObj.title,
      desc: shareObj.desc,
      link: shareObj.link,
      imgUrl: shareObj.imgUrl,
      trigger: function (res) {
        // alert('用户点击发送给朋友');
      },
      success: function (res) {
        // alert('已分享');
        successFun && successFun()
      },
      cancel: function (res) {
        // alert('已取消');
      },
      fail: function (res) {
        // alert(JSON.stringify(res));
      }
    })

    wx.onMenuShareTimeline({
      title: shareObj.title,
      desc: shareObj.desc,
      link: shareObj.link,
      imgUrl: shareObj.imgUrl,
      success: function () {
        successFun && successFun()
      },
      cancel: function () {
        // alert('取消');
      }
    })
  })
}

export const setShareData = (data, successFun) => {
  // if (!isProd) {
  //   // console.log(data)
  //   return
  // }
  // alert(JSON.stringify(data))
  let shareObj = {}
  shareObj.title = data.title
  shareObj.desc = data.desc
  shareObj.link = data.link
  shareObj.imgUrl = data.imgUrl
  shareObj.appId = data.appid
  shareObj.timestamp =data.timestamp
  shareObj.nonceStr = data.noncestr
  shareObj.signature = data.signature
  wxshare(shareObj, successFun)
  // ===========TODO===========
  // 同一个路由只需要请求一次数据即可，验证的时效性有待考察
  // Vue.prototype.$http.get(shareApi.jsshare, {params: {
  //   url: window.location.href.split('#')[0]
  // }}).then(function (response) {
  //   const _data = response.data
  //   if (_data.code === 1) {
  //     shareObj.appId = _data.data.appId
  //     shareObj.timestamp = _data.data.timestamp
  //     shareObj.nonceStr = _data.data.nonceStr
  //     shareObj.signature = _data.data.signature
  //   }
  //   console.log(shareObj)
  // }, function (response) {
  //   console.log(response)
  // })
  // console.log(shareObj)
  // window.alert(shareObj.timestamp + '\n' + shareObj.nonceStr + '\n' + shareObj.signature)
  // wxshare(shareObj)
}
export const wxshareDis = ()=>{
      /* begin禁用微信分享功能 */
      function onBridgeReady() {
          WeixinJSBridge.call('hideOptionMenu');
      }

      if (typeof WeixinJSBridge == "undefined") {
          if (document.addEventListener) {
              document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
          } else if (document.attachEvent) {
              document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
              document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
          }
      } else {
          onBridgeReady();
      }
      /* end禁用微信分享功能 */
}