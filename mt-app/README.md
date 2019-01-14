# mt-app

> My groovy Nuxt.js project

## Build Setup

``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn run dev

# build for production and launch server
$ yarn run build
$ yarn start

# generate static project
$ yarn run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

nuxt.js使用：

koa使用babel配置：
package.json：
script: dev和start增加: --exec babel-node   安装 babel-cli  babel-preset-es2015
配置.babelrc文件(新增): { "presets": ["es2015"] }

配置默认属性：
nuxt.config.js：
css:  数组里新增'element-ui/lib/theme-chalk/reset.css', 'element-ui/lib/theme-chalk/index.css', 以及自己的默认css 如normalize.css

开启redis: redis-server
开启mongodb: mongod

导入数据库：
mongoimport -d dbs -c test pois.dat
              数据库  数据名  数据源

layouts文件夹(模版)  `<nuxt />`
pages文件夹(路由页面)
  `layout: 'blank'` 依赖blank模版 不填则为default模版
components文件夹(组件文件夹)
store(vuex文件夹)

asyncData()函数中：异步请求的数据 将会直接渲染到html页面中