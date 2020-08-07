/*
* @Author: dxx
* @Email: dxxtalking@163.com
* @Date:   2020-07-14 13:38:48
* @Last Modified by:   dxx
* @Last Modified time: 2020-08-07 17:48:45
*/

import Vue from 'vue'
import Vuex from 'vuex'

//挂载Vuex
Vue.use(Vuex);

//创建VueX对象
const store = new Vuex.Store({
  state:{
    // 全局的调用接口时的loading 效果,暂时用不到，直接在axios里面用了toast组件了
    LOADING:false,
  },
  mutations: {
    showLoading(state){
      state.LOADING = true    
    },
    hideLoading (state) {
      state.LOADING = false
    },
	},
  getters: {

  },
  actions: {
 
  }
})

export default store;