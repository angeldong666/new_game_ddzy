<template>
    <!-- 金蛋弹窗 -->
    <div class="pop-gold">
        <div class="gold-cont center2">
            <div class="gold-title">获得金蛋</div>
            <div class="gold-number">{{reciveEgg.reciveGoldMsg || 0}}</div>
            <div class="gold-img center">
                <img :src="img" alt="">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "",
        props: ['reciveEgg'],
        data() {
            return {
                img: 'http://download.pceggs.com:8080/xjyx/egg/img/w9.png'
            }
        },
        mounted() {
            let that = this;
            let times = setInterval(() => {
                that.reciveEgg._closeRecivePop()
                clearTimeout(times)
            }, 3000);

        },
        methods: {

        },
    }
</script>

<style lang='less' scoped>
    .pop-gold {
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        z-index: 100;

        .gold-cont {
            width: 2.6rem;
            min-height: 3.2rem;
            background: rgba(0, 0, 0, 0.8);
            border-radius: .1rem;
            text-align: center;
            padding: .3rem;

            .gold-title {
                color: #fff;
                font-size: .32rem;
                line-height: .4rem;
            }

            .gold-number {
                color: #FFE400;
                font-size: .46rem;
                line-height: .6rem;
            }

            .gold-img {
                position: absolute;
                bottom: .2rem;
                width: 90%;

                img {
                    width: 100%;
                }
            }
        }
    }
</style>