<template>
	<div class="page-container">
		<van-tabs v-model="active" class="promotion-tabs2" >
			<template v-for="(income,index) in incomeTab">
			  <van-tab @click="onTabClick">
			  	<template #title><span class="fs_16">{{income.name}}</span></template>
			  	<section class="mt-3">
			  		<!-- 内容 -->
			  		<template v-for="(card,j) in income.contents">
			  			<div class="mb-3 bg_dark-400 p-3">
				  			<van-row :gutter="15" type="flex" align="center">
				  				<van-col>
				  					<van-image round width="40" height="40" :src="card.imgUrl" />
				  				</van-col>
				  				<van-col>
				  					<h5 class="m-0 fs_16">{{card.proTitle}}</h5>
										<p class="fs_12 opacity-60 m-0 mt-2 font-weight-normal">今日访问：{{card.accessTimes}}</p>
				  				</van-col>
				  			</van-row>
				  			<hr class="item_hr" />
				  			<van-row :gutter="5" class="mt-3">
									<van-col :span="8" class="text-center">
										<h5 class="m-0 fs_20">{{card.currentMonth}}</h5>
										<p class="fs_12 opacity-60 m-0 mt-2 font-weight-normal">本月已获得(元)</p>
									</van-col>
									<van-col :span="8" class="text-center">
										<h5 class="m-0 fs_20">{{card.monthForecast}}</h5>
										<p class="fs_12 opacity-60 m-0 mt-2 font-weight-normal">本月预估(元)</p>
									</van-col>
									<van-col :span="8" class="text-center">
										<h5 class="m-0 fs_20">{{card.yesterday}}</h5>
										<p class="fs_12 opacity-60 m-0 mt-2 font-weight-normal">昨日收益(元)</p>
									</van-col>
								</van-row>
			  			</div>
			  		</template>
			  		<!-- /内容 -->
			  	</section>
				</van-tab>
			</template>

		</van-tabs>
	</div>
</template>

<script>
	export default {
		name: 'IncomeStatement',
		data () {
			return {
				active:"1",
				incomeTab:[
					{
						name:"本月收益排序",
						contents:[
							{
								imgUrl:"https://img.yzcdn.cn/vant/cat.jpeg",
								proTitle:"心理评测平台",
								accessTimes:"68",
								currentMonth:"1.12",
								monthForecast:"1.12",
								yesterday:"1.12",
							},
							{
								imgUrl:"https://img.yzcdn.cn/vant/cat.jpeg",
								proTitle:"心理评测平台",
								accessTimes:"68",
								currentMonth:"1.12",
								monthForecast:"1.12",
								yesterday:"1.12",
							},
							{
								imgUrl:"https://img.yzcdn.cn/vant/cat.jpeg",
								proTitle:"心理评测平台",
								accessTimes:"68",
								currentMonth:"1.12",
								monthForecast:"1.12",
								yesterday:"1.12",
							},
						],
					},
					{
						name:"本月收益排序",
						contents:[
							{
								imgUrl:'https://img.yzcdn.cn/vant/apple-2.jpg',
								proTitle:"心理评测平台",
								accessTimes:"68",
								currentMonth:"1.12",
								monthForecast:"1.12",
								yesterday:"1.12",
							},
						],
					},
					{
						name:"昨日收益排序",
						contents:[
							{
								imgUrl:"https://img.yzcdn.cn/vant/cat.jpeg",
								proTitle:"心理评测平台refefe",
								accessTimes:"555",
								currentMonth:"5.12",
								monthForecast:"5.12",
								yesterday:"1.12",
							},
						],
					},
				],
			}
		},
		components: {},
		methods:{
			// tab切换
    	onTabClick(name,title){
				this.$toast(name);
			},
		},
	}
</script>

<style>

</style>