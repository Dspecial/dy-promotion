// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import 'vant/lib/index.css'; // 引入vant的样式
import 'vant/lib/icon/local.css';// Icon 组件默认引用有赞 CDN 提供的字体文件。因此引用本地字体，避免去通过网络下载。
import 'swiper/css/swiper.css'; //引入swipe轮播的样式,
import './assets/css/base.scss'; // 基础样式表,引入scss文件，参考 https://blog.csdn.net/ze1024/article/details/100516650
import './assets/css/icomoon/styles.css'; // 阿里图库

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vant from 'vant'; // 引入vant-ui
import VueAwesomeSwiper from 'vue-awesome-swiper';// 扩展的swipe轮播
import { Lazyload } from 'vant';
import VueWechatTitle from 'vue-wechat-title'; // title动态切换
import VueClipboard from 'vue-clipboard2'; // 复制到粘贴板

import VueCookies from 'vue-cookies'; // api: https://github.com/cmp-cc/vue-cookies
import MyAxios from '@/core/Axios.js';
import globalVarable from '@/core/global_variable.js';

Vue.prototype.GLOBAL = globalVarable;
Vue.prototype.VueCookies = VueCookies;
Vue.prototype.MyAxios = MyAxios;

Vue.config.productionTip = false;
Vue.use(Vant);
Vue.use(VueAwesomeSwiper);
Vue.use(Lazyload);
Vue.use(VueWechatTitle);
Vue.use(VueClipboard)
Vue.use(VueCookies);

// Vue.prototype.authToken = function (type){
//   this.MyAxios.post("/client/authToken", {}).then(data => {
//     if (data.code == 0) {
//       if(type =='login'){
//         this.$router.push("/home");
//       }
//     }
//   })
// }

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,  //store:store 和router一样，将我们创建的Vuex实例挂载到这个vue实例中
  components: { App },
  template: '<App/>'
})