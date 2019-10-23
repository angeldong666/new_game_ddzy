<template>
    <!-- 任务列表 -->
    <div class="fixed task" @click.stop="_selfClose()">
        <div :class="'list-cont task-cont center '+ (popUp?'list-pop-up':'list-pop-down')" @click.stop>
            <div class="list-title task-title center">饲料任务列表</div>
            <div class="list-list task-list center">
                <div class="task-item flex-bt" v-for="(item,index) in closeList.taskList" :key="index">
                    <div class="item-left">
                        <div class="left-name">{{item.taskname}}</div>
                        <div class="left-num">{{item.foodnum}}</div>
                    </div>
                    <div class="item-right" @click="closeList._taskGoldData(item.taskid,item.status,item.tasktype)">
                        <div :class="'right-btn ' +(_btnStyle(item.status,item.tasktype))"></div>
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
                list: []
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
            _btnStyle: function (type,type2) {
                /*
                status : 0 去试玩,去邀请 { tasktype: 1 去试玩, 2 去邀请 }
                         1 去领取
                         2 已领取
                */
                switch (type) {
                    case 0:
                        if (type2 == 1) {
                        return 'btn-hide'
                            
                        }else{
                        return 'btn-hide2'

                        }
                        break;
                    case 1:
                        return 'btn-get'
                        break;
                    case 2:
                        return 'btn-act'
                        break;
                    default:
                        break;
                }
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

                .task-item {
                    width: 100%;
                    height: 1.33rem;
                    background: #F9D6A3;
                    box-shadow: 0px 3px 0px 0px #E9C38B inset;
                    border-radius: .2rem;
                    padding: .3rem;
                    margin-bottom: .2rem;

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
                        }

                        .left-num::before {
                            display: block;
                            content: '';
                            width: .45rem;
                            height: .5rem;
                            background: url(http://download.pceggs.com:8080/xjyx/egg/img/s2.png) no-repeat;
                            background-size: 100% auto;
                            position: absolute;
                            top: -.07rem;
                            left: -.05rem;
                        }
                    }

                    .item-right {
                        .right-btn {
                            width: 1.52rem;
                            height: 100%;
                        }

                        .btn-hide {
                            background: url(http://download.pceggs.com:8080/xjyx/egg/img/b5.png) no-repeat center;
                            background-size: 100% auto;
                        }
                        .btn-hide2 {
                            background: url(http://download.pceggs.com:8080/xjyx/egg/img/b8.png) no-repeat center;
                            background-size: 100% auto;
                        }
                        .btn-get {
                            background: url(http://download.pceggs.com:8080/xjyx/egg/img/b7.png) no-repeat center;
                            background-size: 100% auto;
                        }

                        .btn-act {
                            background: url(http://download.pceggs.com:8080/xjyx/egg/img/b3.png) no-repeat center;
                            background-size: 100% auto;
                        }
                    }
                }
            }
        }

    }
</style>