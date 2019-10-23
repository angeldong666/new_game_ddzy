<template>
  <!-- 侧边栏(左)) -->
  <div class="sidel">
    <div class="item" v-for="(item,index) in iconList" :key="index" @click="_showNone">
      <img :src="item.img" :alt="item.name">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'sidel',
    props: [],
    data() {
      return {
        iconList: [{
          name: '集市',
          img: 'http://download.pceggs.com:8080/xjyx/egg/img/t-jishi.png',
          img2: '',
          id: 0,
        }],
      }
    },
    methods: {
      _showNone: function name() {
        try {
          android.goExchange()
        } catch (error) {
          try {
            // window.webkit.messageHandlers.goWork.postMessage();
            window.goExchange()
          } catch (error) {
            console.log('h5')
          }
        }
        // this.$toast('敬请期待')
      }
    },
  }
</script>


<style lang='less' scoped>
  .sidel {
    width: 1.08rem;
    overflow: hidden;
    position: fixed;
    left: .3rem;
    top: 2.6rem;
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