/**
 * app唤醒
 * @Author   JHX
 * @DateTime 2017-09-19T13:44:14+0800
 * @return   {[type]}                 [description]
 */
/* 常用工具 */
import { getQueryString, getQueryAll } from './utils'

const isProd = process.env.NODE_ENV === 'production'

let openType = 0
let openParams = {}
let openValue = ''
export const TYPE = {
  OPEN_TYPE_PT: 25, // 拼团
  OPEN_WEBSITE_URL: 106, // 远程 URL
  OPEN_GOODS: 1, // 商品详情
}

export const openApp = (type, params) => {
  openType = type
  switch (type) {
    case TYPE.OPEN_TYPE_PT:
      openParams = params || {}
      console.log(openParams)
      break
    case TYPE.OPEN_WEBSITE_URL:
      openValue = params || ''
      console.log(openValue)
      break
    case TYPE.OPEN_GOODS:
      openValue = params || ''
      console.log(openValue)
      break
  }
  const jumpUrl = getPage();
  // if (!isProd) {
  //   console.log(jumpUrl)
  //   return
  // }

  window.location.href = jumpUrl;
}

//获取设备信息
function getMsg() {
  var msgString = navigator.userAgent;
  msgString = msgString.split(" ");
  var obj = {};
  var webkitIndex = getIndex("AppleWebKit", msgString);
  if (navigator.appVersion.indexOf("Android") != -1) {
    obj.platform = "Android";
    var arr = navigator.userAgent.split(";");
    obj.platformVersion = arr[getIndex("Android", arr)].split(" ")[2];
    obj.appleWebkit = msgString[webkitIndex].toString().split("/")[1];
    obj.screenWidth = screen.availWidth * devicePixelRatio;
    obj.screenHeight = screen.availHeight * devicePixelRatio;
  } else if (navigator.appVersion.indexOf("iPhone") != -1) {
    obj.platform = "iOS";
    var arr = navigator.userAgent.split(";");
    // console.log(arr[getIndex("iPhone OS", arr)].split(" "))
    var temp = arr[getIndex("iPhone OS", arr)].split(" ")[4].split("_");
    var version = '';
    var length = temp.length;
    temp.forEach(function(item, index) {
      version += item;
      if (index != length - 1) {
        version += ".";
      }
    })
    obj.appleWebkit = msgString[webkitIndex].toString().split("/")[1];
    obj.platformVersion = version;
    obj.screenWidth = screen.availWidth;
    obj.screenHeight = screen.availHeight;
  } else {
    obj.platform = "pc";
    obj.platformVersion = 0;
    obj.appleWebkit = 0;
    obj.screenWidth = 0;
    obj.screenHeight = 0;
  }
  return obj;

}

