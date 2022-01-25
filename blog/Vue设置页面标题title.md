## Vue设置页面标题title

- router下index.js文件设置头信息

  ```js
  export default new Router({
    mode: 'history',
    routes: [
      {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
          title: '登录页面'
        }
      },
      {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
          title: '首页'
        },
        children: [
            {
            name: 'users',
            path: 'users',
            component: Users,
            meta: {
              title: '用户管理'
            },
            ...
        ]
      }
    ]
  })
  ```

- 在main.js配置

  ```js
  import router from './router'
  router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
      document.title = to.meta.title
    }
    next()
  })
  ```

## Vue配置浏览器头部小图标

- 在index.html引入：

  ```html
  <link rel="icon" href="static/fav.png" type="image/x-icon">
  ```

- static/fav.png为图片路径。