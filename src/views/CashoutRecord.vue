<template>
	<div class="page-container">
		<section class="bg_dark-400 p-3">
			<van-row type="flex" align="center" justify="space-between">	
				<van-col>
					<h5 class="m-0 fs_16">已提现总金额</h5>
				</van-col>
				<van-col class="text-right">
					<p class="m-0 fs_18 text_pink-400">{{cashout}}</p>
				</van-col>
			</van-row>
			<div class="fs_12 text_yellow-400 font-weight-normal mt-2">月提现金额超过5000元，平台代收取信息服务费6%</div>
		</section>

		<!-- 收益记录 -->
		<section class="mt-3">
			<template v-for="(cell,index) in mounthlyRecords">
				<van-row type="flex" align="center" justify="space-between" class="mb-3 bg_dark-400 p-3">	
					<van-col>
						<h5 class="m-0 fs_16">提现</h5>
						<p class="m-0 fs_12 mt-2 font-weight-normal opacity-60">{{cell.date}}</p>
					</van-col>
					<van-col>
						<p class="m-0 fs_18">-{{cell.money}}</p>
					</van-col>
				</van-row>
			</template>
		</section>
		
	</div>
</template>

<script>
	export default {
		name: 'WithdrawalRecord',
		data () {
			return {
				cashout:"600.00",
				mounthlyRecords:[
					{
						date:"2020-07-01",
						money:"100.00"
					},
					{
						date:"2020-07-02",
						money:"100.00"
					},
					{
						date:"2020-07-03",
						money:"100.00"
					},
					{
						date:"2020-07-04",
						money:"100.00"
					},
					{
						date:"2020-07-05",
						money:"100.00"
					},
				],
			}
		},
		components: {

		},
		methods:{
			// 日期下拉框值发生改变以后，@change 是接收的子组件的方法
			onChange(val1,val2,val3){ // val1是毫秒数，val2是原始值，val3是格式过的"yyyy-MM-dd"
				console.log(val3);
			},
		}
	}
</script>

<style>

</style>