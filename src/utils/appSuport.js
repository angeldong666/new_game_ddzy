/**
 * 原生用接口工具
 * @Author   JHX
 * @DateTime 2016-08-13T16:25:28+0800
 * @return   {[type]}                 [description]
 */

  var App = {
    getApiUrl: 'https://api.0gow.com',
    uid: '',
    ticket: '',
    sessionid: '',
    Apptag: '',
    appVersion: '',
    appver: '',
    upgradeUrl: 'https://ojn8uqheg.qnssl.com/app.html',
    testVer: '2.0'
  };


  App.init = function (callBack) {
    var needVer = '2.0';
    // 拿信息uid
    App.checkLogin(function() {
      App.startEvent("userInfo", {
        'keys': ['uid', 'ticket', 'sessionid', 'Apptag']
      }, function(event, data) {
        App.uid = data.uid;
        App.ticket = data.ticket;
        App.sessionid = data.sessionid || '';
        App.Apptag = data.Apptag || '';
        callBack && callBack(App.uid)
        App.getVersion(function(val) {
          App.appVersion = val;
          if(!App.checkVersion(App.appVersion, needVer)){
            // App.gotoUrl(App.upgradeUrl);
            window.location.href = App.upgradeUrl
          }
          if (App.Apptag != '') {
            App.appver = val
          }
          // 分享信息
          App.initShareData();
        })
      })
    });
  }

  App.initShareData = function(){
    // 分享功能，原生调用, 除了我的分享不加分享按钮
    if (!document.querySelector('#share_des')) {
      return
    }
    var pageImage = document.querySelector('#share_des').dataset.image || 'https://ojn81nujc.qnssl.com/1502849307act99_share.png?imageslim';
    var pageUrl = document.querySelector('#share_des').dataset.url || window.location.href;
    var pageTitle = document.querySelector('#share_des').dataset.title || document.title || '';
    var pageDes = document.querySelector('#share_des').dataset.des || document.title || '';

    if( App.checkVersion(App.appVersion,'1.6.12') ){
      //pageUrl = 'http://www.0gowang.com/static/AppShare/share.html?_t='+new Date().getTime()+'&type=106&value='+window.location.href;
      var beforeUrl = window.location.href.split('?')?window.location.href.split('?')[0]:window.location.href;
      var afterUrl = window.location.href.split('?')?window.location.href.split('?')[1]:'';
      // 主会场锚点修复
      afterUrl = afterUrl.replace('#/', '');
      pageUrl = beforeUrl + '?type=106&isAppShare=123&token='+parseInt(App.uid).toString(16)+'&_t='+new Date().getTime()+"&"+afterUrl+"&value="+encodeURIComponent(window.location.href.replace('#/',''));
    }else{
      pageUrl = 'http://cdn.nameinet.cn/jump.html?_t='+new Date().getTime();
    }
    var _obj = {
      url: pageUrl,
      des: pageDes,
      img: pageImage,
      title: pageTitle,
    }

    console.log('getShareInfo: ', _obj);

    // App.showMsg('getShareInfo'+JSON.stringify(_obj))
    App.sendShareData(_obj);
  }

  App.isApp = function () {
    return (window.location.href.indexOf('isApp') != -1 && window.location.href.indexOf('isFromWx') == -1 && window.location.href.indexOf('isAppShare') == -1) || (window.jsObj && typeof(window.jsObj.startEvent) !== 'undefined' && !App.isLiteApp())
            || (window.webkit && typeof(window.webkit.messageHandlers) !== 'undefined' && typeof(window.webkit.messageHandlers.iosObj) !== 'undefined')
  }

