<template>
    <!-- 攻略 -->
    <div class="raiders">
        <div class="navbar flex-bt" v-if="raider">
            <div class="nav-left" @click="raider"></div>
            <div class="nav-center">蛋蛋庄园-攻略</div>
            <div class="nav-right"></div>
        </div>
        <img src="http://download.pceggs.com:8080/xjyx/egg/raider/strategy1.jpg" alt="">
        <img src="http://download.pceggs.com:8080/xjyx/egg/raider/strategy2.jpg" alt="">
        <img src="http://download.pceggs.com:8080/xjyx/egg/raider/strategy3.jpg" alt="">
    </div>
</template>

<script>
    export default {
        name: "",
        props: ['raider'],
    }
</script>

<style lang='less' scoped>
    .raiders {
        position: fixed;
        z-index: 100;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        overflow: scroll;
        .navbar{
            background: rgba(255, 255, 255, 0.2);
        }

        img {
            width: 100%;
        }
    }
</style>