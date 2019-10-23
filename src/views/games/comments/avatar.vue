<template>
    <!-- 头像 -->
    <div class="avatar" v-if="userInfo.chickInfo" @click="userInfo._showList(3)">
        <div class="msg">
            <div class="name">{{userInfo.chickInfo.nickname || '未命名'}}</div>
            <div class="gold">{{userInfo.chickInfo.goldeggs || 0}}</div>
        </div>
        <div class="level">Lv.{{(userInfo.chickInfo.dlevel >= 0 ? userInfo.chickInfo.dlevel : 0) || 0}}</div>
    </div>
</template>

<script>
    export default {
        props: ['userInfo'],
        data() {
            return {

            }
        },
        mounted() {

        },
        methods: {

        }
    }
</script>

<style lang='less' scoped>
    .avatar {
        width: 3.61rem;
        height: 1.2rem;
        background: url(http://download.pceggs.com:8080/xjyx/egg/img/m1.png) no-repeat;
        background-size: 100% auto;
        position: fixed;
        top: 1rem;
        left: .3rem;
        color: #fff;
        z-index: 9;

        .msg {
            width: 100%;
            height: 100%;
            text-align: right;
            font-size: .22rem;
            padding: .22rem .4rem 0 0;
            line-height: .4rem;

        }

        .level {
            min-width: .8rem;
            height: .28rem;
            font-size: .24rem;
            position: absolute;
            bottom: -.1rem;
            left: .2rem;
            background: rgba(0, 0, 0, 0.4);
            text-align: center;
            line-height: .28rem;
            border-radius: .14rem;
        }
    }
</style>