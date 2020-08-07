<template>
  <div id="app">
    <router-view  v-wechat-title="$route.meta.title"/>
  </div>
</template>

<script>
import axios from 'axios';
import { mapMutations } from 'vuex';
export default {
  name: 'App',
  data () {
    return {
      isWechat:true,// 是否为微信环境（true：是；false：否）
      wx:{
        wxAppId:"",// 微信公众号 ID
        wxSecret:"",// 微信公众号 密钥
        host:"",
        protocol:"",
        invite_code:"", // 邀请码
        code:"", // 授权获取的 code

        openid:"", // 授权获取的 openid
        unionid:"",// 授权获取的用户唯一标识 unionid
      },
      query:{
        a:"",
        b:"",
      },
    }
  },
  components: {},

  created(){
    // 检测是浏览器端还是微信端
    let ua = navigator.userAgent.toLowerCase();
    if (String(ua.match(/MicroMessenger/i)) === 'micromessenger') {
      console.log("微信环境");
      this.isWechat = true;

      this.wx.host = document.domain;
      this.wx.protocol = document.location.protocol;
      this.wx.invite_code = this.getQueryVariable('invite_code');
      this.wx.code = this.getQueryVariable('code');
    } else {
      console.log("网页环境");
      this.isWechat = false;
    }
  },
  mounted(){
    this.getwxConfig();
  },
  methods: {
    // 获取微信公众号配置
    getwxConfig(){
      this.MyAxios.post("/api/wechat/base/get_wx_config",{
      }).then(data => {
        if (data.code == 0) {
          this.wx.wxAppId = data.data[0].value; // 拿到微信公众号 ID
          this.wx.wxSecret = data.data[1].value; // 拿到微信公众号 密钥
          this.handleAuthorize();
        } else {
          this.$notify({
            message: data.msg,
            type: 'warning'
          });
        }
      })
    },
    // 微信授权登录 /api/wechat/wechat/get_wx_user
    getwxUser(){
      axios.get('http://dy.weilaixxjs.cn/api/wechat/wechat/get_wx_user', { 
        headers:{
          'Content-Type':'application/json;charset=utf8',
          'token':'dd3e2f22a9e9f2dcf14c32628268963b'
        },//设置header信息
        params: {
          code:this.wx.code,
          invite_code:this.wx.invite_code,
        },
      })
      //成功返回
      .then(response => {
        this.VueCookies.set('usertoken', response.data.token);
      })
      //失败返回
      .catch(error => {
          console.log(error);
      })
    },

    getQueryVariable(variable){
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
      }
      return(false);
    },

    /**
     * 微信公众号获取code及授权处理
     * 注意：页面路径上的自定义带参不要使用code和state，授权时会根据这两个参数处理逻辑
     * 再授权成功，并重定向之后，微信会在重定向路径上带上code和state参数
     */
    handleAuthorize () {
      /**
       * 判断是否是微信环境
       * 是微信环境：进行授权处理
       * 不是微信环境：不进行授权处理
       */
      if (!this.isWechat) return;
      /**
       * 判断是否有 微信公众号 ID和密钥
       * 该判断根据个人情况，决定是否需要
       * 一般如果需要前端传给后台接口则需要；如果不需要前端传给后台接口则不需要
       */
      if (!this.wx.wxAppId || !this.wx.wxSecret) return;
      /**
       * 这里使用了vant框架，这条代码是loading展示
       * 可根据个人情况设置
       */
      this.$toast.loading({
        message: '微信授权中...',
        forbidClick: true,
      });
      /**
       * 检查页面路径带参状况,以此来判断是否授权
       * 授权成功后：重定向路径上会带有相应的参数（code、state）
       * 授权前：页面路径上不会带有code、state参数（个人自定义参数最好不要使用这两个）
       */
      let pagePath = decodeURIComponent(window.location.href); // 页面路径
      let urlArray = pagePath.split('?');
      let WXAuthorize = window.localStorage.getItem('hasAuthorize') || false; // 是否已经微信网页授权
      let redirectQuery = ''; // 重定向自定义传参
      
      // 判断初始路径（授权前）上是否带参，以便之后写入重定向路径中
      // if (urlArray.length > 1) {
      //   // 带参情况
      //   let query = urlArray[1].split('#')[0].split('&');
        
      //   query.forEach((item) => {
      //     let queryName = item.split('=')[0];
      //     let queryValue = item.split('=')[1];

      //     /**
      //      * 判断是授权后的重定向，还是授权前
      //      * true：已授权；false：未授权
      //      */
      //     if (WXAuthorize) {
      //       if (queryName === 'state' && queryValue !== 'authorize') {
      //         // 获取自定义参数
      //         let customQuery = queryValue.split('|');
              
      //         customQuery.forEach((queryItem) => {
      //           let customName = queryItem.split('=')[0];
      //           let customValue = queryItem.split('=')[1];

      //           /**
      //            * 这里根据自己的实际带参情况进行判断
      //            * 以原始 https://www.baidu.com?a=1&b=2 路径为例
      //            */
      //           this.query[customName] = customValue;
      //         });
      //       } else if (queryName === 'code') {
      //         // 获取微信授权后的code 
      //         this.wx.code = queryValue;
      //       }
      //     } else {
      //       this.query[queryName] = queryValue;
      //     }
      //   });
      // }
      
      // 判断是否已经微信授权
      if (WXAuthorize) {
        /**
         * 在授权成功后，将缓存中的授权成功记录清除
         * hasAuthorize：
         * authorize：已授权
         * 没有该字段：未授权
         */
        window.localStorage.removeItem('hasAuthorize');
        /**
         * 通过code换取openid等信息
         * 授权成功，获取code值后的逻辑，根据自己的实际情况编写
         */
        this.getwxUser();

        return false;
      } else {
        /**
         * 缓存记录页面初始（即授权前）路径
         * 主要用于解决在页面手动刷新时，微信授权问题
         */
        !window.localStorage.getItem('WXAuthorizeUrl') && window.localStorage.setItem('WXAuthorizeUrl', window.location.href);
        // 缓存记录已授权
        window.localStorage.setItem('hasAuthorize', 'authorize');
        // 处理重定向带参
        for (let i in this.query) {
          if (redirectQuery) {
            redirectQuery += `|${i}=${this.query[i]}`;
          } else {
            redirectQuery += `${i}=${this.query[i]}`;
          }
        }
      }
      
      // 微信授权路径
      let WXAuthorizeUrl = window.localStorage.getItem('WXAuthorizeUrl');
      // 微信公众号 ID
      let appid = this.wx.wxAppId;
      let invite_code = this.wx.invite_code;
      // 授权后重定向的回调链接地址，请使用 urlEncode 对链接进行处理
      // let redirectUri = encodeURIComponent(WXAuthorizeUrl);
      let redirectUri = this.wx.protocol+'//'+this.wx.host+'/index.html?invite_code='+this.wx.invite_code;
      // 返回类型，请填写code
      let responseType = 'code';
      /**
       * 应用授权作用域 snsapi_base、snsapi_userinfo
       * snsapi_base：不弹出授权页面，直接跳转，只能获取用户openid（静默授权）
       * snsapi_userinfo：弹出授权页面，可通过openid拿到昵称、性别、所在地。并且， 即使在未关注的情况下，只要用户授权，也能获取其信息
       */
      let scope = 'snsapi_userinfo';
      // 重定向后会带上state参数，开发者可以填写a-zA-Z0-9的参数值，最多128字节
      let state = redirectQuery || 'authorize';
      // 授权路径
      //let authorizeUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + redirectUri + '&response_type=' + responseType + '&scope=' + scope + '&state=' + state + '&connect_redirect=1#wechat_redirect';

      let authorizeUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appid + "&redirect_uri=" + redirectUri + "&response_type=code&scope=snsapi_userinfo&state=STATE&invite_code=" + invite_code + "&connect_redirect=1#wechat_redirect";

      // 进行授权操作，获取code信息(code作为换取access_token的票据，每次用户授权带上的code将不一样，code只能使用一次，5分钟未被使用自动过期)
      window.location.href = authorizeUrl;
    },

  }
}
</script>
<style>
  html{
    height: 100%;
    padding: 0;
    margin: 0
  }
  body{
    padding: 0;
  }
	#app {
    height: 100%;
	}
  .no-auth{
    background: #191926;
    color:#fff;
  }
</style>