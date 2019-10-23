<template>
  <div class="g-news-wrap">
    <swipe class="g-news-list" :auto="4000" :showIndicators="false" :orientation="'vertical'">
      <mt-swipe-item class="g-news-box" v-for="item in data" :key="item.id">
        <a-tag-link :href="item.url" class="g-news-link">
          <lazy-component @show="handler(item.article_id)" class="float-box-img">
            <img v-lazy="item.cover_s" class="img">
          </lazy-component>
          <span class="float-box-info">{{item.title}}</span>
        </a-tag-link>
      </mt-swipe-item>
    </swipe>
  </div>
</template>

<script>
import swipe from './swipe/Swipe.vue'
import ATagLink from 'src/components/ATagLink.vue'
import { homeApi } from 'src/config/api.js'
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
    data: Array,
    url: String
  },
  filters: {
    getUrl: function (id) {
      return '/article/' + id
    }
  },
  methods: {
    handler (id) {
      this.$http.get(homeApi.artBarrageExpose, {params: {
        article_ids: id
      }}).then(function (response) {
        const _data = response.data
        if (_data.code === 1) {
          console.log('====文章统计====',id)
        }
      }, function (response) {
        console.log(response)
      })
    }
  }
}
</script>

<style lang="less" scoped>
@news-height: .68rem;
@news-width: 5.1rem;
@bg: rgba(0,0,0,.5);
@txt-color: #fff;
@txt-size: 14px;
.g-news-wrap{
  box-sizing: border-box;
  height: @news-height;
  margin: 0 .22rem;
  background-color: @bg;
  border-radius: .3rem;
}
.g-news-list{
  position: relative;
  width: @news-width;
  padding-left: 0;
  padding-right: 0;
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
  & .g-news-link {
    height: 100%;
    box-sizing: border-box;
    display: flex;
    color: @txt-color;
  }
  .float-box-img {
    width: @news-height;
    height: @news-height;
    border-radius: 50%;
    overflow: hidden;
    .img {
      width: 100%;
      height: auto;
    }
  }
  .float-box-info {
    flex: 1;
    line-height: @news-height;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: @txt-size;
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>
