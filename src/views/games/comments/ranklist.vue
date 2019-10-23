<template>
    <!-- 好友列表 -->
    <div class="fixed rank" @click.stop="_selfClose()">
        <div :class="'list-cont rank-cont center '+ (popUp?'list-pop-up':'list-pop-down')" @click.stop>
            <div class="list-title rank-title center">排行榜</div>
            <div class="rank-label center flex-bt">
                <p>排名</p>
                <p>昵称</p>
                <p>小鸡等级</p>
            </div>
            <div class="list-list rank-list center">
                <div class="rank-item flex-bt" v-for="(item,index) in closeList.rankList" :key="index">
                    <div :class="'item-left ' + (item.rank>3?'':('rn-'+item.rank))">{{item.rank>3?item.rank:''}}</div>
                    <div class="item-center flex-left">
                        <div class="center-img"><img :src="item.headimg" alt="">
                        </div>
                        <div class="center-name text-ellipsis">{{item.nickname}}</div>
                    </div>
                    <div class="item-right">{{item.dlevel}}</div>
                </div>
            </div>
            <div class="list-close rank-close" @click="_selfClose"></div>
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
                list: [{
                    name: '测试1',
                    num: '阿斯达所多',
                    btn: false,
                    rn: 1,
                    level: 'LV.99'
                }, {
                    name: '测试1',
                    num: '阿斯',
                    btn: false,
                    rn: 2,
                    level: 'LV.99'
                }, {
                    name: '测试1',
                    num: '阿斯达所多阿斯达所多',
                    btn: false,
                    rn: 3,
                    level: 'LV.99'
                }, {
                    name: '测试1',
                    num: '阿阿斯达所多',
                    btn: false,
                    rn: 4,
                    level: 'LV.99'
                }, ]
            }
        },
        mounted() {

        },
        watch: {
            'closeList.rankShow': function () {
                this.popUp = this.closeList.rankShow;
            }
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

        },
    }
</script>


<style lang='less' scoped>
    .rank {
        .rank-cont {
            .rank-label {
                position: absolute;
                top: 2.9rem;
                width: 6.3rem;
                height: .4rem;
                line-height: .4rem;
                padding: 0 .4rem;

                p {
                    font-size: .24rem;
                    color: #6F4818;
                }
            }

            .rank-list {
                top: 3.3rem;
                height: 6.4rem;

                .rank-item {
                    width: 100%;
                    height: 1.08rem;
                    border-bottom: 1px solid #FBE0B1;
                    padding: 0 .2rem;
                    line-height: 1.08rem;

                    .item-left {
                        font-size: .24rem;
                        color: #EDA423;
                        width: .4rem;
                        height: 100%;
                        text-align: center;
                    }

                    .rn-1 {
                        background: url(http://download.pceggs.com:8080/xjyx/egg/img/rn1.png) no-repeat center;
                        background-size: 100% auto;
                    }

                    .rn-2 {
                        background: url(http://download.pceggs.com:8080/xjyx/egg/img/rn2.png) no-repeat center;
                        background-size: 100% auto;
                    }

                    .rn-3 {
                        background: url(http://download.pceggs.com:8080/xjyx/egg/img/rn3.png) no-repeat center;
                        background-size: 100% auto;
                    }

                    .item-center {
                        width: 3rem;

                        .center-img {
                            width: .64rem;
                            height: .64rem;
                            border-radius: 50%;
                            overflow: hidden;
                            background: #6F4818;
                            margin: auto 0;
                            margin-right: .2rem;

                            img {
                                width: 100%;
                                float: left;
                            }
                        }

                        .center-name {
                            max-width: 2.4rem;
                        }
                    }

                    .item-right {
                        font-size: .24rem;
                        color: #FF6009;
                        font-weight: bold;

                    }
                }
            }
        }

    }
</style>