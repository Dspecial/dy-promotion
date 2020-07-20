<template>
	<div class="page-container purse">
		<section class="p-3 bg_dark-400 balance">
			<van-row type="flex" align="center" justify="space-between">
				<van-col>
					<h5 class="m-0 fs_16 opacity-60 font-weight-normal">可提现余额(元)</h5>
					<p class="m-0 fs_30 mt-3">{{purseBalance}}</p>
				</van-col>
				<van-col>
					<router-link :to="'myCashout'">
						<van-button color="#FE2C58" class="fs_16">申请提现</van-button>
					</router-link>
				</van-col>
			</van-row>
			<p class="m-0 mt-3 text_yellow-400 font-weight-normal">月提现金金额超过5000元，平台代收取信息服务费6%，具体详见<span class="ml-1 mr-1">《xxx结算规则》</span></p>

			<van-row class="mt-2">
				<template v-for="(item,index) in purseInfo">
					<van-col span="8" class="text-center mt-3">
						<h5 class="m-0 fs_14 opacity-60 font-weight-normal">{{item.itemTitle}}</h5>
						<p class="m-0 fs_20 mt-3">{{item.balance}}</p>
					</van-col>
				</template>
			</van-row>
		</section>

		<!-- 记录 -->
		<section class="mt-4">
			<template v-for="(cell,index) in purseRecords">
				<van-cell :border="false" is-link :to="cell.routeLink" class="p-3 bg_dark-400 mb-3">
				  <template #title>
				    <span class="fs_16">{{cell.title}}</span>
				  </template>
				</van-cell>
			</template>
		</section>
	</div>
</template>

<script>
	export default {
		name: 'MyPurse',
		data () {
			return {
				purseBalance:"0.00",
				purseInfo:[
					{
						itemTitle:"总收益(元)",
						balance:"0.00"
					},
					{
						itemTitle:"上月已结算(元)",
						balance:"0.00"
					},
					{
						itemTitle:"上月总收益(元)",
						balance:"0.00"
					},
					{
						itemTitle:"昨日已结算(元)",
						balance:"0.00"
					},
					{
						itemTitle:"本月待结算(元)",
						balance:"0.00"
					},
					{
						itemTitle:"本月总收益(元)",
						balance:"0.00"
					},
				],
				purseRecords:[
					{
						title:"CPM收益记录",
						routeLink:"revenueRecord",
					},
					{
						title:"提现记录",
						routeLink:"cashoutRecord",
					},
					{
						title:"银行卡",
						routeLink:"bankCard",
					},
				],
			}
		},
		components: {}
	}
</script>

<style>

</style>