function getPage() {
  var obj = getMsg();
  var baseUrl = 'https://a2.meiyameiwang.cn/user/share/visit/?platform=' + obj.platform + '&platformVersion=' + obj.platformVersion + '&screenWidth=' + obj.screenWidth + '&screenHeight=' + obj.screenHeight + '&appleWebkit=' + obj.appleWebkit + '&data=';
  var _type = openType || getQueryString('type') || getQueryString('t');
  var _val = openValue || getQueryString('id') || getQueryString('val') || getQueryString('value') || getQueryString('v');
  var _title = BASE64.decode(decodeURI(getQueryString('title') || getQueryString('tit') || '').replace(new RegExp(' ', "g"), '+'), true) || '零购官网';
  var jumpUrl = baseUrl;
  var openUrl = 'namei0gow://' + (obj.platform == 'Android' ? 'start/?' : '');
  var _scid = getQueryString('scid') || 0;
  var _sid = getQueryString('sid') || 0;
  // 是否是摇一摇
  var _isShake = getQueryString('isShake') || 0;
  var _shakeGoodsType = getQueryString('shakeGoodsType') || 0;

  switch (parseInt(_type)) {
    // 摇一摇
    case 10:
      jumpUrl = baseUrl + encodeURIComponent(BASE64.encode(JSON.stringify({
        type: 15,
        data: JSON.stringify({
          title: _title,
          url: '',
          id: _val,
          params: {
            id: _val
          }
        })
      }), true));
      openUrl += encodeURIComponent(BASE64.encode(JSON.stringify({
        type: 15,
        data: JSON.stringify({
          title: _title,
          url: '',
          id: _val,
          params: {
            id: _val
          }
        })
      }), true));
      break;
      // 商品详情
    case 1:
      jumpUrl = baseUrl + encodeURIComponent(BASE64.encode(JSON.stringify({
        type: 4,
        data: JSON.stringify({
          title: _title,
          url: 'detail.html',
          id: _val,
          params: {
            goods_id: _val,
            sid: _sid,
            scid: _scid
          }
        })
      }), true));
      openUrl += encodeURIComponent(BASE64.encode(JSON.stringify({
        type: 4,
        data: JSON.stringify({
          title: _title,
          url: 'detail.html',
          id: _val,
          params: {
            goods_id: _val
          }
        })
      }), true));
      break;
      // 专题详情
    case 2:
      jumpUrl = baseUrl + encodeURIComponent(BASE64.encode(JSON.stringify({
        type: 12,
        data: JSON.stringify({
          title: _title,
          url: 'zhuantiDetail.html',
          id: _val,
          params: {
            id: _val
          }
        })
      }), true));
      openUrl += encodeURIComponent(BASE64.encode(JSON.stringify({
        type: 12,
        data: JSON.stringify({
          title: _title,
          url: 'zhuantiDetail.html',
          id: _val,
          params: {
            id: _val
          }
        })
      }), true));
      break;
      // 直播分享
    case 11:
      jumpUrl = baseUrl + encodeURIComponent(BASE64.encode(JSON.stringify({
        type: parseInt(_type),
        data: _val
      }), true));
      openUrl += encodeURIComponent(BASE64.encode(JSON.stringify({
        type: parseInt(_type),
        data: _val
      }), true));
      break;
      // 零元区分享
    case 23:
      jumpUrl = baseUrl + encodeURIComponent(BASE64.encode(JSON.stringify({
        type: parseInt(_type),
        data: JSON.stringify({
          title: _title,
          url: '',
          id: _val,
          params: {
            id: _val
          }
        })
      }), true));
      openUrl += encodeURIComponent(BASE64.encode(JSON.stringify({
        type: parseInt(_type),
        data: JSON.stringify({
          title: _title,
          url: '',
          id: _val,
          params: {
            id: _val
          }
        })
      }), true));
      break;
      // 零元抢
    case 24:
      jumpUrl = baseUrl + encodeURIComponent(BASE64.encode(JSON.stringify({
        type: parseInt(_type),
        data: JSON.stringify({
          title: _title,
          url: '',
          id: _val,
          params: {
            sid: getQueryString('sid'),
            scid: getQueryString('scid')
          }
        })
      }), true));
      openUrl += encodeURIComponent(BASE64.encode(JSON.stringify({
        type: parseInt(_type),
        data: JSON.stringify({
          title: _title,
          url: '',
          id: _val,
          params: {
            sid: getQueryString('sid'),
            scid: getQueryString('scid')
          }
        })
      }), true));
      //现在是1元抢
      break;
    // 拼团首页
    case 25:
      var _params = openParams || getQueryAll();
      _params.title = _title;
      jumpUrl = baseUrl + encodeURIComponent(BASE64.encode(JSON.stringify({
        type: parseInt(_type),
        data: JSON.stringify({
          title: _title,
          url: '',
          id: _val,
          params: _params
        })
      }), true));
      openUrl += encodeURIComponent(BASE64.encode(JSON.stringify({
        type: parseInt(_type),
        data: JSON.stringify({
          title: _title,
          url: '',
          id: _val,
          params: _params
        })
      }), true));
      break;
      //原生专题:
    case 31:
      //原生专场:
    case 32:
      //原生一周新品:
    case 33:
      //原生昨日排行榜:
    case 34:
      jumpUrl = baseUrl + encodeURIComponent(BASE64.encode(JSON.stringify({
        type: parseInt(_type),
        data: JSON.stringify({
          id: _val
        })
      })));
      break;
      // 文章详情
    case 101:
      jumpUrl = baseUrl + encodeURIComponent(BASE64.encode(JSON.stringify({
        type: 12,
        data: JSON.stringify({
          title: _title,
          url: 'news.html',
          id: _val,
          params: {
            id: _val
          }
        })
      }), true));
      openUrl += encodeURIComponent(BASE64.encode(JSON.stringify({
        type: 12,
        data: JSON.stringify({
          title: _title,
          url: 'news.html',
          id: _val,
          params: {
            id: _val
          }
        })
      }), true));
      break;
      // 半价日分享
    case 102:
      jumpUrl = baseUrl + encodeURIComponent(BASE64.encode(JSON.stringify({
        type: 12,
        data: JSON.stringify({
          title: _title,
          url: 'banjia.html',
          id: _val,
          params: {
            id: _val
          }
        })
      }), true));
      openUrl += encodeURIComponent(BASE64.encode(JSON.stringify({
        type: 12,
        data: JSON.stringify({
          title: _title,
          url: 'banjia.html',
          id: _val,
          params: {
            id: _val
          }
        })
      }), true));
      break;
      // 半价日折扣分享
    case 103:
      jumpUrl = baseUrl + encodeURIComponent(BASE64.encode(JSON.stringify({
        type: 12,
        data: JSON.stringify({
          title: _title,
          url: 'zhekou.html',
          id: _val,
          params: {
            id: _val
          }
        })
      }), true));
      openUrl += encodeURIComponent(BASE64.encode(JSON.stringify({
        type: 12,
        data: JSON.stringify({
          title: _title,
          url: 'zhekou.html',
          id: _val,
          params: {
            id: _val
          }
        })
      }), true));
      break;
      // 零元抢
    case 104:
      jumpUrl = baseUrl + encodeURIComponent(BASE64.encode(JSON.stringify({
        type: 24,
        data: JSON.stringify({
          title: _title,
          url: '',
          id: _val,
          params: {
            sid: getQueryString('sid'),
            scid: getQueryString('scid')
          }
        })
      }), true));
      openUrl += encodeURIComponent(BASE64.encode(JSON.stringify({
        type: 24,
        data: JSON.stringify({
          title: _title,
          url: '',
          id: _val,
          params: {
            sid: getQueryString('sid'),
            scid: getQueryString('scid')
          }
        })
      }), true));
      //现在是1元抢
      break;
      // 专场分享
    case 105:
      jumpUrl = baseUrl + encodeURIComponent(BASE64.encode(JSON.stringify({
        type: 12,
        data: JSON.stringify({
          title: _title,
          url: 'zhuanChang.html',
          id: _val,
          params: {
            zc_id: _val
          }
        })
      }), true));
      openUrl += encodeURIComponent(BASE64.encode(JSON.stringify({
        type: 12,
        data: JSON.stringify({
          title: _title,
          url: 'zhuanChang.html',
          id: _val,
          params: {
            zc_id: _val
          }
        })
      }), true));
      break;
    // 外链
    case 106:
    // alert(_val)
      jumpUrl = baseUrl + encodeURIComponent(BASE64.encode(JSON.stringify({
        type: 8,
        data: _val
      }), true));
      openUrl += encodeURIComponent(BASE64.encode(JSON.stringify({
        type: 8,
        data: _val
      }), true));
      break;
    //  默认传不存在的参数，跳转到APP首页
    default:jumpUrl = "http://a.app.qq.com/o/simple.jsp?pkgname=com.ogow.activity";
  }
  return jumpUrl;
}

