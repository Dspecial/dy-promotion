/*
* @Author: dxx
* @Email: dxxtalking@163.com
* @Date:   2020-07-21 09:54:12
* @Last Modified by:   dxx
* @Last Modified time: 2020-07-30 15:50:06
*/
import axios from 'axios'; // 引入axios
import qs from 'qs'; //qs是一个url参数转化（parse和stringify）的js库
import globalVarable from '@/core/global_variable.js';
import VueCookies from 'vue-cookies';
import router from '@/router/index.js';
import { Toast } from 'vant'; // 用来显示调用接口后"加载中..."的提示

axios.defaults.timeout = 20000; //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; //配置请求头
axios.defaults.baseURL = ''; //配置接口地址

let loadingInstance;
//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
	// loading效果
  loadingInstance  = Toast.loading({
	  message: '加载中...',
	  forbidClick: true,
	  loadingType: 'spinner',
	});
  //在发送请求之前做某件事
  if (config.method === 'post') {
    //config.data.token = VueCookies.get("token");
    config.data.token = "123456"; // 写死用户token
    config.headers.token = 'dd3e2f22a9e9f2dcf14c32628268963b'; //写死token

    config.data = qs.stringify(config.data);
    config.url = globalVarable.baseURL + config.url

   /* if (config.url.indexOf("/") == -1) {
      config.url = globalVarable.baseURL + "/client/invoke?transcode=" + config.url;
    } */

    if (config.url.indexOf("?") == -1) {
      config.url = config.url + "?_=" + new Date().getTime();
    } else {
      config.url = config.url + "&_=" + new Date().getTime();
    }
  }
  return config;
}, (error) => {
  console.log('错误的传参')
  return Promise.reject(error);
});

//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) => {
  loadingInstance.clear();// 关闭loading效果
  if (res.data.code == -99) {
    VueCookies.remove("token");
    VueCookies.remove("user_code");
    router.push("/login");
    return false;
  } else {
    return Promise.resolve(res.data);
  }
}, (error) => {
  loadingInstance.clear(); // 关闭loading效果
  return Promise.reject("请求数据异常...");
});


/**
 * 返回一个Promise(封装post请求)
 * @param url
 * @param params
 * @returns {Promise}
 */
export function post(url, params) {
  if (typeof(params) == "undefined"){
      params = {}
  }
  return  new Promise((resolve, reject) => {
     axios.post(url, params)
      .then(response => {
        resolve(response);
      }, err => {
        reject(err);
      })
      .catch((error) => {
        reject(error)
      })
  })
}


/**
 * 返回一个Promise(封装get方法)
 * @param url
 * @param param
 * @returns {Promise}
 */
export function get(url, param) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: param
    })
    .then(response => {
      resolve(response)
    }, err => {
      reject(err)
    })
    .catch((error) => {
      reject(error)
    })
  })
}

 /**
 * 返回一个Promise(封装patch请求)
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url, param){
  return new Promise((resolve,reject) => {
    axios.patch(url,param)
   	.then(response => {
    	resolve(response);
   	},err => {
    	reject(err)
   	})
   	.catch((error) => {
      reject(error)
    })
  })
}

 /**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put(url, param){
  return new Promise((resolve,reject) => {
    axios.patch(url,param)
   	.then(response => {
    	resolve(response);
   	},err => {
    	reject(err)
   	})
   	.catch((error) => {
      reject(error)
    })
  })
}

export default {
  post,
  get,
  patch,
  put
}
