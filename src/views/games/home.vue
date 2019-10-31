<template>
    <!-- 主页 -->
    <div class="home">
        <Avatar :user-info="{chickInfo,_showList}"></Avatar>
        <SideLeft v-if="chickInfo"></SideLeft>
        <SideRight v-if="chickInfo"></SideRight>
        <!-- 主体 -->
        <div class="content center">
            <!-- 蛋 -->
            <div class="content-div" v-if="!layeggShow && newUser">
                <div class="content-wrap content-none">
                    <img v-for="(item,index) in speedImgsLength" :key="index" v-show="newImagesShow == (index + 1)"
                        :src="'http://download.pceggs.com:8080/xjyx/egg/newgold/'+(index+1)+'.png'" alt="">
                </div>
                <div class="content-btn scale-box" @click="_setChickName()"></div>
            </div>
            <!-- 鸡 -->
            <div class="content-div" v-if="!layeggShow && !newUser">
                <div class="content-wrap content-right" @click="_toFeed('touch',10000,false)">
                    <img v-for="(item,index) in speedImgsLength" :key="index" v-show="newImagesShow == (index + 1)"
                        :src="speedImageName +(index+1)+'.png'" alt="">
                </div>
            </div>
            <!-- 下蛋过程 -->
            <div class="content-div lay-eggs" v-if="layeggShow">
                <div class="content-wrap content-none">
                    <img v-for="(item,index) in speedImgsLength" :key="index" v-show="newImagesShow == (index + 1)"
                        :src="speedImageName +(index+1)+'.png'" alt="">
                </div>
            </div>
            <div class="msg-container msg-updown" style="min-width:3.2rem;top:0;left:0;white-space: nowrap;"
                v-if="!layeggShow && newUser">
                蛋蛋庄园有一只可爱的小鸡。
                <div class="msg-san msg-san-down" style="left:1rem;"></div>
            </div>
        </div>
        <!-- 下蛋 -->
        <div class="egg" v-if="!newUser && chickInfo" @click="_reciveGold()">
            <div class="egg-cont">
                <div class="egg-pro-number" v-show="_fullNumber(chickInfo.eggs,chickInfo.eggsmax,2).eggNumber > 0">
                    {{_fullNumber(chickInfo.eggs,chickInfo.eggsmax,2).eggNumber}}</div>
            </div>
            <!-- 发光 -->
            <div v-show="egglineShow" class="egg-recived center"></div>
            <div class="egg-progress center stroke2">
                <div class="egg-pro-cont" :style="'width:'+(_fullNumber(chickInfo.eggs,chickInfo.eggsmax,1).num)"></div>
                <div class="egg-pro-txt">{{_fullNumber(chickInfo.eggs,chickInfo.eggsmax,2).num}}</div>
            </div>
        </div>
        <!-- 饲料 -->
        <div class="feed" v-if="!newUser && chickInfo" @click="_feeding()">
            <div class="feed-cont">
                <div class="stroke feed-re-num">{{chickInfo.foodnum || 0}}g</div>
            </div>
            <div class="feed-weight feed-weishi" v-show="!feedTimeShow"></div>
            <div class="feed-weight feed-time" v-if="feedTimeShow">
                <p class=""></p>
                <p class="center">{{_changeTime(actionInfo.nowtime,actionInfo.endtime)}}</p>
            </div>
        </div>
        <!-- 点击攻略 -->
        <div class="raider-click" @click="_closeRaider"></div>
        <SideBottom v-show="!newUser && chickInfo" :show-list="_showList"></SideBottom>
        <!-- 任务列表 -->
        <TaskList v-show="taskShow" :close-list="{_closeList,taskShow,taskList,_taskGoldData}"></TaskList>
        <!-- 排行榜 -->
        <RankList v-show="rankShow" :close-list="{_closeList,rankShow,rankList}"></RankList>
        <!-- 动态 -->
        <LogList v-show="logShow" :close-list="{_closeList,logShow,logList}"></LogList>
        <!-- 个人信息 -->
        <UserInfo v-show="userShow" :close-list="{_closeList,userShow,userInfos}"></UserInfo>
        <!-- 弹窗(取名) -->
        <Pop v-if="setNameShow" :set-name="{_changeName,_closePop,popType,popDleve}"></Pop>
        <!-- 弹窗(饲料) -->
        <PopFeed v-if="popHomeShow" :pop-home="{popHomeShow,popHomeMsg,_closePopHome}"></PopFeed>
        <!-- 弹窗(金蛋) -->
        <PopGold v-if="reciveGoldShow" :recive-egg="{reciveGoldShow,reciveGoldMsg,_closeRecivePop}"></PopGold>
        <!-- 新手引导 -->
        <newGuide :guide-data="{guideData,_changeGuideIndex}" v-show="newGuideShow"></newGuide>
        <!-- 攻略 -->
        <!-- <Raiders :raider="_closeRaider" v-show="raiderShow"></Raiders> -->


    </div>
