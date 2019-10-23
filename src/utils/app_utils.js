/*Add by xxt*/
'use strict';
/**
 * 前端工具类
 * @module Utils
 * @author xjc
 */

(function() {
    var Utils = {};
    var decode = decodeURIComponent;
    /**
     * 设置本地数据
     * @param {String} key    数据名
     * @param {Object} value  数据值
     */
    Utils.setLocalData = function(key, value){
        // 判断 value 是否为 plain object
        if(!$.isPlainObject(value)){
            alert('参数错误， 传入的 value 不是 plain object');
            return ;
        };
        // 将数据值序列化
        var valueSer = JSON.stringify(value);
        // 将序列化的值存入本地
        localStorage.setItem(key, valueSer);
    };
    /**
     * 获取本地数据
     * @param  {String} key  数据名
     */
    Utils.getLocalData = function(key){
        // 获取本地的值
        var valueSer = localStorage.getItem(key);
        // 判断是否存在
        if(!valueSer){
            return null;
        }
        // 转化为 json 对象
        return JSON.parse(valueSer);
    };
    /**
     * 将表单序列化字符串转化为 json 对象
     * @param  {[type]} params [description]
     * @param  {[type]} coerce [description]
     * @return {[type]}        [description]
     */
    Utils.deparam = function(params, coerce) {
        var obj = {},
            coerce_types = { 'true': !0, 'false': !1, 'null': null };

        // Iterate over all name=value pairs.
        $.each(params.replace(/\+/g, ' ').split('&'), function(j, v) {
            var param = v.split('='),
                key = decode(param[0]),
                val,
                cur = obj,
                i = 0,

                // If key is more complex than 'foo', like 'a[]' or 'a[b][c]', split it
                // into its component parts.
                keys = key.split(']['),
                keys_last = keys.length - 1;

            // If the first keys part contains [ and the last ends with ], then []
            // are correctly balanced.
            if (/\[/.test(keys[0]) && /\]$/.test(keys[keys_last])) {
                // Remove the trailing ] from the last keys part.
                keys[keys_last] = keys[keys_last].replace(/\]$/, '');

                // Split first keys part into two parts on the [ and add them back onto
                // the beginning of the keys array.
                keys = keys.shift().split('[').concat(keys);

                keys_last = keys.length - 1;
            } else {
                // Basic 'foo' style key.
                keys_last = 0;
            }

            // Are we dealing with a name=value pair, or just a name?
            if (param.length === 2) {
                val = decode(param[1]);

                // Coerce values.
                if (coerce) {
                    val = val && !isNaN(val) ? +val // number
                        : val === 'undefined' ? undefined // undefined
                            : coerce_types[val] !== undefined ? coerce_types[val] // true, false, null
                                : val; // string
                }

                if (keys_last) {
                    // Complex key, build deep object structure based on a few rules:
                    // * The 'cur' pointer starts at the object top-level.
                    // * [] = array push (n is set to array length), [n] = array if n is
                    //   numeric, otherwise object.
                    // * If at the last keys part, set the value.
                    // * For each keys part, if the current level is undefined create an
                    //   object or array based on the type of the next keys part.
                    // * Move the 'cur' pointer to the next level.
                    // * Rinse & repeat.
                    for (; i <= keys_last; i++) {
                        key = keys[i] === '' ? cur.length : keys[i];
                        cur = cur[key] = i < keys_last ? cur[key] || (keys[i + 1] && isNaN(keys[i + 1]) ? {} : []) : val;
                    }

                } else {
                    // Simple key, even simpler rules, since only scalars and shallow
                    // arrays are allowed.

                    if ($.isArray(obj[key])) {
                        // val is already an array, so push on the next value.
                        obj[key].push(val);

                    } else if (obj[key] !== undefined) {
                        // val isn't an array, but since a second value has been specified,
                        // convert val into an array.
                        obj[key] = [obj[key], val];

                    } else {
                        // val is a scalar.
                        obj[key] = val;
                    }
                }

            } else if (key) {
                // No value was defined, so set something meaningful.
                obj[key] = coerce ? undefined : '';
            }
        });

        return obj;
    };
    /**
     * @func renderHtml
     * @desc 将tmpl插入到context里
     * @param {string} tmpl 模板生成的html字符串
     * @param {string} context 选择器
     * @param {boolean} overwrite 是否清空容器原有内容 默认不清空
     */
    Utils.renderHtml = function(tmpl, context, overwrite) {
        var contentEl = $(context);
        if (overwrite) {
            contentEl.empty();
        }
        return $(tmpl).appendTo(contentEl);
    };
    /**
     * 提示信息
     * @param  {String} message 提示的信息
     */
    Utils.alert = function(message, doSure){
        var alertHtml = '<div class="modal fade js-modal-alert" role="dialog">\
                            <div class="modal-dialog modal-sm" role="document">\
                                <div class="modal-content">\
                                    <!-- 模态窗头部，如果不需要可以删除 -->\
                                    <div class="modal-header">\
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\
                                        <!-- 标题-->\
                                        <h4 class="modal-title">提示</h4>\
                                    </div>\
                                    <div class="modal-body">\
                                        <!-- 模态窗的内容 -->\
                                    </div>\
                                    <div class="modal-footer">\
                                        <!-- 确定按钮 -->\
                                        <button type="button" class="btn btn-primary js-ensure" data-dismiss="modal">确定</button>\
                                    </div>\
                                </div>\
                                <!-- /.modal-content -->\
                            </div>\
                            <!-- /.modal-dialog -->\
                        </div>';
        // 判断弹窗元素是否存在
        if($('.js-modal-alert').length <= 0){
            // 如果 dom 不存在
            // 添加 dom
            $('body').append($(alertHtml));
        }
        $('.js-modal-alert').find('.js-ensure').unbind('click').on('click',function(){
            // 当点击事件的时候触发接下去要做的事情
            if(typeof doSure === 'function'){
                doSure();
            }
        });
        // 给弹窗添加内容
        $('.js-modal-alert').find('.modal-body').text(message);
        // 弹出弹窗
        $('.js-modal-alert').modal();
    };
    /**
     * 确认弹出窗口
     * @param  {String} message  弹出窗信息
     * @param  {Function} doSure 确认之后执行的操作
     */
    Utils.confirm = function(message, doSure){
        var alertHtml = '<div class="modal fade js-modal-confirm" role="dialog">\
                            <div class="modal-dialog modal-sm" role="document">\
                                <div class="modal-content">\
                                    <!-- 模态窗头部，如果不需要可以删除 -->\
                                    <div class="modal-header">\
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\
                                        <!-- 标题-->\
                                        <h4 class="modal-title">提示</h4>\
                                    </div>\
                                    <div class="modal-body">\
                                        <!-- 模态窗的内容 -->\
                                    </div>\
                                    <div class="modal-footer">\
                                        <!-- 确认按钮 -->\
                                        <button type="button" class="btn btn-primary js-confirm-ensure" data-dismiss="modal">确定</button>\
                                        <!-- 取消按钮按钮 -->\
                                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>\
                                    </div>\
                                </div>\
                                <!-- /.modal-content -->\
                            </div>\
                            <!-- /.modal-dialog -->\
                        </div>';
        // 判断弹窗元素是否存在
        if($('.js-modal-confirm').length <= 0){
            // 如果 dom 不存在
            // 添加 dom
            $('body').append($(alertHtml));
            // 添加事件
        }
        $('.js-modal-confirm').find('.js-confirm-ensure').unbind('click').on('click',function(){
            // 当点击事件的时候触发接下去要做的事情
            doSure();
        });

        // 给弹窗添加内容
        $('.js-modal-confirm').find('.modal-body').text(message);
        // 弹出弹窗
        $('.js-modal-confirm').modal();
    };

    /**
     * 对含有特殊字符的内容进行转码，防止跨站脚本攻击
     * @param  {String} text 有嫌疑的字符串
     * @return {[type]}         [description]
     */
    Utils.escape = function(text){
        text = doT.template("{{! it}}")(text);
        return text;
    }

    Utils.alertCompatibility = function(){
        var message = '您当前浏览器的版本过低，请使用IE10以上版本的 IE 浏览器，更推荐使用 chrome 浏览器。'
        Utils.alert(message);
    }

    /**
     * 判断是否为json数据
     * @param  {Object} obj 数据值
     *
     */
    Utils.isJson = function(obj){
        var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
        return isjson;
    }

    /**
     * 获取浏览器url参数
     * @param  {String} name 参数值
     *
     */
    Utils.getQueryString = function(name){
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }

    /**
     * 获取浏览器url所有的参数
     * @param  {String} name 参数值
     * return {Object}	所有参数的Object
     */
    Utils.getQueryVars = function(){
        var url = window.location.search.substr(1); //获取url中"?"符后的字串
        var queryVars = new Object();

        var strs = url.split("&");
        if(strs.length > 0){
            for(var i = 0; i < strs.length; i++) {
                queryVars[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
            }
        }
        return queryVars;
    }

    /**
     * 获取URL字符串中的单个变量
     * @param  {String} name 参数值
     *
     */
    Utils.getUrlStringVar = function(str, name){
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        if (str.indexOf("?") != -1) {
            str = str.split("?")[1];
        }
        var r = str.match(reg);
        if (r != null) return unescape(r[2]); return null;
    }

    /**
     * 获取URL字符串中所有的参数
     * @param  {String} name 参数值
     * return {Object}	所有参数的Object
     */
    Utils.getUrlStringVars = function(str){
        if(str.indexOf("?") != -1) {
            str = str.split("?")[1];
        }
        var queryVars = new Object();
        var strs = str.split("&");
        if(strs.length > 0){
            for(var i = 0; i < strs.length; i ++) {
                queryVars[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
            }
        }
        return queryVars;
    }

    /**
     * 回到顶部
     * @param  N/A
     *
     */

    Utils.backUp = function(){
        var html = '<i class="backup"></i>',
            $body = $('body');
        $body.append(html);
        var backDiv = $('.backup');

        $(window).on('scroll',function(){
            $body.scrollTop() >10 ?  backDiv.show() : backDiv.hide();
        });

        backDiv.on('click',function(){
            $body.scrollTop(0);
        });

    }

    /**
     * 判断版本号
     * @Author   JHX
     * @DateTime 2016-09-12T09:31:54+0800
     * @param    {[type]}                 cur  当期版本号
     * @param    {[type]}                 base 基准版本号
     * @return   {[type]}                      true: 大于等于基准版本，false: 小于
     */
    Utils.checkVersion = function(cur,base) {
        // =======本地调试用=======
        var _host = window.location.host;
        if(_host.indexOf("localhost:3000") != -1 || _host.indexOf(".0gow.com") != -1 || _host.indexOf(".0gowang.com") != -1) {
            return true;
        }
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
     * 获取API接口配置
     * @Author   JHX
     * @DateTime 2016-09-23T11:19:24+0800
     * @return   {[type]}                 [description]
     */
    Utils.getApiUrl = function() {
        var _apiUrl = window.configAPI();
        return _apiUrl;
    }

    /**
     * js将http的资源缓存https的
     */
    Utils.imgHttpsUrl = function(imgUrl, isApp) {
        if (!imgUrl || typeof(imgUrl) != 'string'  || imgUrl == '' || imgUrl.replace(/^\s+|\s+$/g,'') == '') {
            return ''
        }
        var httpsMap = window.imgHttpsMap();
        var HTTP_HEAD = /^http(s)?:+/i;
        imgUrl = imgUrl.replace(HTTP_HEAD, '');
        // 遍历数组比较
        // 这个比下面的执行效率快一些
        for (var k in httpsMap) {
            if (imgUrl.indexOf(k) !== -1 && k !== httpsMap[k]) {
                var val = httpsMap[k];
                var regExp = new RegExp(k, 'gim');
                imgUrl = imgUrl.replace(regExp, val);
            }
        }
        // 七牛优化
        var isCDN = /qnssl.com/gi;
        if(imgUrl.indexOf('?imageMogr2/thumbnail/') !== -1 || imgUrl.indexOf('?imageMogr2/') !== -1){
            var QINIU_PARAM = /\/quality\/\d\d\/format\/(jp(e)?g|png|webp|gif)/i;
            imgUrl = imgUrl.replace(QINIU_PARAM, '$&|imageslim');
        } else if (isCDN.test(imgUrl)) {
            var QINIU_PARAM = /.(jp(e)?g|png|gif|webp)/gi
            imgUrl = imgUrl.replace(QINIU_PARAM, '$&?imageslim')
            // imgUrl += '?imageslim'
        }
        if(imgUrl && isApp == true && imgUrl !== '' && imgUrl.substr(0, 2) == '//'){
            return 'https:'+imgUrl;
        } else {
            return imgUrl;
        }
    };
    /**
     * 设置页面标题
     * @param title
     */
    Utils.setDocumentTitle = function(title){
        document.title = title;
        var ua = navigator.userAgent;
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
    };
    module.exports = Utils
})();
