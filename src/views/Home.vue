<template>
	<div class="bg_global">
    <!-- header -->
    <!-- <header-back :navTitle="this.$route.meta.title" :isLeft="false"></header-back> -->
    <!-- body -->
    <div class="page p-3">
    	<router-view v-if="isRouterAlive"></router-view>
    </div>
    <!-- footer -->
    <footer-nav></footer-nav>
	</div>
</template>

<script>
	import HeaderBack from '@/components/Header'
  import FooterNav from '@/components/Footer'
	export default {
		name: 'Home',
		// 点击页面底部菜单栏重载功能的实现（该处提供了提供给后代组件的数据/方法）
    provide() {
      return{
        reload: this.reload
      }
    },
		data () {
			return {
				isRouterAlive:true,
			}
		},
		components: {
			HeaderBack,
			FooterNav,
		},
		mounted(){

		},
		methods:{
			//页面重新载入函数
			reload () {
				this.isRouterAlive = false;
				this.$nextTick(function () {
					this.isRouterAlive = true
				})
			}
		},
	}
</script>

<style>

</style>