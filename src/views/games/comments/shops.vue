<template>
    <!-- 任务列表 -->
    <div class="fixed shops" @click.stop="_selfClose()">
        <div :class="'list-cont shops-cont center '+ (popUp?'list-pop-up':'list-pop-down')" @click.stop>
            <div class="list-title shops-title center">庄园商店</div>
            <div class="list-list shops-list center" v-if="closeList.shopList">
                <div class="shops-wrap">
                    <div class="shops-w-tit flex-left">
                        <div :class="'shops-w-t ' + (act == 1?'shops-w-t-act':'')" @click="_changeAct(1)">饲料</div>
                        <div :class="'shops-w-t ' + (act == 2?'shops-w-t-act':'')" @click="_changeAct(2)">道具卡</div>
                        <div :class="'shops-w-t ' + (act == 3?'shops-w-t-act':'')" @click="_changeAct(3)">我的道具</div>
                    </div>
                    <div class="shops-w-cont">
                        <div class="shops-wc-tit" v-show="goldShow">{{closeList.shopList.chick[0].golds || 0}}</div>
                        <!-- 饲料 -->
                        <div :class="'shops-wc-cont ' + (goldShow?'':'wc-cont-act')" v-show="act==1">
                            <div class="shops-wc-item flex-algin-center"
                                v-for="(item,index) in closeList.shopList.foods" :key="index">
                                <div class="item-left"><img :src="item.img" alt="">
                                </div>
                                <div class="item-center">
                                    <div class="item-c-top flex-left">
                                        <span class="c-top-1">{{item.name}}</span>
                                    </div>
                                    <div class="item-c-bot">下蛋数:{{item.eggsnum}} 经验:{{item.experience}}</div>
                                </div>
                                <div class="item-right" @click="closeList._shopMethods('feed',item.id,item.price)"><img
                                        :src="item.priceimg" alt="">
                                </div>
                            </div>
                        </div>
                        <!-- 道具 -->
                        <div :class="'shops-wc-cont ' + (goldShow?'':'wc-cont-act')" v-show="act==2">
                            <div class="shops-wc-item flex-algin-center"
                                v-for="(item,index) in closeList.shopList.props" :key="index">
                                <div class="item-left"><img :src="item.img" alt="">
                                </div>
                                <div class="item-center">
                                    <div class="item-c-top flex-left">
                                        <span class="c-top-1">{{item.name}}</span>
                                    </div>
                                    <div class="item-c-bot">{{item.explain}}</div>
                                </div>
                                <div class="item-right" @click="closeList._shopMethods('prop',item.id,item.price)"><img
                                        :src="item.priceimg" alt="">
                                </div>
                            </div>
                        </div>
                        <!-- 我的道具 -->
                        <div :class="'shops-wc-cont ' + (goldShow?'':'wc-cont-act')" v-show="act==3">
                            <div class="shops-wc-item flex-algin-center"
                                v-for="(item,index) in closeList.shopList.myprops" :key="index">
                                <div class="item-left"><img :src="item.img" alt="">
                                </div>
                                <div class="item-center">
                                    <div class="item-c-top flex-left">
                                        <span class="c-top-1">{{item.name}}</span>
                                        <span class="c-top-num">{{item.total}}张</span>
                                    </div>
                                    <div class="item-c-bot">{{item.explain}}</div>
                                </div>
                                <div class="item-right" @click="closeList._shopMethods('my',item.type,item.isallow)">
                                    <img :src="item.btnimg" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="list-close shops-close" @click="_selfClose"></div>
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
                act: 1,
                goldShow: true,
            }
        },
        watch: {
            'closeList.shopsShow': function () {
                this.popUp = this.closeList.shopsShow;
            }
        },
        mounted() {

        },
        methods: {
            _changeAct: function (index) {
                this.act = index;
                this.goldShow = index == 3 ? false : true;
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
    .shops {
        .shops-cont {
            background: url(http://download.pceggs.com:8080/xjyx/egg/img/shop_bg1.png) no-repeat;
            background-size: 100% auto;

            .shops-title {
                top: 1.74rem;
            }

            .shops-list {
                height: 6.6rem;
                overflow: hidden;
                padding: .6rem .35rem .2rem;

                .shops-wrap {
                    width: 100%;
                    height: 100%;
                    // border: 1px solid #222;
                    position: relative;
                    padding-top: .7rem;
                    background: #FFEDCD;

                    .shops-w-tit {
                        width: 100%;
                        height: .7rem;
                        line-height: .7rem;
                        text-align: center;
                        color: #D4A664;
                        font-size: .26rem;
                        position: absolute;
                        top: 0;
                        left: 0;
                        background: #FFEDCD;

                        .shops-w-t {
                            width: 30%;
                            border-top-left-radius: .2rem;
                            border-top-right-radius: .2rem;
                        }

                        .shops-w-t-act {
                            height: .9rem;
                            background: #F9D6A3;
                            color: #6F4818;
                            box-shadow: 0px 3px 0px 0px #E9C38B inset;
                        }
                    }

                    .shops-w-cont {
                        width: 100%;
                        height: 100%;
                        background: #F9D6A3;
                        box-shadow: 0px 3px 0px 0px #E9C38B inset;
                        border-radius: .2rem;
                        padding: .2rem;
                    }

                    .shops-wc-tit {
                        display: inline-block;
                        height: .36rem;
                        line-height: .36rem;
                        padding: 0 .2rem 0 .5rem;
                        color: #fff;
                        font-size: .22rem;
                        border-radius: .24rem;
                        background: #E19F63 url(http://download.pceggs.com:8080/xjyx/egg/img/shop_gold_bg1.png) no-repeat left center;
                        background-size: auto 100%;
                        margin-bottom: .2rem;
                    }

                    .shops-wc-cont {
                        height: 4.3rem;
                        overflow-y: scroll;

                        .shops-wc-item {
                            width: 100%;
                            height: 1.32rem;
                            background: #FFEFD8;
                            border-radius: .2rem;
                            margin-bottom: .2rem;
                            padding: 0 .2rem;
                            overflow: hidden;
                            align-items: center;

                            .item-left {
                                max-width: .6rem;
                                // line-height: .9rem;
                            }

                            .item-center {
                                padding-left: .2rem;
                                width: 2.7rem;

                                .item-c-top {
                                    height: .5rem;
                                    align-items: center;

                                    .c-top-1 {
                                        color: #6F4818;
                                        font-size: .24rem;
                                    }

                                    .c-top-num {
                                        background: #C3854D;
                                        font-size: .2rem;
                                        padding: 0 .1rem;
                                        border-radius: .2rem;
                                        color: #fff;
                                        margin-left: .12rem;
                                    }
                                }

                                .item-c-bot {
                                    color: #D9A564;
                                    font-size: .22rem;
                                    line-height: .3rem;
                                }
                            }

                            .item-right {
                                max-width: 1.5rem;
                            }

                            img {
                                width: 100%;
                            }
                        }

                        // .shops-wc-item>div {
                        //     float: left;
                        //     overflow: hidden;
                        //     height: .9rem;
                        // }
                    }

                    .wc-cont-act {
                        height: 4.7rem;
                    }
                }
            }
        }
    }
</style>