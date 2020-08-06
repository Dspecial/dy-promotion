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
				purseBalance:"",
				purseInfo:[
					{
						itemTitle:"总收益(元)",
						balance:""
					},
					{
						itemTitle:"上月已结算(元)",
						balance:""
					},
					{
						itemTitle:"上月总收益(元)",
						balance:""
					},
					{
						itemTitle:"昨日已结算(元)",
						balance:""
					},
					{
						itemTitle:"本月待结算(元)",
						balance:""
					},
					{
						itemTitle:"本月总收益(元)",
						balance:""
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
		components: {},
		mounted(){
			this.onLoad();
		},
		methods:{
			onLoad(){
				this.MyAxios.post("/api/wechat/user/my_wallet",{
				}).then(data => {
					//console.log(data);
					if (data.code == 0) {
						this.purseBalance = data.data.all_can_deposit;
						this.purseInfo[0].balance = data.data.all_money;
						this.purseInfo[1].balance = data.data.last_end_money;
						this.purseInfo[2].balance = data.data.last_all_money;
						this.purseInfo[3].balance = data.data.yesterday_money;
						this.purseInfo[4].balance = data.data.current_month_loading_money;
						this.purseInfo[5].balance = data.data.current_month_all_money;
					} else {
						this.$notify({
              message: data.msg,
              type: 'warning'
            });
					}
				})
			},
		},
	}
</script>

<style>

</style>