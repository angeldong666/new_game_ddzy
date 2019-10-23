
var App = {};
App.isLiteApp = function(){
    return (typeof(window.jsObj) !== 'undefined' && typeof(window.jsObj.isLiteApp) && window.jsObj.isLiteApp() == 1) ? true : false;
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
 * 判断是不是json
 */
App.isJson = function(obj) {
    var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
    return isjson;
};

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
    var obj = {
        methodName: objectName,
        data: args
    }
    // console.log(obj)
    // window.webkit.messageHandlers.iosObj.postMessage(obj);
    if (typeof(window.webkit) != 'undefined') {
        // if(objectName == 'setDataInfo') {
        //   document.body.append(JSON.stringify(obj))
        // }
        window.webkit.messageHandlers.iosObj.postMessage(obj);
        // window.webkit.messageHandlers[objectName].postMessage(args);
    } else {
        _return = (typeof(window[objectName]) == 'undefined') ? '' : window[objectName].apply(this, args);
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
    App.isAndroid(function() {
        isSupport = (typeof(window.jsObj.isSupport) == 'undefined') ? 0 : window.jsObj.isSupport(supportName);
        callback && callback(isSupport);
        // return isSupport;
    }, function() {
        isSupport = App.iosWebviewFun('isSupport', [supportName]) || '';
        if (isSupport != '') {
            callback && callback(isSupport);
        }
    });
}
/**
 * app通过原生分享方法
 */
App.sendShareData = function(param) {
    if (!param.title || !param.img || !param.des || !param.url) {
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
            if (typeof(window.getShareInfo) !== 'undefined') {
                window.getShareInfo(JSON.stringify(params));
            };
            shareRet = JSON.stringify(params);
            return JSON.stringify(params)
        });
        if (shareRet) {
            return shareRet;
        }
    }
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
App.callJsReload = function(cb) {
    window.callJsReload = function() {
        cb && cb();
    }
};


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

App.callBackEventListen = function(eventName, callback) {
    eventObj[eventName] = callback;
}

/**
 * 调用原生事件(临时写的，暂时用在动态收银台purchase.js的管理收货地址这块；和动态收银台异常情况比如库存不足，id不正确等情况；最后的下单支付也是调用这个方法)
 * 
 * @Author   JHX
 * @param    {String}                 eventName 事件类型
 * @param    {Array}                 obj      参数
 * startEvent("userInfo",{’keys‘:['uid','ticket']})
 */
App.startEvent = function(eventName, obj, callback) {
    eventObj[eventName] = callback;
    console.log(eventName)
    console.log(obj)
    if (eventName == "viewWillAppear") {
        return;
    }
    if (typeof obj == "object") {
        obj = JSON.stringify(obj)
    }

    window.startEvent = function(eventName, json) {
        if (eventName == "userInfo") {
            callBackEvent("userInfo", {
                'uid': "33058187",
                'ticket': "f78b289c39e447a5eeaa26f70836b474"
            });
        } else if (eventName == "checkLogin") {
            callBackEvent(eventName, 1)
        }
    };

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
App.jalert = function(txt) {
    App.isAndroid(function() {
        window.jsObj.jalert(txt);
    }, function() {
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
App.setCache = function(key, value) {
    App.saveJson(key, value);
    // App.isAndroid(function(){
    //     if(typeof(window.jsObj.saveJson) != 'undefined') {
    //         window.jsObj.saveJson(key,JSON.stringify(value));
    //     }
    // },function(){
    //     if(typeof(window.saveJson) != 'undefined') {
    //         window.saveJson(key,JSON.stringify(value));
    //     }
    // });
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
    if (_host.indexOf("localhost:3000") != -1 || _host.indexOf("0gow.com") != -1) {
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
 * 获取API接口配置
 * @Author   JHX
 * @DateTime 2016-09-23T11:19:24+0800
 * @return   {[type]}                 [description]
 */
App.getApiUrl = function() {
    _apiUrl = window.configAPI();
    return _apiUrl;
}

/**
 * app到原生搜索页方法
 * @param    key                 关键词
 */
App.goToSearch = function(key) {
    if (key && key !== '') {
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
App.customShare = function(param, shareList, successFun) {
    if (!param.title || !param.des || !param.url) {
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
    if (shareList && shareList.length > 0) {
        for (var k in shareList) {
            if (shareList[k] && customArrs.indexOf(shareList[k]) !== -1 && shareArr.indexOf(shareList[k]) == -1) {
                shareArr.push(shareList[k]);
            }
        }
    }

    App.isAndroid(function() {
        window.jsObj.getShareInfoCustom(JSON.stringify(params), JSON.stringify(shareArr));
    }, function() {
        App.iosWebviewFun('getShareInfoCustom', [JSON.stringify(params), JSON.stringify(shareArr)]);
        if (typeof(window.getShareInfo) !== 'undefined') {
            window.getShareInfoCustom(JSON.stringify(params), JSON.stringify(shareArr));
        };
    });
    window.shareSuccess = function(type) {
        if (successFun && typeof(successFun) == 'function') {
            successFun(type);
        }
    };
}

/**
 * app到拼团首页
 */
App.gotoPtHome = function() {
    App.jumpPage({
        type: 37,
        obj: '',
        url: '',
        tit: ''
    });
}

/**
 * app到拼团专题
 */
App.gotoPtSubject = function() {
    App.jumpPage({
        type: 38,
        obj: JSON.stringify({
            source: 'object'
        }),
        url: '',
        tit: ''
    });
}

/**
 * app到拼团专题详情
 * @param    subjectID            专题id
 * @param    subjectName          专题名称
 */
App.gotoPtSubjectInfo = function(subjectID, subjectName) {
    if (!subjectID) {
        return;
    }
    App.jumpPage({
        type: 39,
        obj: JSON.stringify({
            source: "subjectinfo",
            subject_id: subjectID
        }),
        url: '',
        tit: subjectName || ''
    });
}

/**
 * app到拼团专题详情
 * @param    ptNum           拼团编号
 * @param    ptName          拼团名称
 */
App.gotoPtGoods = function(ptNum, ptName) {
    if (!ptNum) {
        return;
    }
    App.jumpPage({
        type: 40,
        obj: JSON.stringify({
            source: "ptgoods",
            pt_num: ptNum
        }),
        url: '',
        tit: ptName || ''
    });
}
module.exports = App;
