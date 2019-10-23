<template>
  <div class="g-news-wrap">
    <div class="g-news-title">
      <a-tag-link :href="listUrl"></a-tag-link>
    </div>
    <swipe class="g-news-list" :auto="4000" :showIndicators="false" :orientation="'vertical'">
      <mt-swipe-item class="g-news-box" v-for="item in data" :key="item.id">
        <a-tag-link class="g-news-link" :href="item.article_id | getUrl">{{item.title}}</a-tag-link>
      </mt-swipe-item>
    </swipe>
  </div>
</template>

<script>
import swipe from './swipe/Swipe.vue'
import ATagLink from 'src/components/ATagLink.vue'
export default {
  components: {
    swipe,
    ATagLink
  },
  data () {
    return {
    }
  },
  props: {
    listUrl: String,
    data: Array,
    url: String
  },
  filters: {
    getUrl: function (id) {
      return '/article/' + id
    }
  }
}
</script>

<style lang="less" scoped>
@news-height: .72rem;
.g-news-wrap{
  box-sizing: border-box;
  height: @news-height;
  margin: 0 .22rem;
  display: flex;
  align-items: center;
  background-color: #f7f7f7;
  border-radius: .3rem;
}
.g-news-title {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: .24rem;
  padding-right: .2rem;
  border-right: 1px solid #ccc;
  a{
    display: block;
    width: 1.36rem;
    height: .42rem;
    font-size: 15px;
    line-height: .42rem;
    font-weight: normal;
    color: #010101;
    background: url(//ojn81nujc.qnssl.com/1502696494zx.png?imageslim) no-repeat center center;
    background-size: 100% auto;
    span {
      margin-left: 2px;
      padding: 2px;
      color: #fff;
      background-color: #ff6222;
      border-radius: 5px;
    }
  }
}
.g-news-list{
  position: relative;
  flex: 1;
  padding-left: .2rem;
  padding-right: .2rem;
  color: #333333;
  overflow: hidden;
  & .g-news-box {
    position: absolute;
    display: none;
    width: 100%;
    height: 100%;
    // background-color: #fff;
    &.is-active {
      display: block;
    }
  }
  .g-news-link {
    box-sizing: border-box;
    display: block;
    line-height: @news-height;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 16px;
    color: #333;
  }
}
</style>