App.isLiteApp = function(){
    return (typeof(window.jsObj) !== 'undefined' && typeof(window.jsObj.isLiteApp) !== 'undefined' && window.jsObj.isLiteApp() == 1) ? true : false;
}
//是否APP
    App.isapp = function(){
        var result = ((window.jsObj && typeof(window.jsObj.startEvent) !== 'undefined')
            || (window.webkit && typeof(window.webkit.messageHandlers.iosObj) !== 'undefined')) ? true : false;
        return result
    }
  /**
   * 跳转url处理
   * @param  {[String]} url 微信端url地址
   *
   */
  App.gotoUrl = function(url) {
    url = url || '';
    if (url.indexOf('/cart/') != -1) {
      // 购物车
      // App.startEvent("gotoCart", "xx");
      var cfg = {
        type: -1,
        obj: JSON.stringify({uid: App.uid, isAct: 1}),
        url: 'cart.html?uid=' + App.uid + '&isAct=1',
        tit: '购物车'
      };
      App.jumpPage(cfg);
    } else if (url.indexOf('/goods/') != -1) {
      // 跳转到商品详情
      var params = App.getUrlVars(url) || {};
      var url1 = url.split("?")[0];
      var url2 = url1.split("/");
      var goods_id = url2[url2.length - 1];
      if (goods_id) {
        params.goods_id = goods_id;
      }
      App.gotoGoodsDetail(params)
      // var cfg = {
      //   type: -2,
      //   obj: JSON.stringify(params),
      //   url: 'detail.html?goods_id=' + params.goods_id,
      //   tit: '商品详情'
      // };
      // App.jumpPage(cfg);
    } else if (url.indexOf('/search/') != -1) {
      App.goToSearch()
    } else {
      // 通用外链
      var jumpUrl = url.replace('.0gowang.com/', '.0gow.com/');
      jumpUrl = jumpUrl.replace('.navi0gow.com/', '.0gow.com/');  // 抽红包用
      if(jumpUrl.indexOf('//') !== -1 && jumpUrl.substr(0, 2) == '//'){
        jumpUrl = 'https:'+jumpUrl;
      };
      // url加上isApp=1
      if (jumpUrl.indexOf('isApp') == -1) {
        if (jumpUrl.indexOf('?') == -1) {
          jumpUrl = jumpUrl + '?isApp=1'
        } else {
          jumpUrl = jumpUrl + '&isApp=1'
        }
      }
      var cfg = {
        type: 4,
        obj: '',
        url: '',
        tit: jumpUrl
      };
      App.jumpPage(cfg)
    }
  }

  /**
   * 跳转到商品详情
   */
  App.gotoGoodsDetail = function(obj) {
    if (obj.goods_id) {
      var cfg = {
        type: -2,
        obj: JSON.stringify(obj),
        url: 'detail.html?goods_id=' + obj.goods_id,
        tit: '商品详情'
      };
      App.jumpPage(cfg);
    }
  }

  App.getUrlVars = function(str) {
    if (str.indexOf("?") != -1) {
      str = str.split("?")[1];
    }
    var queryVars = new Object();
    strs = str.split("&");
    if (strs.length > 0) {
      for (var i = 0; i < strs.length; i++) {
        queryVars[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
      }
    }
    return queryVars;
  }

  /**
   * 判断当前系统是android还是ios
   * @param  {Function} afn android回调函数
   * @param {Function} ifn ios回调函数
   */

  App.isAndroid = function(afn, ifn) {
    window.jsObj ? afn() : ifn()
  }

  /**
  * 待封装IOS新版webview调用方法
  * @param  {[String]} objectName 对象名
  * @param  {[type]} args        参数
  * @return {[type]}            [description]
  */
  App.iosWebviewFun = function(objectName, args) {
    objectName = objectName || '';
    args = args || [];
    var _return = '';
    if (objectName == '') {
      return _return;
    }
    var obj = {methodName:objectName, data: args}
    console.log(obj)
    // window.webkit.messageHandlers.iosObj.postMessage(obj);
    if (typeof(window.webkit) != 'undefined' && typeof(window.webkit.messageHandlers) != 'undefined' && typeof(window.webkit.messageHandlers.iosObj) != 'undefined') {
      // if(objectName == 'setDataInfo') {
      //   document.body.append(JSON.stringify(obj))
      // }
      window.webkit.messageHandlers.iosObj.postMessage(obj);
      // window.webkit.messageHandlers[objectName].postMessage(args);
    } else {
      _return = (typeof(window[objectName]) == 'undefined') ? console.log(objectName+args) : window[objectName].apply(this, args);
    }
    return _return;
  }

 /**
   * 判断原生是否支持，参考startEvent来写的
   * @Author   JHX
   * @param    {String}                 supportName 支持类型
   */
  App.isAppSupport = function(supportName, callback) {
      var isSupport = 0;
      // ios用
      window.sendSupportToJs = function(val) {
        // App.startEvent('showMsg', 'sendSupportToJs:'+val )
        callback && callback(val);
      }
      App.isAndroid(function(){
        isSupport = (typeof(window.jsObj.isSupport) == 'undefined')?0:window.jsObj.isSupport(supportName);
        callback && callback(isSupport);
        // return isSupport;
      },function(){
        isSupport = App.iosWebviewFun('isSupport', [supportName]) || '';
        if (isSupport != '') {
          callback && callback(isSupport);
        }
      });
    }
  /**
   * app通过原生分享方法
   */
  App.sendShareData = function(param){
    if(!param.title || !param.img || !param.des || !param.url){
      return;
    }
    window.sendShareData = function() {
      var params = {
          kShareParamURLKey: param.url,
          kShareParamTextKey: param.des,
          kShareParamImagesKey: param.img,
          kShareParamTitleKey: param.title
        };
      var shareRet;
      App.isAndroid(function() {
        window.jsObj.getShareInfo(JSON.stringify(params));
        return;
      }, function() {
        App.iosWebviewFun('getShareInfo', params);
        if(typeof(window.getShareInfo) !== 'undefined') {
          window.getShareInfo(JSON.stringify(params));
        };
        shareRet = JSON.stringify(params);
        return JSON.stringify(params)
      });
      if(shareRet) {
        return shareRet;
      }
    }
  };
  /*
  * 直接调用原生分享
  * */
App.setShare = function(param){
    if(!param.title || !param.img || !param.des || !param.url){
        return;
    }
    (function() {
        var params = {
            kShareParamURLKey: param.url,
            kShareParamTextKey: param.des,
            kShareParamImagesKey: param.img,
            kShareParamTitleKey: param.title
        };
        var shareRet;
        App.isAndroid(function() {
            window.jsObj.getShareInfo(JSON.stringify(params));
            return;
        }, function() {
            /*这一行与上面sendShareData不一样*/
            App.iosWebviewFun('getShareInfo', JSON.stringify(params));
            if(typeof(window.getShareInfo) !== 'undefined') {
                window.getShareInfo(JSON.stringify(params));
            };
            shareRet = JSON.stringify(params);
            return JSON.stringify(params)
        });
        if(shareRet) {
            return shareRet;
        }
    })();
};
 /**
  * 获取app版本号
  */
 App.getVersion = function(callback) {
   var isSupport = 0;
   // ios用
   window.sendVersionJs = function(val) {
     //  App.startEvent('showMsg', 'sendVersionJs:'+val )
     callback && callback(val);
   }
   // 安卓用
   window.sendVersionToJs = function(val) {
     //  App.startEvent('showMsg', 'sendVersionJs:'+val )
     callback && callback(val);
   }
   var _host = window.location.host;
   if (_host.indexOf(":8080") != -1) {
     callback && callback(App.testVer);
     return;
   };
   App.isAndroid(function() {
     isSupport = (typeof(window.jsObj) !== 'undefined' && typeof(window.jsObj.getVersion) !== 'undefined') ? window.jsObj.getVersion() : 0;
     //  callback && callback(isSupport);
     // return isSupport;
   }, function() {
     isSupport = App.iosWebviewFun('getVersion', []) || '';
     if (isSupport != '') {
       callback && callback(isSupport);
     }
   });
 }

  /**
   * APP通知H5重新加载页面reload
   * @return {[type]} [description]
   */
  App.callJsReload = function(cb){
    window.callJsReload = function() {
      cb && cb();
    }
  };

  /**
   * 打开小能客服
   */
  App.OpenXn = function(params, xnClickState){
    var _appver = -1, _xnuid = -1, isSupportXn=0;
    if(typeof(params.ver) !== 'undefined' && params.ver){
      _appver = params.ver;
    } else {
      App.getVersion(function(ver) {
        // App.startEvent('showMsg', 'getVersion:' + ver)
        _appver = ver;
      });
    }

    if(!_appver) {
      _appver = '1.6.3';
    }
    // if (params.supportXn) {
    //   isSupportXn = params.supportXn
    // } else {
    //   App.isAppSupport('xiaoneng', function(val) {
    //     isSupportXn = parseInt(val || '') == 1? 1: 0;
    //   })
    // }
      // isSupportXn = params.supportXn || (parseInt(App.isAppSupport('xiaoneng') || '') == 1 ? 1 : 0);

      if(typeof(params.uid) !== 'undefined' && params.uid){
        _xnuid = params.uid;
      } else {
        App.startEvent("userInfo", {'keys':['uid']}, function(event, userdata) {
          _xnuid = userdata.uid || -1;
        });
      }
    setTimeout(function(){
      // App.startEvent('showMsg', '_appver' + _appver);
      if(App.checkVersion(_appver,'1.6.3') !== false){
        var sellerId = params.seller || 1000;
        var xnParam = {
                siteid: 'lg_1000',
                seller: sellerId,
                itemid: params.itemid || params.goods_id || '',
                title: params.title || params.goods_name || params.goodsTitle || '',
                goodsTitle: params.goodsTitle || params.goods_title || params.goods_name  || '',
                goodsPrice: params.goodsPrice || params.Price || params.price || params.order_price || params.money || '',
                goodsScPrice: params.goodsScPrice || params.scPrice || '',
                goods_imageURL: params.goods_imageURL || params.default_image || params.image || '',
                settingid: params.settingid || 'lg_'+(parseInt(sellerId || '') !== 1000 ? sellerId: 1001 )+'_9999',
                seller_id: params.sellerid || 'lg_'+(parseInt(sellerId || '') !== 1000 ? sellerId: 1001 ),
                qq: params.qq || '',
                goods_url: (params.itemid || params.goods_id)  ? ('http://www.0gowang.com/goods/'+(params.itemid || params.goods_id)+'?yl=96358741') : '',
                shop_detail: params.shop_detail || params.store_name || '',
                id: -1,
                shop_url: params.shop_url || (parseInt(params.seller || '') > 0 ? ('storeinfo.html?id='+(params.seller || '')) : '') || '',
                param: params.param || (parseInt(params.seller || '') > 0 ? JSON.stringify({id: params.seller || ''}) : '') || '',
                order_sn: params.order_sn || '',
                order_price: params.order_price || params.money || '',
                refund: params.refund || '',
                comment:  params.comment || '',
            };
        // App.startEvent('showMsg', 'ver:' + _appver + 'isSupportXn:' + isSupportXn + 'uid:' + _xnuid)
        if(parseInt(xnParam.seller || '') == 1000 || xnClickState == 1){
          App.startEvent('xiaonengpage',xnParam);
          return false;
        } else {
          var stateUrl = App.getApiUrl+'/xn?action=xnstate';
          var stateObj = {
            seller_id: xnParam.seller || '',
            uid: _xnuid
          };
          App.setDataInfo(stateUrl,stateObj,function(stateData){
            if(parseInt(stateData.code || '') == 1 && parseInt(stateData.data.result || '') == 1)
            {
                App.startEvent('xiaonengpage',xnParam);
            } else {
                var cfg = {
                  type: -1,
                  obj: JSON.stringify(xnParam),
                  url: 'xnkf.html',
                  tit: '选择客服组'
                };
              /*var url = 'xnkf.html?1=1';
              for(var k in xnParam){
                url += '&'+k+'='+xnParam[k];
              }
              console.log(url);*/
              App.jumpPage(cfg);
            }
          });
        }
      } else if(params.qq) {
        //不支持小能，跳客服qq
            var cfg = {type:-4,obj:JSON.stringify({qq:params.qq}),url:'https://wpa.qq.com/msgrd?v=3&uin='+params.qq+'&site=qq&menu=yes',tit:''};
            App.jumpPage(cfg);
      }
    }, 300);
  }


  /**
   * 缓存用接口，用户保存数据
   * @DateTime 2016-08-13T16:25:16+0800
   * @param    {String}                 key   key值，一遍传接口地址，用于存储数据标志
   * @param    {json}                 value 接口数据
   * @return   {[type]}                       [description]
   */
  App.saveJson = function(key, value) {
    App.isAndroid(function() {
      // window.jsObj.getJson(key);
      if (typeof(window.jsObj.saveJson) != 'undefined') {
        window.jsObj.saveJson(key, JSON.stringify(value));
      }
    }, function() {
      // if (typeof(window.saveJson) != 'undefined') {
      //   window.saveJson(key, JSON.stringify(value));
      // }
      App.iosWebviewFun('saveJson', [key, JSON.stringify(value)]);
    });
  }

  var _jumpTimer = null;
  var _isJumping = false;
  // 1秒内重复点击无效
  var TIME_INTERVAL = 1000;
  /**
   * 跳转页面
   * @Author   JHX
   * @DateTime 2016-09-11T21:40:30+0800
   * @param    {[type]}                 cfg [description]
   * @return   {[type]}                     [description]
   */
  App.jumpPage = function(cfg) {
    // 12，用于跳转提货券Android，ios系统还是走-1
    if (cfg.type == 12) {
      cfg.type = -1;
    }
    console.log(cfg);
    App.isAndroid(function() {
      if (cfg.type == 4) {
        cfg.url == '' ? cfg.url = cfg.tit : '';
      }
      window.jsObj.jumpPage(cfg.type, cfg.obj, cfg.url, cfg.tit);
    }, function() {
      App.iosWebviewFun('jumpPage', [cfg.type, cfg.obj, cfg.url, cfg.tit]);
      // window.jumpPage(cfg.type, cfg.obj, cfg.url, cfg.tit);
    });
  };

  //=================startEvent=========
  var eventObj = {};
  eventObj.needReload = false;
  eventObj.needPage = false;

  /**
   * 原生startEvent回调
   * @Author   JHX
   * @param    {String}               eventName 事件类型
   * @param    {json}                 param 回传数据
   * callBackEvent("userInfo",{“uid”:"xxx",'ticket':"fsdfsfs"})
   */
  window.callBackEvent = function(eventName, param) {
    //TODO
    // console.log(eventName)1
    // viewWillAppear：打开页面前刷新
    if (eventName == "viewWillAppear") {
      if (eventObj.needReload) {
        // console.log("！！！！！viewWillAppear!!!!")
        App.startEvent("reload", '', function(data) {});
        return;
      }
    }
    // 添加翻页
    else if (eventName == "addFoot") {
      if (eventObj.needPage) {
        return 1;
      }
    }

    var data = {};
    App.isJson(param) ? data = param : data = JSON.parse(param);
    // callback(eventName,data);
    eventObj[eventName](eventName, data);
    // console.log(eventObj)
  };

  /**
   *
   * [needReload description]
   * @Author   JHX
   * @DateTime 2016-07-15T13:58:25+0800
   * @param    {[Boolean]}                 bool 是否需要刷新，默认不刷新
   */
  App.needReload = function(bool) {
      eventObj.needReload = bool;
  }

  App.needPage = function(bool) {
      eventObj.needPage = bool;
  }

  App.callBackEventListen = function(eventName,callback) {
      eventObj[eventName] = callback;
  }

  /**
   * 调用原生事件(临时写的，暂时用在动态收银台purchase.js的管理收货地址这块；和动态收银台异常情况比如库存不足，id不正确等情况；最后的下单支付也是调用这个方法)
   * 主要是因为Utils.getAppInfo这个的startEvent第二个参数格式限定了
   * @Author   JHX
   * @param    {String}                 eventName 事件类型
   * @param    {Array}                 obj      参数
   * startEvent("userInfo",{’keys‘:['uid','ticket']})
   */
  App.startEvent = function(eventName, obj, callback) {
    eventObj[eventName] = callback;
    if (eventName == "viewWillAppear") {
      return;
    }
    if (typeof obj == "object") {
      obj = JSON.stringify(obj)
    }
    var _host = window.location.host;
    if (_host.indexOf(":8080") != -1) {
      if (eventName == 'checkLogin') {
        callback && callback(eventName, 1)
      } else if (eventName == "userInfo") {
        callback && callback(eventName, {code:1,'uid':"33058187",'appver':App.testVer})
      } else {
        callback && callback(eventName, {code:1})
      }
      return;
    };
    // window.startEvent=function(eventName,json) {if(eventName == "userInfo") {callBackEvent("userInfo",{'uid':"33058187",'ticket':"f78b289c39e447a5eeaa26f70836b474"});}else if(eventName == "checkLogin"){callBackEvent(eventName,1)}};

    App.isAndroid(function() {
      window.jsObj.startEvent(eventName, obj);
    }, function() {
      App.iosWebviewFun('startEvent', [eventName, obj])
      // window.startEvent(eventName, obj);
    });
  }

  /**
   * 调用原生弹窗
   * @param  {string}  txt 弹出的文案
   *
   */
  App.jalert = function(txt){
      App.isAndroid(function(){
          window.jsObj.jalert(txt);
      },function(){
        App.iosWebviewFun('jalert', [txt])
          // window.jalert(txt);
      });
  };

  /**
   * 检查登录状态
   * @Author   JHX
   * @DateTime 2016-09-11T12:33:50+0800
   * @param    {Function}               callback [description]
   * @return   {[type]}                          [description]
   */
  App.checkLogin = function(callback) {
    App.startEvent("checkLogin", 'xx', function(event, data) {
      if (parseInt(data) == 1) {
        callback && callback()
      }
    });
  }
  /**
   * 存储缓存数据
   * @Author   JHX
   * @DateTime 2016-08-30T09:44:32+0800
   * @param    {String}                 key   请求的API接口地址
   * @param    {Json}                 value 需要缓存的接口返回数据
   */
  App.setCache = function(key,value) {
    App.saveJson(key, value);
  }

  /**
   * 获取缓存数据
   * @Author   JHX
   * @DateTime 2016-08-30T09:46:49+0800
   * @param    {String}                 key      请求的API接口地址
   * @param    {Function}               callback  回调
   */
  App.getCache = function(key,callback) {
      var _data = '';
      // ios用
      window.sendJsonToJs = function(val) {
        val = App.isJson(val) ? val : JSON.parse(val);
        callback && callback(val);
      }
      App.isAndroid(function(){
          if(typeof(window.jsObj.getJson) != 'undefined') {
              _data = window.jsObj.getJson(key);
          }

      }, function(){
        _data = App.iosWebviewFun('getJson', [key]) || '';
      });

      if(_data != 0 && _data != '') {
          _data = App.isJson(_data) ? _data : JSON.parse(_data);
          callback && callback(_data);
      }
  }

  /**
   * 提示信息
   * @Author   JHX
   * @DateTime 2016-09-11T18:18:23+0800
   * @param    {[type]}                 msg [description]
   * @return   {[type]}                     [description]
   */
  App.showMsg = function(msg) {
    var _host = window.location.host;
    if (_host.indexOf(":8080") != -1) {
      console.log(msg)
      return;
    };
    // 临时提示信息
    App.startEvent("showMsg", msg);
  }

  /**
   * 进入APP首页
   * @Author   JHX
   * @DateTime 2016-09-11T22:52:00+0800
   * @return   {[type]}                 [description]
   */
  App.gotohome = function() {
    App.startEvent("gotohome", "xx");
  }

  /**
   * app到原生搜索页方法
   * @param    key                 关键词
   */
  App.goToSearch = function(key){
    if(key && key !== ''){
      App.startEvent("searchKey", key);
    } else {
      App.startEvent("gotoSearch", "xx");
    }
  };

  /**
   * app自定义分享
   * @param    {param}                 分享参数
   * @param    [param]                 分享方式
   * @param    successFun              分享成功后的回调方法
   */
  App.customShare = function(param, shareList, successFun){
    if(!param.title || !param.des || !param.url){
      return;
    }
    var params = {
      kShareParamURLKey: param.url,
      kShareParamTextKey: param.des,
      kShareParamImagesKey: param.img || '',
      kShareParamTitleKey: param.title
    };
    // 过滤分享方式，只能有下面几种方式
    var shareArr = [];
    var customArrs = ['weixin', 'weixin_circle', 'qq', 'qzone'];
    if(shareList && shareList.length > 0) {
      for(var k in shareList){
        if(shareList[k] && customArrs.indexOf(shareList[k]) !== -1 && shareArr.indexOf(shareList[k]) == -1){
          shareArr.push(shareList[k]);
        }
      }
    }

    App.isAndroid(function() {
      window.jsObj.getShareInfoCustom(JSON.stringify(params), JSON.stringify(shareArr));
    }, function() {
      App.iosWebviewFun('getShareInfoCustom', [JSON.stringify(params), JSON.stringify(shareArr)]);
      if(typeof(window.getShareInfo) !== 'undefined') {
        window.getShareInfoCustom(JSON.stringify(params), JSON.stringify(shareArr));
      };
    });
    window.shareSuccess = function(type){
      if(successFun && typeof(successFun) == 'function'){
        successFun(type);
      }
    };
  }

  /**
   * app到拼团首页
   */
  App.gotoPtHome = function(){
    App.jumpPage({type:37, obj: '', url: '', tit: ''});
  }

  /**
   * app到拼团专题
   */
  App.gotoPtSubject = function(){
    App.jumpPage({type:38, obj: JSON.stringify({source:'object'}), url: '', tit: ''});
  }

  /**
   * app到拼团专题详情
   * @param    subjectID            专题id
   * @param    subjectName          专题名称
   */
  App.gotoPtSubjectInfo = function(subjectID, subjectName){
    if(!subjectID){
      return;
    }
    App.jumpPage({type:39, obj: JSON.stringify({source:"subjectinfo",subject_id:subjectID}), url: '', tit: subjectName || ''});
  }

  /**
   * app到拼团专题详情
   * @param    ptNum           拼团编号
   * @param    ptName          拼团名称
   */
  App.gotoPtGoods = function(ptNum, ptName){
    if(!ptNum){
      return;
    }
    App.jumpPage({type:40, obj: JSON.stringify({source:"ptgoods",pt_num:ptNum}), url: '', tit: ptName || ''});
  }

  App.checkCurVersion = function(base, cb) {
    App.getVersion(function(val) {
      App.appVersion = val
      cb&&cb(App.checkVersion(val, base))
    })
  }


  /**
   * 判断版本号
   * @Author   JHX
   * @DateTime 2016-09-12T09:31:54+0800
   * @param    {[type]}                 cur  当期版本号
   * @param    {[type]}                 base 基准版本号
   * @return   {[type]}                      true: 大于等于基准版本，false: 小于
   */
  App.checkVersion = function(cur,base) {
      // =======本地调试用=======
      var _host = window.location.host;
      // if(_host.indexOf(":8080") != -1 || _host.indexOf("app.0gow.com") != -1) {
      //     return true;
      // }
      // =======本地调试用=======

      if(cur == -1 || cur == 0 || cur == "") {
          return false;
      }
      if(cur == base) {
          return true;
      }
      var curArr = cur.split(".");
      var baseArr = base.split(".");
      var len = curArr.length > baseArr.length ? curArr.length : baseArr.length;
      for (var i = 0; i < len; i++) {
          if(parseInt(curArr[i]) > parseInt(baseArr[i])) {
              return true;
          } else if(parseInt(curArr[i]) < parseInt(baseArr[i])){
              return false;
          }
      }
      if(curArr.length > baseArr.length) {
          return true;
      }
      return false;

  }


  /**
   * 判断是否为json数据
   * @param  {Object} obj 数据值
   *
   */
  App.isJson = function(obj){
      var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
      return isjson;
  }


  /**
   * 接口数据获取
   * @Author   JHX
   * @DateTime 2016-09-10T10:29:34+0800
   * @param    {[type]}                 url      接口地址
   * @param    {[type]}                 obj      接口参数
   * @param    {Function}               callback 回调函数
   */
  App.setDataInfo = function(url, obj, callback) {
      // url替换成配置文件
      // if(_apiUrl != "") {
      //   url = url.replace(/http:\/\/api.0gow.com/gi, _apiUrl);
      //   url = url.replace(/http:\/\/api.0gowang.com/gi, _apiUrl);
      // }
      App.isAndroid(function() {
          window.jsObj.setDataInfo(url, JSON.stringify(obj), 3);
      }, function() {
          // ios接口特殊处理
          // console.log(obj)
          App.iosWebviewFun('setDataInfo', [url, JSON.stringify(obj), 3]);
          // window.setDataInfo(url, JSON.stringify(obj), 3);
      });

      window.sendToJs = function(param) {
          var data = {};
          App.isJson(param) ? data = param : data = JSON.parse(param);
          callback(data);
      };
  }
  module.exports = App
