<template>
    <!-- 侧边栏(左)) -->
    <div class="sideb flex-left">
        <div class="item" v-for="(item,index) in iconList" :key="index" @click="showList(index)">
            <img :src="item.img" :alt="item.name">
        </div>
    </div>
</template>

<script>
    export default {
        name: 'sideb',
        props: ['showList'],
        data() {
            return {
                iconList: [{
                    name: '好友',
                    img: 'http://download.pceggs.com:8080/xjyx/egg/img/t-you.png',
                    img2: '',
                    id: 0,
                }, {
                    name: '领饲料',
                    img: 'http://download.pceggs.com:8080/xjyx/egg/img/t-ling.png',
                    img2: '',
                    id: 1,
                }, {
                    name: '动态',
                    img: 'http://download.pceggs.com:8080/xjyx/egg/img/t-dongtai.png',
                    img2: '',
                    id: 2,
                }],
            }
        },
        mounted() {

        },
        methods: {

        },
    }
</script>


<style lang='less' scoped>
    .sideb {
        overflow: hidden;
        position: fixed;
        left: .3rem;
        bottom: .5rem;
        z-index: 9;
        height: 1.25rem;
        overflow: hidden;

        .item {
            width: 1.08rem;
            position: relative;
            margin-right: .2rem;

            img {
                width: 100%;
                height: auto;
            }
        }
    }
</style>