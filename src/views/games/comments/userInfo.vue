<template>
    <!-- 任务列表 -->
    <div class="fixed userinfo" @click.stop="_selfClose()">
        <div :class="'list-cont userinfo-cont center '+ (popUp?'list-pop-up':'list-pop-down')" @click.stop>
            <div class="list-title userinfo-title center">小鸡档案</div>
            <div class="list-list userinfo-list center" v-if="closeList.userInfos">
                <div class="u-content">
                    <div class="u-item u-name flex-left">
                        <p>姓名：</p>
                        <p>{{closeList.userInfos.nickname}}</p>
                    </div>
                    <div class="u-item u-name flex-left">
                        <p>年龄：</p>
                        <p>{{closeList.userInfos.age}}</p>
                    </div>
                    <div class="u-item u-name flex-left">
                        <p>生日：</p>
                        <p>{{closeList.userInfos.birth}}</p>
                    </div>
                    <div class="u-item u-name flex-left">
                        <p>星座：</p>
                        <p>{{closeList.userInfos.constellation}}</p>
                    </div>
                    <div class="u-item u-name flex-left">
                        <p>血型：</p>
                        <p>{{closeList.userInfos.bloodtype}}</p>
                    </div>
                    <div class="u-exp flex-bt">
                        <div class="u-exp-left">{{closeList.userInfos.dlevel}}：</div>
                        <div class="u-exp-cont">
                            <div class="u-exp-pro"
                                :style="'width:'+(_fullNumber2(closeList.userInfos.experience,closeList.userInfos.nextexp))">
                            </div>
                        </div>
                        <div class="u-exp-right">{{closeList.userInfos.experience}}/{{closeList.userInfos.nextexp}}
                        </div>
                    </div>
                    <div class="u-imgs">
                        <img :src="closeList.userInfos.imgurl" alt="">
                    </div>
                </div>
                <div class="u-txt">成长值超过<span>{{closeList.userInfos.rank || 0}}</span>的小伙伴啦！</div>
            </div>
            <div class="list-close userinfo-close" @click="_selfClose"></div>
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
            }
        },
        watch: {
            'closeList.userShow': function () {
                this.popUp = this.closeList.userShow;
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
            _fullNumber2: function (min, max) {
                let num = parseInt(min / max * 100);
                num = num + '%';
                return num
            },
        },
    }
</script>


<style lang='less' scoped>
    .userinfo {
        .userinfo-list {
            width: 5.6rem;
            padding: 0;
            color: #6F4818;
            font-size: .26rem;

            .u-content {
                width: 100%;
                height: 5.8rem;
                background: #F9D6A3;
                box-shadow: 0px 3px 0px 0px #E9C38B inset;
                border-radius: .2rem;
                padding: .3rem .3rem 0;
            }

            .u-item {
                line-height: .76rem;

                p:nth-child(1) {
                    width: .9rem;
                }

                p:nth-child(2) {
                    width: 1.7rem;
                    border-bottom: 1px solid #EDA956;
                }
            }

            .u-txt {
                line-height: 1rem;
                text-align: center;

                span {
                    color: #FF3415;
                }
            }

            .u-exp {
                width: 100%;
                height: 1rem;
                line-height: 1rem;

                .u-exp-cont {
                    width: 3rem;
                    height: .32rem;
                    border-radius: .16rem;
                    overflow: hidden;
                    border: 1px solid #986339;
                    background: #986339;
                    box-sizing: content-box;
                    margin: auto 0;

                    .u-exp-pro {
                        height: 100%;
                        border-radius: .16rem;
                        background: #FFCE39;
                    }
                }
            }

            .u-imgs {
                width: 1.84rem;
                height: 2.72rem;
                position: absolute;
                top: .5rem;
                right: .3rem;
                img{
                    width:100%;
                    height: auto;
                }
            }
        }
    }
</style>