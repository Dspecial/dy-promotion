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
				minDate: new Date(2020, 0, 1),
	      maxDate: new Date(),
	      currentDate: "2020-07",
				release:"600.00",
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
			VantFieldDate,
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