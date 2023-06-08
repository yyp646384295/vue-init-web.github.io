export default {
    // 定义数据
    state: {
        userInfo: ''
    },
    // 同步方法
    mutations: {
        setUserInfo(state, val) {
            state.userInfo = val
        }
    },
    // 异步方法
    actions: {
        setUserInfoAsync(context, val) {
            context.commit('setUserInfo', val)
        }
    },
    // 命名空间 (模块化中必不可少)
    // 命名空间的作用：为了让当前vuex模块里面的状态名和函数名和其他空间的命名不产生冲突
    namespaced: true,
}