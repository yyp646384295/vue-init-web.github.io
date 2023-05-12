/**
 * 路由守卫 页面级权限
 */
import router from './index';
import store from '@/store';

/**
 * @params1 去哪里
 * @params2 从哪来
 * @params3 是否通过
 * to.mate.token : 查找去的页面需不需要token
 */
router.beforeEach((to, from, next) => {
    //未登录
    if (!store.state.token) {
        // 需要登录的模块，没有token 跳转到home页
        if (to.meta.token) {
            next({
                path: '/',
            });
        } else {
            next();
        }
    } else {
        // 跳转路由之前全局加载
        next();
    }
});
router.afterEach((to, from) => {
});
