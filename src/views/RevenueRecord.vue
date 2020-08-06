<template>
	<div class="page-container">
		<section class="bg_dark-400 p-3">
			<van-row type="flex" align="center" justify="space-between">	
				<van-col>
					<!-- 日期下拉选择 -->
					<vant-field-date
						class="nei_datePicker bg_dark-300"
					  v-model="currentDate"
					  type="year-month"
					  :placeholder="'请选择想要查看的日期'"
					  :min-date="minDate"
					  :max-date="maxDate"
					  @change="onChange"
					/>
				</van-col>
				<van-col class="text-right">
					<h5 class="m-0 fs_12 font-weight-normal text_yellow-600">待发放</h5>
					<p class="m-0 fs_18 mt-2 text_yellow-600">+{{release}}</p>
				</van-col>
			</van-row>
		</section>

		<!-- 收益记录 -->
		<section class="mt-3">
			<div v-if="mounthlyRecords.length == 0" class="opacity-60 text-center">暂无收益</div>
			<template v-for="(cell,index) in mounthlyRecords">
				<van-row type="flex" align="center" justify="space-between" class="mb-3 bg_dark-400 p-3">	
					<van-col>
						<h5 class="m-0 fs_16">收益</h5>
						<p class="m-0 fs_12 mt-2 font-weight-normal opacity-60">{{cell.date}}</p>
					</van-col>
					<van-col>
						<p class="m-0 fs_18">+{{cell.money}}</p>
					</van-col>
				</van-row>
			</template>
		</section>
		
	</div>
</template>

<script>
	import VantFieldDate from '@/components/VantFieldDate'
	export default {
		name: 'RevenueRecord',
		data () {
			return {
				minDate: new Date('2020/01'),
	      maxDate: new Date(),
	      currentDate: "2020-08",
				release:"600.00",
				mounthlyRecords:[
				],
			}
		},
		components: {
			VantFieldDate,
		},
		mounted(){
			this.onload();
			this.getRevenue();
		},
		methods:{
			// 获取月份
			onload(){
				this.MyAxios.post("/api/wechat/income/record",{

				}).then(data => {
					if (data.code == 0) {
						var lastDate = data.data.month_list[data.data.month_list.length - 1];
						var changeDate = lastDate.replace("-","/"); 
						this.minDate = new Date(changeDate);
						this.currentDate = data.data.month_list[0];
					} else {
						this.$notify({
              message: data.msg,
              type: 'warning'
            });
					}
				})
			},
			// 获取收益记录
			getRevenue(date){
				this.MyAxios.post("/api/wechat/income/record",{
					date:date,
				}).then(data => {
					if (data.code == 0) {
						this.release = data.data.sum_money;
						this.mounthlyRecords = data.data.list;
					} else {
						this.$notify({
              message: data.msg,
              type: 'warning'
            });
					}
				})
			},
			// 日期下拉框值发生改变以后，@change 是接收的子组件的方法
			onChange(val1,val2,val3){ // val1是毫秒数，val2是原始值，val3是格式过的"yyyy-MM-dd"
				this.getRevenue(val3);
				this.currentDate = val3;
			},
		}
	}
</script>

<style>

</style>