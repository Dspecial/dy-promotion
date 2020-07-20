<template>
	<van-nav-bar
		fixed
	  :title="navTitle"
	  :left-arrow="isLeft"
	  @click-left="onClickLeft"
	/>
</template>

<script>

	export default {
		name: 'Header',
		data () {
			return {

			}
		},
		components: {

		},
		props:{
			navTitle: { // 标题
	      type: String,
	      default: '测试',
	    },
			isLeft: { // 是否显示返回按钮
	      type: Boolean,
	      default: false,
	    },
		},
    computed:{

    },
		mounted(){

    },
		methods: {
	    onClickLeft() {
	    	if(this.isLeft){
	    		this.$router.go(-1);
	    	}
        
      },
	  }
	}
</script>

<style>

</style>
