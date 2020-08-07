<template>
	<div class="bg_global">
		<!-- header -->
    <!-- <header-back :navTitle="this.$route.meta.title" :isLeft="true"></header-back> -->
    <!-- body -->
    <div class="page_nei p-3">
    	<router-view v-if="isRouterAlive"></router-view>
    </div>
	</div>
</template>

<script>
	import HeaderBack from '@/components/Header'
	export default {
		name: '',
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
			HeaderBack
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