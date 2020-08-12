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
			<div class="fs_12 text_yellow-400 font-weight-normal mt-2">{{remark}}</div>
		</section>

		<!-- 收益记录 -->
		<van-list
			class="mt-3"
		  v-model="loading"
		  :finished="finished"
		  finished-text="没有更多了"
		  @load="onLoad">
			<template v-for="(cell,index) in mounthlyRecords">
				<van-row type="flex" align="center" justify="space-between" class="mb-3 bg_dark-400 p-3">	
					<van-col>
						<h5 class="m-0 fs_16">提现<van-tag plain class="ml-2 font-weight-thin tag_plain">{{cell.deposit_text}}</van-tag></h5>
						<p class="m-0 fs_12 mt-2 font-weight-normal opacity-60">{{cell.createtime}}</p>
					</van-col>
					<van-col>
						<p class="m-0 fs_18">-{{cell.deposit_money}}</p>
					</van-col>
				</van-row>
			</template>
		</van-list>
		
	</div>
</template>

<script>
	export default {
		name: 'WithdrawalRecord',
		data () {
			return {
				page: 0, 
        //limit: 5,
        total: 0, 
				loading: false,
      	finished: false,
				cashout:"",
				remark:"月提现金额超过5000元，平台代收取信息服务费6%",
				mounthlyRecords:[
				],
			}
		},
		components: {

		},
		mounted(){
			this.onLoad();
		},
		methods:{
			onLoad(){
				this.MyAxios.post("/api/wechat/deposit/deposit_record",{

				}).then(data => {
					if (data.code == 0) {
						this.cashout = data.data.my_deposit_sum;
						this.remark = data.data.remark;
						this.mounthlyRecords = data.data.list;
						this.finished = true;// 此处若有分页要重新修改
					} else {
						this.$notify({
              message: data.msg,
              type: 'warning'
            });
					}
				})
			},
		}
	}
</script>

<style>
	.tag_plain{
    background-color: transparent;
    padding: 0 0.2em;
    color: #FFC53D!important;
	}
</style>