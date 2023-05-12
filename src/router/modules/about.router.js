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
