# multiple-pages
> Cooking构建工具搭建的多页面Vue2项目.

- [Vue.js](https://cn.vuejs.org/v2/api/)
- [Vue-Resource](https://github.com/pagekit/vue-resource)
- [Vue-Router](http://router.vuejs.org/zh-cn/)
- [Vuex](http://vuex.vuejs.org/zh-cn/)
- [Cooking](https://github.com/ElemeFE/cooking)
- [Mint-ui](https://github.com/ElemeFE/mint-ui)
- [eslint-config-standard](https://github.com/feross/eslint-config-standard)

## Development

```shell
npm i cooking-cli -g
npm run dev
```

## Production
```
npm run dist
```

## 目录
```
.
├── Makefile
├── README.md
├── app.json
├── build.js
├── cooking.conf.js
├── index.tpl
├── package.json
└── src
    ├── components
    │   ├── swipe
    │   │   ├── Swipe.vue
    │   │   └── SwipeItem.vue
    │   └── toTop.vue
    ├── config
    │   └── api.js
    ├── data
    │   ├── data.js
    │   ├── list.js
    ├── less
    │   └── reset.css
    ├── script
    │   ├── rem-640.js
    │   └── rem-750.js
    ├── store
    │   ├── actions.js
    │   └── store.js
    ├── utils
    │   ├── dom.js
    │   └── utils.js
    └── views
        ├── games
        
```

## 配置

### cooking 配置 `cooking.conf.js` 文件

```
  ...
  sourceMap: true,  // 调试时候方便定位
  ...
  // saladcss是mint按需引入时候的依赖，autoprefixer自动补全
  extends: ['vue2', 'buble', 'less', 'saladcss', 'autoprefixer'],
  ...
```

### cooking 配置 `build.js` 文件
```
exports.templates = function() {
  return App.pages.map(p => {
    return {
      title: p.title,
      filename: p.entry + '.html',
      template: path.resolve(__dirname, 'index.tpl'),
      cdn: merge(App.cdn, p.cdn),
      chunks: ['vendor', 'manifest', p.entry],
      // 添加了html的压缩配置
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        minifyCSS: true
      }
    };
  });
};
```

### 多页面配置 `app.json` 文件

```
{
  // 多页面的配置都在pages里面添加
  "pages": [
    {
      "entry": "name",  // 文件夹名
      "title": "PC蛋蛋app",  // 生成文件的title名
      // 页面中引入的cdn文件，可以是css和js
      "cdn": {
        "js":[
          "750rem.js,640rem.js" // 由于设计那边给出的设计稿尺寸不一致，所以页面会引入不同的rem方案，一般是640和750两种
        ]
      }
    }
  ],
  "basePath": "./src/views/",
  // 公用cdn文件
  "cdn": {
    "js": [
      "https://ojn81nujc.qnssl.com/1487232327vue.min.js"
    ],
    "css": [
      "//cdn.bootcss.com/normalize/5.0.0/normalize.min.css"
    ]
  },
  "externals": {
    "vue": "Vue"
  }
}
```
