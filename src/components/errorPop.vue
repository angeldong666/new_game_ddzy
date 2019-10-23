<template>
    <div :class="'error-pop ' + (msg && msg.pop_show?'':'pop-hide')">
        <div class="pop-center center2">
            <div class="pop-content" v-html="(msg && msg.pop_txt || '暂无!')"></div>
            <div class="pop-btn" @click="_closePopBtn" v-show="(msg && msg.pop_btn != '')">{{ msg && msg.pop_btn || ''}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'errorPop',
        props: ['msg'],
        data() {
            return {

            }
        },
        mounted() {
            let that = this;
        },
        methods: {
            _closePopBtn: function () {
                let that = this;
                that.msg ? that.msg.pop_show = false : false;
            }
        }
    }
</script>

<style lang="less" scoped="scoped">
    .error-pop {
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
        z-index: 99;

        .pop-center {
            background: #fff;
            padding: .6rem;
            border-radius: 24px;
            width: 85%;

            .pop-content {
                font-size: .36rem;
                color: #222;
                margin-bottom: .4rem;
                text-align: center;
                line-height: .5rem;
            }

            .pop-btn {
                width: 2rem;
                height: .8rem;
                line-height: .8rem;
                font-size: .3rem;
                margin: 0 auto;
                color: #fff;
                background: #ff5d51;
                border-radius: 8px;
                text-align: center;
            }
        }
    }

    .pop-hide {
        display: none;
    }

    .center2 {
        position: absolute;
        top: 50%;
        left: 50%;
        -ms-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    }
</style>