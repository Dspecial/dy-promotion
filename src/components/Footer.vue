<template>
  <van-tabbar v-model="active" fixed @change="change(active)" :safe-area-inset-bottom="true" class="footer">
    <template v-for="route in $router.options.routes[1].children" v-if="!route.hidden">
      <van-tabbar-item :to="route.path" @click="tabbarClick(active)">
		 		<template #icon="props">
		      <img :src="props.active ? route.icon.active : route.icon.inactive" />
		    </template>
        <span>{{route.meta.title}}</span>
      </van-tabbar-item>
    </template>
  </van-tabbar>
</template>

<script>
	export default {
		name: 'footer-nav',
    inject: ['reload'], // 注入重载的功能（注入依赖)
		data () {
			return {
				active: 0,
			}
		},
		components: {},
		updated(){
    },
    mounted(){
      this.tabbarActive();
    },
    watch: {
      '$route' (to, from) {// 对路由变化作出响应
        this.tabbarActive();
      }
    },
    methods:{
      // 菜单高亮
      tabbarActive(){ 
        const href = window.location.href.split("#")[1];
        const navBar = this.$router.options.routes[1].children;
        for(let i=0;i<navBar.length;i++){
          if(href==navBar[i].path){
            this.active = i;
          }
        }
      },
      change(active){
        //console.log(active);
      },
      tabbarClick(active){
        // console.log(active);
        this.reload();  // 点击底部菜栏重新载入页面
      },
    }
	}
</script>

<style>
  .footer.van-hairline--top-bottom::after,
  .footer.van-hairline-unset--top-bottom::after{
    border:1px solid #333340;
  }
</style>