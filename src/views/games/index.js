/* eslint-disable no-new */
import Vue from 'vue'
// import VueRouter from 'vue-router'
import axios from '../../config/http.js'
// import 'mint-ui/lib/style.css'
import App from './App'
// import Mint from 'mint-ui'
// import VueLazyload from 'vue-lazyload'
// import routes from './routes.js'
// import store from './store.js'
// import { imgHttpsSrc } from '../../utils/utils.js'


// Vue.config.debug = true
// Vue.config.devTools = true

Vue.prototype.$http = axios
Vue.prototype.$loading = function (type) {
  document.getElementById('loading').style.display = type == 'show' ? 'block' : 'none';
}
// 注册全局过滤器
// Vue.filter('imgHttpsSrc', imgHttpsSrc)

// Vue.use(VueRouter)
// Vue.use(Mint)
// Vue.use(VueLazyload, {
//   lazyComponent: true,
//   listenEvents: [ 'scroll', 'transitionend' ],
//   error: 'http://wechat-1253215910.cossh.myqcloud.com/js/articleImg/img_jz.png',
//   loading:'http://wechat-1253215910.cossh.myqcloud.com/js/articleImg/img_jz.png'
// })


// 引入mint组件
// import Cell from 'src/mintui/packages/cell'
// import Spinner from 'src/mintui/packages/spinner'
// import Swipe from 'src/mintui/packages/swipe'
// import SwipeItem from 'src/mintui/packages/swipe-item'
// import Tabbar from 'src/mintui/packages/tabbar'
// import TabItem from 'src/mintui/packages/tab-item'
// import TabContainer from 'src/mintui/packages/tab-container'
// import TabContainerItem from 'src/mintui/packages/tab-container-item'
// import InfiniteScroll from 'src/mintui/packages/infinite-scroll'
// import Lazyload from 'src/mintui/packages/lazyload'
import Toast from 'src/mintui/packages/toast'
// import Loadmore from 'src/mintui/packages/loadmore';
// import Popup from 'src/mintui/packages/popup';

// Vue.component(Popup.name, Popup); 
// Vue.component(Loadmore.name, Loadmore);
// Vue.component(Cell.name, Cell)
// Vue.component(Spinner.name, Spinner)
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.component(Tabbar.name, Tabbar)
// Vue.component(TabItem.name, TabItem)
// Vue.component(TabContainer.name, TabContainer)
// Vue.component(TabContainerItem.name, TabContainerItem)
// Vue.use(InfiniteScroll)
Vue.$toast = Vue.prototype.$toast = Toast

// 载入router配置
// let router = new VueRouter({
//   mode: '',
//   routes: routes
// })

// router.beforeEach((to, from, next) => {
//   if (to.meta.title) {
//     document.title = to.meta.title
//   }
//   next()
// })
new Vue({
  el: '#app',
  // router,
  // store,
  render: h => h(App)
})