</template>

<script>
    import Qs from 'qs'
    import {
        gameApi
    } from '../../config/api'
    import Avatar from './comments/avatar'
    import SideLeft from './comments/sideleft'
    import SideRight from './comments/sideright'
    import SideBottom from './comments/sidebottom'
    import Pop from './comments/pop'
    import PopFeed from './comments/popFeed'
    import PopGold from './comments/popGold'
    import TaskList from './comments/tasklist'
    import RankList from './comments/ranklist'
    import LogList from './comments/loglist'
    import newGuide from './comments/newGuide'
    import UserInfo from './comments/userInfo'
    // import Raiders from './comments/raiders'
    export default {
        name: 'home',
        props: [],
        components: {
            Avatar,
            SideLeft,
            SideRight,
            SideBottom,
            Pop,
            PopFeed,
            PopGold,
            TaskList,
            RankList,
            LogList,
            newGuide,
            UserInfo,
            // Raiders,
        },
        data() {
            return {
                baseInfo: {},
                taskShow: false,
                rankShow: false,
                logShow: false,
                userShow: false,
                userInfo: {},
                taskList: [],
                rankList: [],
                logList: [],
                userInfos: {},
                chickInfo: null,
                newUser: false,
                layeggShow: false,
                setNameShow: false,
                popType: false,
                popDleve: '',
                imgLength: 1,
                imgMoveShow: false,
                interval: null,
                timeOut: null,
                nowStatus: '',
                feedTimeShow: false,
                reciveGoldShow: false,
                reciveGoldMsg: 0,
                popHomeMsg: null,
                popHomeShow: false,
                imgUrls: '',
                egglineShow: false,
                newGuideShow: false,
                guideData: null,
                guideIndex2: false,
                newImagesShow: 0,
                speedImgsLength: 0,
                speedImageName: '',
                serverReduce: 0,
                // raiderShow: false,
            }
        },
        mounted() {
            let that = this;
            that.baseInfo.userid = document.getElementById('userid').value;
            that.baseInfo.deviceid = document.getElementById('deviceid').value;
            that.baseInfo.ptype = document.getElementById('ptype').value;
            that.baseInfo.unix = document.getElementById('unix').value;
            that.baseInfo.token = document.getElementById('token').value;
            that.baseInfo.keycode = document.getElementById('keycode').value;
            that._getInfoData()
            that._popHome()
        },
        methods: {
            _checkUserInfo: function () {
                let that = this;
                that.userShow = true;
            },
            _closeRaider: function () {
                let that = this;
                // that.raiderShow = !that.raiderShow;
                try {
                    window.goSecondPage('http://manorapp.pceggs.com/Pages/Manor/Raider.aspx')
                } catch (error) {
                    window.location.href = 'http://manorapp.pceggs.com/Pages/Manor/Raider.aspx'
                }
            },
            _toFeed: function (type, time, clear) {
                //喂食
                let that = this;
                // let lefts = that.imgLength;
                let length = 0;
                let status = that.nowStatus;
                let lefts = that.newImagesShow;
                let imgHost = 'http://download.pceggs.com:8080/xjyx/egg/';
                time = 10000; //动作延迟默认10s
                // console.log(type + '---' + status)
                if (type == status) {
                    return
                }
                if (status == 'feed' && !that.layeggShow) {
                    return that.$toast('不要着急,还没吃完呢')
                }
                if (status == 'layegg') {
                    return
                }
                // if (type == 'none' || clear) {
                //     clearInterval(that.interval)
                //     clearTimeout(that.timeOut)
                //     // that.imgLength = 1;
                //     that.nowStatus = '';
                //     that.newImagesShow = 1;
                //     that.speedImgsLength = 1;
                //     that.speedImageName = imgHost + 'img/c';
                //     console.log('清除动作')
                //     return
                // }
                that.nowStatus = '';
                clearInterval(that.interval)
                clearTimeout(that.timeOut)
                switch (type) {
                    case 'newgold':
                        // 新人
                        length = 20;
                        that.speedImgsLength = 20;
                        that.speedImageName = imgHost + 'newgold/';
                        break;
                    case 'feed':
                        // 喂食23
                        // that.imgLength = 1;
                        length = 23;
                        that.speedImgsLength = 23;
                        that.speedImageName = imgHost + 'feed/';
                        break;
                    case 'touch':
                        // 摸摸25
                        length = 25;
                        that.speedImgsLength = 25;
                        that.speedImageName = imgHost + 'touch/';
                        break;
                    case 'hungry':
                        // 饿了25
                        length = 25;
                        that.speedImgsLength = 25;
                        that.speedImageName = imgHost + 'hungry/';
                        break;
                    case 'layegg':
                        // 下蛋过程 50
                        length = 50;
                        that.speedImgsLength = 50;
                        that.speedImageName = imgHost + 'layegg/';
                        break;
                    default:
                        break;
                }
                that.nowStatus = type;
                that.imgMoveShow = true;
                that.interval = setInterval(() => {
                    lefts++;
                    if (lefts > length) {
                        if (type == 'layegg') {
                            clearInterval(that.interval)
                            clearTimeout(that.timeOut)
                            lefts = 1;
                            that._getInfoData()
                            // console.log('下蛋倒计时结束~')
                            return
                        }
                        lefts = 1;
                    }
                    that.newImagesShow = lefts;
                }, 100);
            },
            _chickState: function (data) {
                let that = this;
                that.chickInfo = data.chicks[0] || null;
                that.actionInfo = data.action[0] || null;
                if (that.actionInfo) {
                    let nowTime = Date.parse(new Date()) / 1000;
                    let serverTime = Date.parse(new Date(that.actionInfo.nowtime.replace(/-/g, '/'))) / 1000;
                    that.serverReduce = parseInt(serverTime - nowTime)
                }
                // console.log(that.chickInfo.state)
                switch (that.chickInfo.state) {
                    case 0:
                        // 新人
                        // dlevel = -1 新人 
                        // popType : false 提示  true 新人
                        that.newUser = true;
                        that.popType = true;

                        that._toFeed('newgold', 10000, false)

                        break;
                    case 1:
                        // 饥饿
                        that._toFeed('hungry', 10000, false)
                        break;
                    case 2:
                        // 喂食中
                        that.feedTimeShow = true;
                        that._toFeed('feed', 10000, false)

                        break;
                    case 3:
                        // 无动作
                        that._toFeed('touch', 10000, true)
                        break;
                    default:
                        that._toFeed('none', 10000, true)
                        break;
                }

                if (that.chickInfo.uplevel > 0) {
                    that.setNameShow = true;
                    that.popType = false;
                    that.popDleve = '<p>小鸡升至LV' + that.chickInfo.uplevel +
                        '啦！</p><p>记得<font color="#FF4B27">领取孵化的鸡蛋</font>可兑换抽奖</p>';
                    if (that.chickInfo.uplevel == 1) {
                        // 新人升级收蛋
                        that.guideIndex2 = true;
                    }
                }
                that.$loading()
                // 收蛋
                // let eggNumbers = that._fullNumber(that.chickInfo.eggs, that.chickInfo.eggsmax,
                //     2).eggNumber || 0;
                // if (eggNumbers >= 1) {
                //     that._toFeed('layegg', 10000, false)
                //     that.egglineShow = true;
                // } else {
                //     that.egglineShow = false;
                // }
            },
            _newGuide: function (number) {
                // 新人引导
                let that = this;
                let localData = localStorage.getItem('gameEggs') || null;
                let local = {};
                if (localData) {
                    localData = JSON.parse(localData);
                    if (localData.index <= 7) {
                        that.newGuideShow = true;
                        that.guideData = number ? number : localData.index;
                    } else {
                        that.newGuideShow = false;
                    }
                } else {
                    that.newGuideShow = true;
                    that.guideData = 1;
                    local.index = 1;
                    that._setLolstorage('gameEggs', local)
                }

            },
            _setLolstorage: function (name, data) {
                localStorage.setItem(name, JSON.stringify(data))
            },
            _changeGuideIndex: function (index) {
                let that = this;
                let local = {};
                if (index >= 7) {
                    that.newGuideShow = false;
                    local.index = 8;
                    that._setLolstorage('gameEggs', local)
                    return
                }
                switch (index) {
                    case 1:
                        // 引导 1 喂食
                        that._feeding()
                        that.newGuideShow = false;
                        break;
                    case 2:
                        // 引导 2 收蛋
                        that._reciveGold()
                        that.newGuideShow = false;
                        break;

                    default:
                        break;
                }
                that.guideData = index + 1;
                local.index = index + 1;
                that._setLolstorage('gameEggs', local)
            },
            _getInfoData: function (type) {
                let that = this;
                that.$http({
                    url: gameApi.homeInfoApi,
                    method: "post",
                    data: {
                        userid: that.baseInfo.userid,
                        ptype: that.baseInfo.ptype,
                        token: that.baseInfo.token,
                        unix: that.baseInfo.unix,
                        deviceid: that.baseInfo.deviceid,
                        keycode: that.baseInfo.keycode,
                    }
                }).then(function (res) {
                    if (res.data.status == 0) {
                        clearInterval(that.interval)
                        clearTimeout(that.timeOut)
                        that.nowStatus = '';
                        that.imgLength = 1;
                        that.layeggShow = false;
                        // 小鸡状态
                        that._chickState(res.data.data)

                    } else {
                        that.$toast(res.data.msg)
                    }
                })
            },
            _feeding: function () {
                let that = this;
                if (that.feedTimeShow) {
                    return that.$toast('不要着急,还没吃完呢')
                }

                if (that.chickInfo && that.chickInfo.foodnum <= 0) {
                    return that.$toast('小鸡饲料不足')
                }
                that.$http({
                    url: gameApi.feedApi,
                    method: "post",
                    data: {
                        userid: that.baseInfo.userid,
                        ptype: that.baseInfo.ptype,
                        token: that.baseInfo.token,
                        unix: that.baseInfo.unix,
                        deviceid: that.baseInfo.deviceid,
                        keycode: that.baseInfo.keycode,
                        chickid: that.chickInfo.chickid,
                        mainid: that.chickInfo.mainid,
                        foodtype: that.chickInfo.foodtype,
                    }
                }).then(function (res) {
                    if (res.data.status == 0) {
                        let fdata = res.data.data.action[0] || null;
                        that.actionInfo = res.data.data.action[0] || null;
                        that.chickInfo.foodnum = res.data.data.chick[0].foodnum || 0;
                        if (that.actionInfo) {
                            let nowTime = Date.parse(new Date()) / 1000;
                            let serverTime = Date.parse(new Date(that.actionInfo.nowtime.replace(/-/g,
                                '/'))) / 1000;
                            that.serverReduce = parseInt(serverTime - nowTime)
                        }
                        if (fdata) {
                            switch (fdata.state) {
                                case 0:
                                case 2:
                                    that._toFeed('none', 10000, true)
                                    break;
                                case 1:
                                    that.feedTimeShow = true;
                                    that._toFeed('feed', 10000, false)

                                    break;
                                default:
                                    that._toFeed('none', 10000, true)
                                    break;
                            }
                        }
                        if (that.guideIndex2) {
                            that.$toast('请5小时后来收取小鸡下的蛋')
                            that._newGuide(3)
                            that.guideIndex2 = false;
                        }
                    } else {
                        that.$toast(res.data.msg)

                    }

                })
            },
            _userInfoData: function () {
                let that = this;
                that.$http({
                    url: gameApi.userInfoApi,
                    method: "post",
                    data: {
                        userid: that.baseInfo.userid,
                        ptype: that.baseInfo.ptype,
                        token: that.baseInfo.token,
                        unix: that.baseInfo.unix,
                        deviceid: that.baseInfo.deviceid,
                        keycode: that.baseInfo.keycode,
                        chickid: that.chickInfo.chickid,
                    }
                }).then(function (res) {
                    if (res.data.status == 0) {
                        try {
                            that.userInfos = res.data.data.detail[0]
                        } catch (error) {
                            that.userInfos = null
                        }

                    } else {
                        that.$toast(res.data.msg)
                    }
                })
            },
            _changeName: function (name) {
                let that = this;
                that.$http({
                    url: gameApi.changeNameApi,
                    method: "post",
                    data: {
                        userid: that.baseInfo.userid,
                        ptype: that.baseInfo.ptype,
                        token: that.baseInfo.token,
                        unix: that.baseInfo.unix,
                        deviceid: that.baseInfo.deviceid,
                        keycode: that.baseInfo.keycode,
                        chickid: that.chickInfo.chickid,
                        nickname: name
                    }
                }).then(function (res) {
                    if (res.data.status == 0) {
                        that.popType = false;
                        that.setNameShow = false;
                        that.newUser = false;
                        that.nowStatus = '';
                        that._getInfoData()
                        that._popHome()
                    } else {
                        that.$toast(res.data.msg)
                    }
                })
            },
            _reciveGold: function () {
                let that = this;
                if (that.chickInfo && parseInt(that.chickInfo.eggs / that.chickInfo.eggsmax) <= 0) {
                    return that.$toast('别着急,集满一颗就可以收了')
                }
                that.$http({
                    url: gameApi.reciveGoldApi,
                    method: "post",
                    data: {
                        userid: that.baseInfo.userid,
                        ptype: that.baseInfo.ptype,
                        token: that.baseInfo.token,
                        unix: that.baseInfo.unix,
                        deviceid: that.baseInfo.deviceid,
                        keycode: that.baseInfo.keycode,
                        chickid: that.chickInfo.chickid,
                    }
                }).then(function (res) {
                    if (res.data.status == 0) {
                        that.reciveGoldShow = true;
                        that.reciveGoldMsg = res.data.data.receivedeggs || 0;
                        that._getInfoData()
                        if (that.guideIndex2) {
                            let local = {}
                            local.index = 1;
                            that._setLolstorage('gameEggs', local)
                            setTimeout(() => {
                                that._popHome()
                            }, 3000);
                        }
                    } else {
                        that.$toast(res.data.msg)
                    }
                })
            },
            _popHome: function () {
                let that = this;
                that.$http({
                    url: gameApi.homePopApi,
                    method: "post",
                    data: {
                        userid: that.baseInfo.userid,
                        ptype: that.baseInfo.ptype,
                        token: that.baseInfo.token,
                        unix: that.baseInfo.unix,
                        deviceid: that.baseInfo.deviceid,
                        keycode: that.baseInfo.keycode,
                    }
                }).then(function (res) {
                    if (res.data.status == 0 && res.data.data.items.length > 0) {
                        that.popHomeMsg = res.data.data.items[0];
                        that.popHomeShow = true;
                    }

                })
            },
            _taskGoldData: function (id, type, type2) {
                let that = this;
                if (type == 2) {
                    return
                } else if (type == '0') {
                    if (type2 == 1) {
                        try {
                            android.goFastPager()
                        } catch (error) {
                            try {
                                // window.webkit.messageHandlers.goWork.postMessage();
                                window.goFastPager()
                            } catch (error) {
                                // console.log('h5')
                            }
                        }
                    } else {
                        try {
                            android.goInvite()
                        } catch (error) {
                            try {
                                // window.webkit.messageHandlers.goInvite.postMessage();
                                window.goInvite()
                            } catch (error) {
                                // console.log('h5')
                            }
                        }
                    }
                    return
                }

                that.$http({
                    url: gameApi.taskGoldApi,
                    method: "post",
                    data: {
                        userid: that.baseInfo.userid,
                        ptype: that.baseInfo.ptype,
                        token: that.baseInfo.token,
                        unix: that.baseInfo.unix,
                        deviceid: that.baseInfo.deviceid,
                        keycode: that.baseInfo.keycode,
                        chickid: that.chickInfo.chickid,
                        taskid: id,
                    }
                }).then(function (res) {
                    if (res.data.status == 0) {
                        try {
                            that.$toast(res.data.data.items[0].takenote)
                        } catch (error) {
                            that.$toast(res.data.msg)
                        }
                        that._taskListData()
                        that._getInfoData()

                    }
                    that.$toast(res.data.msg)

                })
            },
            _taskListData: function () {
                let that = this;
                that.$http({
                    url: gameApi.taskListApi,
                    method: "post",
                    data: {
                        userid: that.baseInfo.userid,
                        ptype: that.baseInfo.ptype,
                        token: that.baseInfo.token,
                        unix: that.baseInfo.unix,
                        deviceid: that.baseInfo.deviceid,
                        keycode: that.baseInfo.keycode,
                    }
                }).then(function (res) {
                    if (res.data.status == 0) {
                        that.taskList = res.data.data.TaskList || []
                    }
                })
            },
            _rankListData: function () {
                let that = this;
                that.$http({
                    url: gameApi.rankListApi,
                    method: "post",
                    data: {
                        userid: that.baseInfo.userid,
                        ptype: that.baseInfo.ptype,
                        token: that.baseInfo.token,
                        unix: that.baseInfo.unix,
                        deviceid: that.baseInfo.deviceid,
                        keycode: that.baseInfo.keycode,
                    }
                }).then(function (res) {
                    if (res.data.status == 0) {
                        that.rankList = res.data.data.FriendList || []
                    }
                })
            },
            _logListData: function () {
                let that = this;
                that.$http({
                    url: gameApi.logListApi,
                    method: "post",
                    data: {
                        userid: that.baseInfo.userid,
                        ptype: that.baseInfo.ptype,
                        token: that.baseInfo.token,
                        unix: that.baseInfo.unix,
                        deviceid: that.baseInfo.deviceid,
                        keycode: that.baseInfo.keycode,
                        chickid: that.chickInfo.chickid,
                    }
                }).then(function (res) {
                    if (res.data.status == 0) {
                        that.logList = res.data.data || []
                    }
                })
            },
            _fullNumber: function (min, max, type) {
                let num = parseInt(min / max * 100);
                let eggNumber = 0;
                if (type == 2 && num >= 100) {
                    eggNumber = parseInt(num / 100)
                    num = '可领取';
                } else {
                    num = num + '%';
                }
                return {
                    num,
                    eggNumber
                }
            },
            _setChickName: function () {
                let that = this;
                that.setNameShow = true;
            },
            _closePop: function (type) {
                let that = this;
                // 判断是否有新人引导 第 2 步  收蛋

                switch (type) {
                    case 'name':
                        if (that.guideIndex2) {
                            // 新人首次收蛋
                            that._newGuide()
                        }
                        that.setNameShow = false;
                        // console.log(that.guideIndex2)
                        break;

                    default:
                        break;
                }
            },
            _showList: function (type) {
                let that = this;
                switch (type) {
                    case 0:
                        that._rankListData()
                        that.rankShow = true;
                        break;
                    case 1:
                        that._taskListData()
                        that.taskShow = true;
                        break;
                    case 2:
                        that._logListData()
                        that.logShow = true;
                        break;
                    case 3:
                        if (that.chickInfo && that.chickInfo.nickname != '') {
                            that._userInfoData()
                            that.userShow = true;
                        }
                        break;
                    default:
                        break;
                }

            },
            _closeList: function (type) {
                let that = this;
                that.rankShow = false;
                that.taskShow = false;
                that.logShow = false;
                that.userShow = false;
            },
            _closeRecivePop: function () {
                this.reciveGoldShow = false;
            },
            _closePopHome: function () {
                let that = this;
                if (that.popHomeMsg && that.popHomeMsg.taskid == 1) {
                    // 新人首次送饲料
                    that._newGuide()
                }
                if (that.popHomeMsg && that.popHomeMsg.taskid == 2) {
                    // 新人首次登录送饲料
                    that._newGuide()
                }
                that._getInfoData()
                that.popHomeShow = false;
            },
            _changeTime: function (ftime, time) {
                let that = this;
                let endTime = Date.parse(new Date(time.replace(/-/g, '/'))) / 1000;
                let nowTime = Date.parse(new Date()) / 1000 + (that.serverReduce);
                // let serverTime = Date.parse(new Date(ftime.replace(/-/g, '/'))) / 1000;
                // console.log(that.serverReduce)
                // let endTime = Date.parse(new Date(time.replace(/-/g, '/'))) / 1000;
                // let nowTime = Date.parse(new Date(stime.replace(/-/g, '/'))) / 1000;
                if (that.layeggShow) {
                    // console.log('下蛋ing...')
                    return
                }
                return that._changeOutTime(nowTime, endTime)
            },
            // 时间戳转化为倒计时
            _changeOutTime: function (start, end) {
                let that = this;
                let countDownTime = '';
                let t = end - start;
                if (t <= 0) {
                    // that.nowStatus = '';
                    clearInterval(that.interval)
                    clearTimeout(that.timeOut)
                    that.layeggShow = true;
                    that.feedTimeShow = false;
                    that._toFeed('layegg', 10000, false)
                    // console.log('喂食倒计时结束~~')
                    return
                }

                let hour = Math.floor(t / 60 / 60);
                let min = Math.floor(t / 60 % 60);
                let sec = Math.floor(t % 60);
                if (hour < 10) {
                    hour = "0" + hour;
                }
                if (min < 10) {
                    min = "0" + min;
                }
                if (sec < 10) {
                    sec = "0" + sec;
                }
                countDownTime = hour + ":" + min + ':' + sec
                return countDownTime
            },


        }
    }
