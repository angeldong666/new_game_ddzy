<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>
        <%= htmlWebpackPlugin.options.title %>
    </title>
    <meta name="author" content="" />
    <meta name="copyright" content="" />
    <meta name="keywords" content="">
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <meta content="telephone=no" name="format-detection" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <meta name="referrer" content="never" charset=UTF-8>
    <link rel="shortcut icon" href="" type="image/x-icon">
    <link rel="icon" href="" type="image/x-icon">
    <link rel="stylesheet" href="http://download.pceggs.com:8080/xjyx/egg/css/root.css">
    <% for (var i in htmlWebpackPlugin.options.cdn.css) { %>
    <link rel="stylesheet" href="<%= htmlWebpackPlugin.options.cdn.css[i] %>">
    <% } %>
    <style>
        * {
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }

        input {
            -webkit-user-select: auto;
        }

        body {
            background: #75d0f2 url(http://download.pceggs.com:8080/xjyx/egg/img/bg0.png) no-repeat bottom;
            background-size: 100%;
            overflow: hidden;
        }

        body {

            -webkit-transform: translate3d(0, 0, 0);
            -moz-transform: translate3d(0, 0, 0);
            -ms-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
        }
    </style>
    <style>
        .loading-center {
            position: absolute;
            top: 50%;
            left: 50%;
            -ms-transform: translate(-50%, -50%);
            -moz-transform: translate(-50%, -50%);
            -o-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
        }

        .loading {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 999;
            width: 100%;
            height: 100%;
            background: #fff;
        }

        .loading-content {
            width: 90%;
            height: 200px;
            text-align: center;
            background: url(http://download.pceggs.com:8080/xjyx/egg/img/loading1.gif) no-repeat center;
            background-size: auto 100px;

        }

        .loading-content p {
            line-height: 30px;
            font-size: 13px;
            color: #964F09;
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
        }

        .loading-content span {
            color: #FF5E0D;
        }
    </style>
</head>

<body>
    <!-- <div id="loading" class="loading">
        <div class="loading-center loading-content">
            <p>正在打扫蛋蛋庄园中...</p>
        </div>
    </div> -->
    <div id="loading"></div>
    <div id="app">
        <app></app>
    </div>
    <input type="hidden" id="userid" name="" value="28140992">
    <input type="hidden" id="ptype" name="" value="2">
    <input type="hidden" id="deviceid" name="" value="863049033556450">
    <input type="hidden" id="unix" name="" value="1571104543">
    <input type="hidden" id="token" name="" value="hws4akaa8aq7f78or8317ala5o6ir7ssgwlb87rd">
    <input type="hidden" id="keycode" name="" value="A30F46CCFF8574190D58AA0870295818">
    <input type="hidden" id="testuid" name="" value="28438830,28140992">
</body>
<% for (var i in htmlWebpackPlugin.options.cdn.js) { %>
<script src="<%= htmlWebpackPlugin.options.cdn.js[i] %>"></script>
<% } %>
<script>
    /*
    <img v-show="false" src="http://download.pceggs.com:8080/xjyx/egg/feed/1.png"
                        alt="">
    <img v-show="false" src="http://download.pceggs.com:8080/xjyx/egg/touch/1.png"
        alt="">
    <img v-show="false" src="http://download.pceggs.com:8080/xjyx/egg/hungry/1.png"
        alt="">
    <img v-show="false" src="http://download.pceggs.com:8080/xjyx/egg/gold/1.png"
        alt="">
                        */
    // var strs = 'http://download.pceggs.com:8080/xjyx/egg/';

    // function loadImage(url, now, num) {
    //     var img = new Image();
    //     if (now > num) {
    //         return console.log('全部加载完')
    //     }
    //     now++;
    //     img.onload = function () {
    //         loadImage(strs + 'touch/' + now + '.png', now, 25)
    //         console.log('加载完了' + url)
    //     }
    //     img.src = url;
    // }
    // loadImage(strs + 'touch/' + 1 + '.png', 1, 25)
    // for (var item1 = 1; item1 <= 25; item1++) {
    //     loadImage(strs + 'touch/' + item1 + '.png')
    //     loadImage(strs + 'hungry/' + item1 + '.png')
    //     console.log(item1)
    // }
    // for (var item1 = 1; item1 <= 23; item1++) {
    //     loadImage(strs + 'feed/' + item1 + '.png')
    // }
    // for (var item1 = 1; item1 <= 20; item1++) {
    //     loadImage(strs + 'gold/' + item1 + '.png')
    // }
</script>

</html>