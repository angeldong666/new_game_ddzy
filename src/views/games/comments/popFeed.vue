<template>
    <!-- 领取饲料弹窗 -->
    <div class="fixed pop-feed" v-if="popHome">
        <div class="fixed-center center2 feed-cont">
            <div class="feed-title" v-html="popHome.popHomeMsg.takenote"></div>
            <div class="feed-img center">
                <img :src="popHome.popHomeMsg.imgurl" alt="">
                <div class="msg">饲料可以直接喂养小鸡哦~</div>
            </div>
            <div class="feed-btn" @click="popHome._closePopHome()"></div>
            <div class="feed-close" @click="popHome._closePopHome()"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "",
        props: ['popHome'],
        data() {
            return {
                txt: '<p>欢迎加入蛋蛋庄园</p><p>新人获得<font color="#FFF04B">100g饲料</font></p>',
                imgs: 'http://download.pceggs.com:8080/xjyx/egg/img/s1.png'
            }
        },
        mounted() {

        },
        methods: {

        },
    }
</script>

<style lang='less' scoped>
    .pop-feed {
        .feed-cont {
            width: 80%;
            text-align: center;

            .feed-title {
                color: #FFF5C8;
                font-size: .44rem;
                line-height: .6rem;
            }

            .feed-img {
                position: relative;
                width: 3.4rem;
                height: 3.4rem;

                img {
                    width: 100%;
                    height: auto;
                }

                .msg {
                    position: absolute;
                    bottom: -.4rem;
                    left: 0;
                    width: 100%;
                    font-size: .26rem;
                    line-height: .3rem;
                    color: #fff;
                }

            }

            .feed-btn {
                width: 4.29rem;
                height: 1.26rem;
                background: url(http://download.pceggs.com:8080/xjyx/egg/img/b6.png) no-repeat;
                background-size: 100% 100%;
                margin: 1rem auto 0;
            }

            .feed-close {
                width: .6rem;
                height: .6rem;
                background: url(http://download.pceggs.com:8080/xjyx/egg/img/close.png) no-repeat;
                background-size: 100% 100%;
                position: absolute;
                top: -.6rem;
                right: 0;
            }

        }
    }
</style>