# vue-init-web

### 技术栈

```
vue2+vue-cli5+axios+vuex+webpack
```



### 说明

```markdown
# 1. 引入svg组件使用
<svg-icon icon-class="mode" />

# 2. 路由自动化引入，模块化
模块路由的创建在router/modules下，命名格式为模块名.router.js
事例：
let about = {
    path: '/about',
    name: 'About',
    component: () => import('@/views/AboutView.vue'),
    meta: {
        title: '关于',
        // 该模块需要token
        token: false,
        // 是否进行页面缓存
        keepAlive: false,
    },
};

export default {
    about,
};

# 3. vuex状态管理模块化
在store/modules创建模块文件，然后引入stores/index中的modules即可使用
this.$stores.state.模块名.参数名

# 4. gzip打包优化

# 5. 全局sass样式文件与重置样式表

# 6. 使用lib-flexible与pxtorem来进行自适应
```