</script>
<style lang='less' scoped>
    @nav: .8rem;

    .home {
        width: 100vw;
        height: 100vh;
        background: url(http://download.pceggs.com:8080/xjyx/egg/img/bg1.png) no-repeat bottom;
        background-size: 100% auto;
        padding-top: @nav;

        .content {
            width: 3rem;
            height: 4rem;
            position: fixed;
            bottom: 2.2rem;
            z-index: 9;

            .content-div {
                width: 100%;
                height: 100%;

                .content-wrap {
                    width: 100%;
                    height: 100%;
                    position: relative;
                }

                .content-none {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    bottom: 0;
                    padding-top: .8rem;

                    img {
                        position: absolute;
                        left: 0;
                        bottom: 0;
                        width: 100%;
                    }
                }

                .content-right {
                    img {
                        width: 80%;
                        margin: 0 auto;
                        display: block;
                    }
                }

                .content-right2 {
                    overflow: hidden;
                    position: relative;
                    width: 100%;
                    height: 100%;
                    // border: 1px solid red;

                    img {
                        height: auto;
                        position: absolute;
                        left: 0;
                        top: 0;
                    }
                }

                .content-btn {
                    position: absolute;
                    bottom: -1rem;
                    left: -.5rem;
                    width: 4rem;
                    height: .96rem;
                    background: url(http://download.pceggs.com:8080/xjyx/egg/img/b1.png) no-repeat center;
                    background-size: 100% auto;
                }

                .content-progress {
                    width: 3.42rem;
                    height: .4rem;
                    line-height: .4rem;
                    background: #fff;
                    border-radius: .2rem;
                    margin-top: .2rem;
                    overflow: hidden;
                    position: absolute;
                    bottom: -.2rem;

                    .content-pro-cont {
                        min-width: 30%;
                        padding: 0 4px;
                        display: inline-block;
                        font-size: .24rem;
                        color: #fff;
                        text-align: center;
                        border-radius: .2rem;
                        background: linear-gradient(0deg, rgba(245, 133, 37, 1), rgba(252, 213, 99, 1));
                    }
                }
            }

            .lay-eggs {
                width: 5rem;
                height: 100%;
                position: absolute;
                left: -2rem;
            }

        }

        .egg {
            position: fixed;
            left: 0;
            bottom: 2.6rem;
            z-index: 9;
            width: 1.36rem;
            height: 1.45rem;

            .egg-cont {
                position: absolute;
                width: 100%;
                height: 1.45rem;
                top: 0;
                left: 0;
                line-height: 1.45rem;
                color: #F28310;
                font-weight: bold;
                text-align: center;
                background: url(http://download.pceggs.com:8080/xjyx/egg/img/l1.png) no-repeat center;
                background-size: 100% auto;
                z-index: 2;
            }

            .egg-recived {
                position: absolute;
                width: .6rem;
                height: .8rem;
                border-radius: 50%;
                top: .2rem;
            }

            .egg-progress {
                width: 70%;
                height: 18px;
                border: 2px solid #AC611A;
                border-radius: .2rem;
                text-align: center;
                line-height: 14px;
                position: absolute;
                bottom: .1rem;
                background: #fff;
                font-size: 12px;
                color: #fff;
                overflow: hidden;
                z-index: 3;

                .egg-pro-cont {
                    min-width: 0%;
                    height: 100%;
                    border-radius: .2rem;
                    background: linear-gradient(0deg, rgba(245, 133, 37, 1), rgba(252, 213, 99, 1));
                }

                .egg-pro-txt {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;

                }

            }
        }

        .feed {
            position: fixed;
            right: .3rem;
            bottom: 1.2rem;
            z-index: 9;
            width: 1.28rem;
            height: 1.28rem;
            background: url(http://download.pceggs.com:8080/xjyx/egg/img/w3.png) no-repeat center;
            background-size: 100% auto;
            padding: .2rem;

            .feed-cont {
                width: 100%;
                height: 100%;
                position: relative;

                // background: url(http://download.pceggs.com:8080/xjyx/egg/img/w3.png) no-repeat center;
                // background-size: 100% auto;
                .feed-re-num {
                    text-align: center;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    line-height: .3rem;
                    color: #fff;
                }
            }

            .feed-weight {
                position: absolute;
                bottom: -.2rem;
                left: 0;
                width: 100%;
                height: .35rem;
                line-height: .35rem;
                font-size: .32rem;
                color: #fff;
                text-align: center;

                p {
                    display: block;
                    font-size: .28rem;
                }

                p:nth-child(1) {
                    width: 100%;
                    height: .35rem;
                    background: url(http://download.pceggs.com:8080/xjyx/egg/img/jinshi1.png) no-repeat center;
                    background-size: auto 100%;
                }

                p:nth-child(2) {
                    padding: 0 .2rem;
                    background: rgba(0, 0, 0, 0.3);
                    border-radius: .24rem;
                    box-sizing: content-box;
                }
            }

            .feed-weishi {
                background: url(http://download.pceggs.com:8080/xjyx/egg/img/weishi1.png) no-repeat center;
                background-size: auto 100%;
            }
        }

        .raider-click {
            width: 1.7rem;
            height: 1.2rem;
            position: fixed;
            bottom: 3.6rem;
            right: 0;
            z-index: 2;
        }
    }
</style>