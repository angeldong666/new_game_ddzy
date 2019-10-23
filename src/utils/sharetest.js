import sha1 from 'js-sha1'
import { wxshare } from './wxshare.js'

const calcSignature = (ticket, noncestr, ts, url) => {
  const str = 'jsapi_ticket=' + ticket + '&noncestr=' + noncestr + '&timestamp=' + ts + '&url=' + url
  let shaObj = sha1(str)
  return shaObj
}

const createNonceStr = () => {
  return Math.random().toString(36).substr(2, 15)
}

const createTimeStamp = () => {
  return parseInt(new Date().getTime() / 1000) + ''
}
const once = () => {
  const _ticket = 'sM4AOVdWfPE4DxkXGEs8VDb48MXewzuphGPjcj-yCEwqRVazWeNAMHIBaCloqEUDFGqm0Xxv2e1JsnzxioYqdA'
  const url = window.location.href.split('#')[0]
  this.timestamp = this.timestamp || createTimeStamp()
  this.nonceStr = this.nonceStr || createNonceStr()
  this.signature = this.signature || calcSignature(_ticket, this.nonceStr, this.timestamp, url)
  return this
}
export const tmpTools = (data) => {
  let shareObj = {}
  shareObj.title = data.title
  shareObj.desc = data.desc
  shareObj.link = data.link
  shareObj.imgUrl = data.imgUrl
  // const _ticket = 'sM4AOVdWfPE4DxkXGEs8VDb48MXewzuphGPjcj-yCEwqRVazWeNAMHIBaCloqEUDFGqm0Xxv2e1JsnzxioYqdA'
  // const url = window.location.href.split('#')[0]
  // shareObj.timestamp = createTimeStamp()
  // shareObj.nonceStr = createNonceStr()
  // // const signs = 'jsapi_ticket=' + jsapi_ticket + '&noncestr=' + shareObj.nonceStr + '&timestamp=' + shareObj.timestamp + '&url=' + url

  // shareObj.signature = calcSignature(_ticket, shareObj.nonceStr, shareObj.timestamp, url)
  let _tmp = once()
  shareObj.timestamp = _tmp.timestamp
  shareObj.nonceStr = _tmp.nonceStr
  shareObj.signature = _tmp.signature
  console.log(shareObj.timestamp, shareObj.nonceStr, shareObj.signature)
  // console.log(shareObj)
  // window.alert(shareObj.timestamp + '\n' + shareObj.nonceStr + '\n' + shareObj.signature)
  wxshare(shareObj)
}
