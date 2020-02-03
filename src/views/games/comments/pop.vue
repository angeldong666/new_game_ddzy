<template>
    <!-- 弹窗 -->
    <div class="fixed pop">
        <div :class="'fixed-center center2 pop-cont'">
            <div class="pop-title center">{{setName.popTitle}}</div>
            <!-- 新人首次取名 -->
            <div class="pop-text egg-name" v-show="setName.popType == 1">
                <div class="name-tip" v-html="txt1"></div>
                <div class="name-input">
                    <input type="text" v-model="inputName" placeholder="输入你的宠物昵称">
                </div>
                <div class="pop-btn name-btn" @click="_setName(inputName)"></div>
            </div>
            <!-- 弹窗提示 -->
            <div class="pop-text egg-msg" v-show="setName.popType == 2">
                <div class="name-tip" v-html="setName.popDleve"></div>
                <div class="pop-btn enter-btn" @click="setName._closePop('name')"></div>
            </div>
            <!-- 弹窗提示 -->
            <div :class="'pop-text egg-msg '  + (setName.popType == 3?'pop-text3':'') " v-show="setName.popType == 3">
                <div class="name-tip" v-html="setName.popccMsg"></div>
                <div class="pop-btn enter-btn enter-btn3" @click="setName._closePop('gotocc')"></div>
            </div>
            <div class="pop-close" v-show="setName.popType != 3" @click="setName._closePop('name')"></div>
            <div class="pop-close" v-show="setName.popType == 3" @click="setName._closePop('namecc')"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "",
        props: ['setName'],
        data() {
            return {
                txt1: '欢迎主人首次来蛋蛋庄园，给你的小鸡起个名字吧～',
                txt2: '<p>小鸡升至LV1啦！</p><p>记得<font color="#FF4B27">领取孵化的鸡蛋</font>可兑换抽奖</p>',
                inputName: '',
            }
        },
        methods: {
            _setName: function (str) {
                let that = this;
                if (str == '') {
                    return that.$toast('昵称不能为空！')
                }
                that.setName._changeName(str)
            },
        },
    }
</script>

<style lang='less' scoped>
    .pop {
        .pop-cont {
            width: 6.28rem;
            min-height: 4.72rem;
            background: url(http://download.pceggs.com:8080/xjyx/egg/img/p1.png) no-repeat;
            background-size: 100% 100%;

            .pop-title {
                width: 4.23rem;
                height: 1.71rem;
                background: url(http://download.pceggs.com:8080/xjyx/egg/img/t1.png) no-repeat;
                background-size: 100% 100%;
                top: -.4rem;
                font-size: .35rem;
                text-align: center;
                color: #FFE3A7;
                line-height: .8rem;
            }

            .pop-text {
                width: 100%;
                height: 100%;
                padding: 1.3rem .9rem .8rem;
            }

            .pop-text3 {
                width: 100%;
                height: 100%;
                padding: 1.3rem .9rem 0;
            }

            .pop-btn {
                width: 3.23rem;
                height: .94rem;
                margin: .3rem auto 0;
            }

            .egg-name {
                .name-input {
                    width: 100%;
                    height: .84rem;
                    line-height: .84rem;
                    margin-top: .3rem;

                    input {
                        display: block;
                        width: 100%;
                        height: 100%;
                        background: #F9D39A;
                        padding: 0 .2rem;
                        box-sizing: border-box;
                        border: none;
                        border-radius: .1rem;
                        box-shadow: 0px 2px 0px 0px rgba(237, 172, 86, 1) inset;
                        color: #D0A25D;
                        font-size: .26rem;
                    }

                    input::-webkit-input-placeholder {
                        color: #D0A25D;
                    }

                    input:-moz-placeholder {
                        color: #D0A25D;
                    }

                    input::-moz-placeholder {
                        color: #D0A25D;
                    }

                    input:-ms-input-placeholder {
                        color: #D0A25D;
                    }
                }

                .name-btn {
                    background: url(http://download.pceggs.com:8080/xjyx/egg/img/b4.png) no-repeat;
                    background-size: 100% 100%;
                }
            }

            .egg-msg {
                height: 3rem;

                .enter-btn {
                    background: url(http://download.pceggs.com:8080/xjyx/egg/img/b2.png) no-repeat;
                    background-size: 100% 100%;
                    margin-top: .6rem;
                }

                .enter-btn3 {
                    background: url(http://download.pceggs.com:8080/xjyx/egg/img/b19.png) no-repeat;
                    background-size: 100% auto;
                    margin-top: .3rem;
                }
            }

            .pop-close {
                position: absolute;
                width: .91rem;
                height: .97rem;
                background: url(http://download.pceggs.com:8080/xjyx/egg/img/w7.png) no-repeat;
                background-size: 100% auto;
                top: -.2rem;
                right: 0;
            }

            .name-tip {
                font-size: .28rem;
                color: #6F4818;
                line-height: .45rem;
                text-align: center;
            }
        }
    }
</style>