import axios from 'axios';
import store from '@/store';
import errorCode from '@/utils/errorCode';
import {tansParams} from '@/utils/index';

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';
// 创建axios实例
const service = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    baseURL: process.env.VUE_APP_URL,
    // 超时
    timeout: 60000,
});

// request拦截器
service.interceptors.request.use(
    config => {
        // 是否需要设置 token
        const token = store.getters.token;
        // 是否需要防止数据重复提交
        const isRepeatSubmit = (config.headers || {}).repeatSubmit === false;
        if (token) {
            config.headers['X-Requested-With'] = 'XMLHttpRequest';
            config.headers['Authorization'] = token; // 让每个请求携带自定义 token 请根据实际情况自行修改
        }
        // get请求映射params参数
        if (config.method === 'get' && config.params) {
            let url = config.url + '?' + tansParams(config.params);
            url = url.slice(0, -1);
            config.params = {};
            config.url = url;
        }
        return config;
    },
    error => {
        // console.log(error);
        Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    res => {
        // 未设置状态码则默认成功状态
        if (res.data.code === 'true') res.data.code = 200;
        const code = res.data.code || 200;
        // 获取错误信息
        const msg = errorCode[code] || res.data.msg || errorCode['default'];
        // 二进制数据则直接返回
        if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
            return res.data;
        }
        // 401:未登录  200:正常返回；400:登录出错
        if (code === 401 || code === 403) {
            console.log('未登录或登陆超时！请重新登录');
            store.dispatch('LogOut').then(() => {
            })

        } else if (code === 500) {
            // Notify({type: 'danger', message: msg});
            return Promise.reject(new Error(msg));
        } else if (code === 101) {
            return res.data;
        } else if (code !== 200) {
            // Notify({type: 'danger', message: msg});
            return Promise.reject('error');
        } else {
            return res.data;
        }
    },
    error => {
        console.log('err' + error);
        let {message} = error;
        if (message === 'Network Error') {
            message = '后端接口连接异常';
        } else if (message.includes('timeout')) {
            message = '系统接口请求超时';
        } else if (message.includes('Request failed with status code')) {
            message = '系统接口' + message.substr(message.length - 3) + '异常';
        }
        // Notify({type: 'danger', message: message});
        return Promise.reject(error);
    }
);

export default service;
