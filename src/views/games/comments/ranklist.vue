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
            <div class="list-list rank-list center" ref="rankScroll">
                <div :class="'rank-item flex-bt ' + (uid == item.userid?'item-act ':'') + (item.userid == 'none'?' item-none-bot ':'')"
                    v-for="(item,index) in closeList.rankList" :key="index">
                    <div v-show="item.userid!='none'"
                        :class="'item-left '+(item.rank>3?'':('rn-'+item.rank)) + ((uid == item.userid && item.rank > 3)?' item-act-left':' item-hide-left')">
                        {{item.rank>3?item.rank:''}}</div>
                    <div v-show="item.userid!='none'" class="item-center flex-left">
                        <div class="center-img" v-show="item.userid!='none'"><img :src="item.headimg" alt="">
                        </div>
                        <div class="center-name text-ellipsis">{{item.nickname}}</div>
                    </div>
                    <div v-show="item.userid!='none'" class="item-right">{{item.dlevel}}</div>
                    <div class="item-add" v-if="item.userid=='none'">...</div>
                </div>
            </div>
            <div class="list-close rank-close" @click="_selfClose"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: '',
        props: ['closeList', 'rank', 'uid'],
        data() {
            return {
                popUp: false,
                font: null,
            }
        },
        mounted() {},
        watch: {
            'closeList.rankShow': function () {
                let that = this;
                if (that.font) {
                    that._scrollList(that.font)
                } else {
                    that.font = document.getElementsByTagName('html')[0].style.fontSize.split('px')[0];
                    that._scrollList(that.font)
                }
                that.popUp = that.closeList.rankShow;
            }
        },
        methods: {
            _scrollList: function (num) {
                let that = this;
                let itemHeight = (num * 1.08).toFixed(2);
                let arr = this.closeList.rankList || [];
                let ranks = 0;
                let isAdd = false;
                for (const key in arr) {
                    if (arr[key].userid == that.uid) {
                        ranks = (key - 2) * itemHeight;
                    }
                    try {
                        if ((arr[10].rank - arr[9].rank) > 1) {
                            isAdd = true;
                        }
                    } catch (error) {
                        isAdd = true;

                    }
                }
                if (isAdd) {
                    try {
                        arr.splice(10, 0, {
                            userid: 'none',
                            nickname: '...'
                        })
                    } catch (error) {

                    }
                }

                that.$refs.rankScroll.scrollTop = ranks;
            },
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
    @ser: .7rem;

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

                .item-act {
                    background: #FBE1B8;
                    border-radius: .1rem;
                }

                .rank-item {
                    width: 100%;
                    height: 1.08rem;
                    border-bottom: 1px solid #FBE0B1;
                    padding: 0 .2rem;
                    line-height: 1.08rem;
                    align-items: center;

                    .item-left {
                        width: @ser;
                        height: @ser;
                        line-height: @ser;
                        font-size: .24rem;
                        text-align: center;
                    }

                    .item-act-left {
                        color: #fff;
                        background: #D59459;
                        border-radius: 50%;
                    }

                    .item-hide-left {
                        color: #EDA423;
                    }

                    .rn-1 {
                        background: url(http://download.pceggs.com:8080/xjyx/egg/img/rn1.png) no-repeat center;
                        background-size: .4rem auto;
                    }

                    .rn-2 {
                        background: url(http://download.pceggs.com:8080/xjyx/egg/img/rn2.png) no-repeat center;
                        background-size: .4rem auto;
                    }

                    .rn-3 {
                        background: url(http://download.pceggs.com:8080/xjyx/egg/img/rn3.png) no-repeat center;
                        background-size: .4rem auto;
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

                    .item-add {
                        color: #6F4818;
                        font-size: .24rem;
                        font-weight: bold;
                        width: 100%;
                        text-align: center;
                    }
                }

                .item-none-bot {
                    border: none;
                    height: .7rem;
                }
            }
        }

    }
</style>