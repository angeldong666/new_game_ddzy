<template>
    <!-- 任务列表 -->
    <div class="fixed task" @click.stop="_selfClose()">
        <div :class="'list-cont task-cont center '+ (popUp?'list-pop-up':'list-pop-down')" @click.stop>
            <div class="list-title task-title center">饲料任务列表</div>
            <div class="list-list task-list center">
                <div class="task-item flex-bt" v-for="(item,index) in closeList.taskList" :key="index">
                    <div class="item-left">
                        <div class="left-name">{{item.taskname}}</div>
                        <div class="left-num">{{item.foodnum}}<img class="center2" :src="item.imgurl" alt=""></div>
                    </div>
                    <div class="item-right" @click="closeList._taskGoldData(item.taskid,item.status,item.tasktype)">
                        <img :src="item.btnimg" alt="">
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
                    background: #F9D6A3;
                    box-shadow: 0px 3px 0px 0px #E9C38B inset;
                    border-radius: .2rem;
                    padding: .3rem;
                    margin-bottom: .2rem;
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
            }
        }

    }
</style>