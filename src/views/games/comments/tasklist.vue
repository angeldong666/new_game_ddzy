<template>
    <!-- 任务列表 -->
    <div class="fixed task" @click.stop="_selfClose()">
        <div :class="'list-cont task-cont center '+ (popUp?'list-pop-up':'list-pop-down')" @click.stop>
            <div class="list-title task-title center">饲料任务列表</div>
            <div class="list-list task-list center">
                <div class="task-nav flex-left">
                    <div :class="'task-n-hide ' + (navtab==1?'task-n-act':'')" @click="_navChange(1)">饲料任务</div>
                    <div :class="'task-n-hide ' + (navtab==2?'task-n-act':'')" @click="_navChange(2)">道具卡任务</div>
                    <div :class="'task-n-hide ' + (navtab==3?'task-n-act':'')" @click="_navChange(3)">我的道具</div>
                </div>
                <div class="task-nav-list">
                    <div style="width:100%;height:100%;overflow-y: scroll;">
                        <!-- 饲料 -->
                        <div class="task-item"
                            v-for="(item,index) in (navtab==1 ? closeList.taskList.TaskList_food : (navtab==2 ? closeList.taskList.TaskList_prop : closeList.taskList.TaskList_mine))"
                            :key="index">
                            <!-- 列表 -->
                            <div class="item2 flex-bt" v-show="navtab == 1 || navtab == 2">
                                <div class="item-left">
                                    <div class="left-name">{{item.taskname}}</div>
                                    <div class="left-num">{{item.foodnum}}<img class="center2" :src="item.imgurl"
                                            alt="">
                                    </div>
                                </div>
                                <div class="item-right"
                                    @click="closeList._taskGoldData(item.taskid,item.status,item.tasktype)">
                                    <img :src="item.btnimg" alt="">
                                </div>
                            </div>
                            <!-- 我的道具 -->
                            <div class="item3 flex-bt" v-show="navtab == 3">
                                <div class="item-left"><img :src="item.img" alt="">
                                </div>
                                <div class="item-center">
                                    <div class="item-c-top flex-left">
                                        <span class="c-top-1">{{item.name}}</span>
                                        <span class="c-top-num">{{item.total}}张</span>
                                    </div>
                                    <div class="item-c-bot">{{item.explain}}</div>
                                </div>
                                <div class="item-right" @click="closeList._shopMethods('my2',item.type,item.isallow)">
                                    <img :src="item.btnimg" alt="">
                                </div>
                            </div>
                            <!-- <div v-if="item.status == 0 && item.tasktype == 2" class="item-share"></div> -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="list-close task-close" @click="_selfClose"></div>
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
                list: [],
                navtab: 1,
            }
        },
        watch: {
            'closeList.taskShow': function () {
                this.popUp = this.closeList.taskShow;
            }
        },
        mounted() {

        },
        methods: {
            _navChange: function (index) {
                let that = this;
                that.navtab = index;

            },
            _selfClose: function () {
                let that = this;
                that.popUp = false;
                let times = setTimeout(() => {
                    that.closeList._closeList();
                    clearTimeout(times)
                }, 600);
            }
        },
    }
</script>


<style lang='less' scoped>
    .task {
        .task-cont {
            .task-list {
                width: 5.8rem;
                overflow: hidden;
                position: relative;
                padding: 0;
                padding-top: .7rem;
                // box-shadow: 0px 3px 0px 0px #E9C38B inset;
                border-radius: .2rem;

                .task-nav {
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
                    z-index: 1;

                    .task-n-act {
                        height: .9rem;
                        background: #F9D6A3;
                        color: #6F4818;
                        box-shadow: 0px 3px 0px 0px #E9C38B inset;
                        font-weight: bold;
                    }

                    .task-n-hide {
                        width: 30%;
                        border-top-left-radius: .2rem;
                        border-top-right-radius: .2rem;
                        font-size: .26rem;
                    }
                }

                .task-nav-list {
                    padding: .3rem;
                    width: 100%;
                    height: 100%;
                    box-shadow: 0px 3px 0px 0px #E9C38B inset;
                    border-radius: .2rem;
                    background: #F9D6A3;

                    .task-item {
                        width: 100%;
                        background: #FFEFD8;
                        border-radius: .2rem;
                        margin-bottom: .2rem;
                        align-items: center;
                        position: relative;

                        .item2 {
                            width: 100%;
                            overflow: hidden;
                            padding: .3rem;
                            align-items: center;


                            .item-left {
                                .left-name {
                                    font-size: .26rem;
                                    color: #6F4818;
                                    line-height: .3rem;
                                    margin: auto 0;
                                }

                                .left-num {
                                    width: 1.6rem;
                                    height: .36rem;
                                    line-height: .36rem;
                                    background: #D59459;
                                    position: relative;
                                    border-radius: .2rem;
                                    text-align: center;
                                    padding-left: .3rem;
                                    color: #fff;
                                    margin-top: .16rem;
                                    font-size: .22rem;

                                    img {
                                        width: .46rem;
                                        height: auto;
                                        left: -.1rem;
                                        -ms-transform: translate(0, -50%);
                                        -moz-transform: translate(0, -50%);
                                        -o-transform: translate(0, -50%);
                                        transform: translate(0, -50%);
                                    }
                                }
                            }

                            .item-right {
                                width: 1.52rem;

                                img {
                                    width: 100%;
                                }
                            }

                        }

                        .item3 {
                            width: 100%;
                            overflow: hidden;
                            padding: .3rem;
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


                        .item-share {
                            position: absolute;
                            width: 100%;
                            height: .9rem;
                            background: #fff;
                            left: 0;
                            bottom: -.9rem;
                        }
                    }
                }
            }
        }

    }
</style>