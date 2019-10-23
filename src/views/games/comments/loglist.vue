<template>
    <!-- 任务列表 -->
    <div class="fixed log" @click.stop="_selfClose()">
        <div :class="'list-cont log-cont center '+ (popUp?'list-pop-up':'list-pop-down')" @click.stop>
            <div class="list-title log-title center">小鸡动态</div>
            <div class="list-list center log-wrap">
                <div class="log-list" v-for="(item,key,index) in closeList.logList" :key="index">
                    <div class="log-date">{{_changeDate(key)}}</div>
                    <div class="log-item flex-left" v-for="(item2,index2) in item" v-show="item.length>0" :key="index2">
                        <div class="item-left">
                            <div class="v-line center"></div>
                            <div :class="'v-icon center2 ' + (item2.itype=='1'?'icon-recive':'icon-feed')"></div>
                        </div>
                        <div class="item-right">
                            <div class="right-time">{{item2.itime}}</div>
                            <div class="right-msg flex-bt">
                                <div class="msg-left">{{item2.explain}}</div>
                                <div class="msg-right" v-html="item2.num"></div>
                            </div>
                            <div class="right-icon"></div>
                        </div>
                    </div>
                    <div class="none-list" v-show="item.length<=0">暂无记录</div>
                </div>
            </div>
            <div class="list-close log-close" @click="_selfClose"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: '',
        props: ['closeList'],
        data() {
            return {
                popUp: false,
                list: []
            }
        },
        watch: {
            'closeList.logShow': function () {
                this.popUp = this.closeList.logShow;
            }
        },
        mounted() {

        },
        methods: {
            _selfClose: function () {
                let that = this;
                that.popUp = false;
                let times = setTimeout(() => {
                    that.closeList._closeList();
                    clearTimeout(times)
                }, 600);
            },
            _changeDate: function (time) {
                switch (time) {
                    case 'today':
                        return '今天'
                        break;
                    case 'yesterday':
                        return '昨天'

                        break;
                    case 'befor':
                        return '更早'
                        break;
                    default:
                        break;
                }
            }
        },
    }
</script>


<style lang='less' scoped>
    .log {
        .list-list {
            .none-list {
                color: #6F4818;
                font-size: .24rem;
                line-height: .4rem;
                padding-left: .8rem;

            }

            .log-list {
                overflow: hidden;

                .log-date {
                    color: #6F4818;
                    font-size: .24rem;
                    line-height: .8rem;
                }

                .log-item {
                    width: 100%;
                    height: 1.38rem;
                    overflow: hidden;
                    float: left;

                    .item-left {
                        min-width: .4rem;
                        height: 100%;
                        position: relative;

                        .v-line {
                            width: 1px;
                            height: 100%;
                            background: #E6B368;
                        }

                        .v-icon {
                            width: .4rem;
                            height: .4rem;
                        }

                        .icon-feed {
                            background: url(http://download.pceggs.com:8080/xjyx/egg/img/w2.png) no-repeat;
                            background-size: 100% auto;
                        }

                        .icon-recive {
                            background: url(http://download.pceggs.com:8080/xjyx/egg/img/w11.png) no-repeat;
                            background-size: 100% auto;
                        }
                    }

                    .item-right {
                        width: 100%;
                        height: 1.18rem;
                        margin-left: .3rem;
                        background: #FBE1B8;
                        border-radius: .2rem;
                        padding: .2rem;
                        line-height: .4rem;
                        font-size: .24rem;
                        position: relative;

                        .right-time {
                            color: #E1972B;
                        }

                        .right-msg {
                            color: #6F4818;
                        }

                        .right-icon {
                            position: absolute;
                            left: -.12rem;
                            top: .58rem;
                            width: .13rem;
                            height: .21rem;
                            background: url(http://download.pceggs.com:8080/xjyx/egg/img/j1.png) no-repeat;
                            background-size: 100% auto;
                        }
                    }
                }
            }
        }
    }
</style>