<template>
  <div class="mint-tabbar" :class="{
      'is-fixed': fixed, 'has-bottombar': isIphoneX
    }">
    <slot></slot>
  </div>
</template>

<script>
/**
 * mt-tabbar
 * @module components/tabbar
 * @desc 底部 tab，依赖 tab-item
 * @param {boolean} [fixed=false] - 固定底部
 * @param {*} value - 返回 item component 传入的 id
 *
 * @example
 * <mt-tabbar v-model="selected">
 *   <mt-tab-item id="订单">
 *     <img slot="icon" src="http://placehold.it/100x100">
 *     <span slot="label">订单</span>
 *   </mt-tab-item>
 * </mt-tabbar>
 *
 * <mt-tabbar v-model="selected" fixed>
 *   <mt-tab-item :id="['传入数组', '也是可以的']">
 *     <img slot="icon" src="http://placehold.it/100x100">
 *     <span slot="label">订单</span>
 *   </mt-tab-item>
 * </mt-tabbar>
 */
export default {
  name: 'mt-tabbar',
  data () {
    return {
      isIphoneX: false
    }
  },

  props: {
    fixed: Boolean,
    value: {}
  },

  created() {
    // iphoneX且在微信浏览器中时底部增加安全区
    const ua = navigator.userAgent.toLowerCase()
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      this.isIphoneX = /iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375)
    }
  }

};
</script>

<style lang="css">
  @import "../../../src/style/var.css";

  @component-namespace mint {
    @component tabbar {
      background-image:linear-gradient(180deg, $color-grey, $color-grey 50%, transparent 50%);
      background-size: 100% 1px;
      background-repeat: no-repeat;
      background-position: top left;
      position: relative;
      background-color: $tabbar-background-color;
      display: flex;
      position: absolute * 0 0 0;
      text-align: center;

      @when fixed {
        position: fixed * 0 0 0;
        z-index: $z-index-normal;
      }

      > .mint-tab-item.is-selected {
        background-color: $tabbar-tab-item-selected-background-color;
        color: $tabbar-tab-item-selected-color;
      }
    }
  }
  
  @media only screen and (device-width: 375px) and (device-height: 812px) and
  (-webkit-device-pixel-ratio: 3) {
      /*增加底部适配层*/
      .has-bottombar {
          /* height: 100%; */
          box-sizing: border-box;
          padding-bottom: 34px;
          &:after {
              content: '';
              z-index: 9998;
              position: fixed;
              left: 0;
              bottom: 0;
              width: 100%;
              height: 34px;
          }
      }
  }
</style>
