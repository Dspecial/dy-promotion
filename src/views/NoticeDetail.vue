<template>
	<div>
		我是公告详细页面
	</div>
</template>

<script>
	export default {
		name: 'NoticeDetail',
		data () {
			return {
				id:"",
			}
		},
		components: {},
		mounted(){
			this.id = this.$route.query.id;
			console.log(this.id);
		},
		methods:{

		},
	}
</script>

<style>

</style>