function getIndex(key,arr){
  var result = 0;
  arr.forEach(function(item,index){
    if(item.indexOf(key)!=-1){
      result = index;
      return false;
    }
  })
  return result;
}

const _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
window.BASE64={};
 // public method for encoding
 window.BASE64.encode = function (input) {
  var output = "";
  var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
  var i = 0;
  input = _utf8_encode(input);
  while (i < input.length) {
   chr1 = input.charCodeAt(i++);
   chr2 = input.charCodeAt(i++);
   chr3 = input.charCodeAt(i++);
   enc1 = chr1 >> 2;
   enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
   enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
   enc4 = chr3 & 63;
   if (isNaN(chr2)) {
    enc3 = enc4 = 64;
   } else if (isNaN(chr3)) {
    enc4 = 64;
   }
   output = output +
   _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
   _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
  }
  return output;
 }

 // public method for decoding
 window.BASE64.decode = function (input) {
  var output = "";
  var chr1, chr2, chr3;
  var enc1, enc2, enc3, enc4;
  var i = 0;
  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
  while (i < input.length) {
   enc1 = _keyStr.indexOf(input.charAt(i++));
   enc2 = _keyStr.indexOf(input.charAt(i++));
   enc3 = _keyStr.indexOf(input.charAt(i++));
   enc4 = _keyStr.indexOf(input.charAt(i++));
   chr1 = (enc1 << 2) | (enc2 >> 4);
   chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
   chr3 = ((enc3 & 3) << 6) | enc4;
   output = output + String.fromCharCode(chr1);
   if (enc3 != 64) {
    output = output + String.fromCharCode(chr2);
   }
   if (enc4 != 64) {
    output = output + String.fromCharCode(chr3);
   }
  }
  output = _utf8_decode(output);
  return output;
 }

 // private method for UTF-8 encoding
 const _utf8_encode = function (string) {
  string = string.replace(/\r\n/g,"\n");
  var utftext = "";
  for (var n = 0; n < string.length; n++) {
   var c = string.charCodeAt(n);
   if (c < 128) {
    utftext += String.fromCharCode(c);
   } else if((c > 127) && (c < 2048)) {
    utftext += String.fromCharCode((c >> 6) | 192);
    utftext += String.fromCharCode((c & 63) | 128);
   } else {
    utftext += String.fromCharCode((c >> 12) | 224);
    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
    utftext += String.fromCharCode((c & 63) | 128);
   }

  }
  return utftext;
 }

 // private method for UTF-8 decoding
 const _utf8_decode = function (utftext) {
  var string = "";
  var i = 0;
  var c, c1, c2;
  c = c1 = c2 = 0;
  while ( i < utftext.length ) {
   c = utftext.charCodeAt(i);
   if (c < 128) {
    string += String.fromCharCode(c);
    i++;
   } else if((c > 191) && (c < 224)) {
    c2 = utftext.charCodeAt(i+1);
    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
    i += 2;
   } else {
    c2 = utftext.charCodeAt(i+1);
    c3 = utftext.charCodeAt(i+2);
    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
    i += 3;
   }
  }
  return string;
 }
