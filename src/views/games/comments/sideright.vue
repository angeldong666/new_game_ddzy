<template>
    <!-- 侧边栏(左)) -->
    <div class="sider">
        <div class="item" v-for="(item,index) in iconList" :key="index" @click="rightData._sideRight(index)">
            <img :src="item.img" :alt="item.name">
        </div>
    </div>
</template>

<script>
    export default {
        name: 'sider',
        props: ['rightData'],
        data() {
            return {
                iconList: [{
                    name: '商店',
                    img: 'http://download.pceggs.com:8080/xjyx/egg/img/t-shop.png',
                    img2: '',
                    id: 0,
                }, {
                    name: '装扮',
                    img: 'http://download.pceggs.com:8080/xjyx/egg/img/t-zhuang.png',
                    img2: '',
                    id: 1,
                }, {
                    name: '游戏',
                    img: 'http://download.pceggs.com:8080/xjyx/egg/img/t-game.png',
                    img2: '',
                    id: 2,
                }],
            }
        },
    }
</script>


<style lang='less' scoped>
    .sider {
        width: 1.08rem;
        overflow: hidden;
        position: fixed;
        right: .3rem;
        top: 1.2rem;
        z-index: 9;

        .item {
            width: 1.08rem;
            position: relative;
            margin-bottom: .2rem;

            img {
                width: 100%;
                height: auto;
            }
        }
    }
</style>