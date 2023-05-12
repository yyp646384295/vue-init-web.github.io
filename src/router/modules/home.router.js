let home = {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
        title: '首页',
        // 该模块需要token
        token: false,
        // 是否进行页面缓存
        keepAlive: false,
    },
};

export default {
    home,
};
