export default [
    {
      path: '/',
      name: 'home',
      meta:{
        title:"蛋",
      },
      component: resolve => require(['./home.vue'], resolve)
    }
  ]
  