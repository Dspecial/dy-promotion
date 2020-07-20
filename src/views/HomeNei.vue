<template>
	<div class="bg_global">
		<!-- header -->
    <header-back :navTitle="this.$route.meta.title" :isLeft="true"></header-back>
    <!-- body -->
    <div class="page_nei p-3">
    	<router-view></router-view>
    </div>
	</div>
</template>

<script>
	import HeaderBack from '@/components/Header'
	export default {
		name: '',
		data () {
			return {}
		},
		components: {
			HeaderBack
		}
	}
</script>

<style>

</style>