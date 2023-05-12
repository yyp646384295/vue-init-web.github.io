import Vue from 'vue';
import VueRouter from 'vue-router';
/**
 * 前端工程自动化导入路由 解决import引入
 * importAll('查找的文件路径'，'是否查找子集','正则查找文件')
 *  /\.router\.js/ 查找.router.js的文件
 *  r.keys() 获取所查找的文件路径 ['./home.router.js', './moduleOne.router.js']
 */
let routerList = [];
function importAll(r) {
  r.keys().forEach(item => {
    let comps = Object.values(r(item).default);
    comps.forEach(comp => {
      routerList.push(comp);
    });
  });
}
importAll(require.context('./modules', false, /\.router\.js/));

Vue.use(VueRouter);
/**
 * 避免重复点击路由报错
 */
const originalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const routes = [...routerList];

const router = new VueRouter({
  mode: 'hash',
  // base: process.env.BASE_URL,
  routes,
});

export default router;
