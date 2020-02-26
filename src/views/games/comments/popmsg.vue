<template>
    <!-- 弹窗 -->
    <div class="fixed pop">
        <div :class="'fixed-center center2 pop-cont'">
            <div class="pop-title center">{{msgData.title}}</div>
            <!-- 弹窗提示 -->
            <div class="pop-text egg-msg">
                <div class="name-tip" v-html="msgData.msg"></div>
                <div class="pop-btn" @click="gotoGame()"></div>
            </div>
            <div class="pop-close" @click="_closePop()"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "popmsg",
        props: ['msgData'],
        data() {
            return {

            }
        },
        methods: {
            _closePop: function () {
                this.$emit('_closePopShow')
            },
            gotoGame: function () {
                this.$emit('_gotoGamecc')
            }
        },
    }
</script>

<style lang='less' scoped>
    .pop {
        z-index: 101;

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
                line-height: .9rem;
            }

            .pop-text {
                width: 100%;
                height: 100%;
                padding: 1.5rem .9rem .8rem;
            }

            .pop-btn {
                width: 3.23rem;
                height: .94rem;
                margin: .5rem auto 0;
                background: url(https://wechat-1253215910.cos.ap-shanghai.myqcloud.com/dbzzl/btnqty01.png) no-repeat;
                background-size: 100% 100%;
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