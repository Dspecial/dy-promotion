<template>
	<div class="page-container">
		<section class="text-center mt-4">
			<van-icon name="checked" color="#FE2C58" size="110"/>
			<h4 class="m-0 mt-3 fs_20 font-weight-normal">提现申请已提交</h4>
			<p class="m-0 mt-3 fs_16 font-weight-normal">预计两日内到账</p>
		</section>

		<van-row type="flex" align="center" justify="space-between" class="mt-4 bg_dark-400 p-3">
			<van-col>
				<span class="fs_16 font-weight-normal">提现金额</span>
			</van-col>
			<van-col>
				<span class="fs_16 font-weight-normal">{{cash}}元</span>
			</van-col>
		</van-row>

		<section class="mt-4">
	    <van-button size="large" color="#FE2C58" class="border-radius-4 fs_16" @click="complete">完成</van-button>
    </section>
	</div>
</template>

<script>
	export default {
		name: 'CashoutFinished',
		data () {
			return {
				cash:"",
			}
		},
		components: {},
		mounted(){
			this.cash = this.$route.query.cash
		},
		methods:{
			complete(){
				this.$router.go(-1);
			},
		},
	}
</script>

<style>

</style>