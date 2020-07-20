<template>
	<div class="page-container">
		<!-- banner -->
		<section class="data_ban banner">
			<p class="fs_14 c_date text_pink-400 m-0">
				<span class="mr-1">{{currentdate}}</span>收益数据
			</p>
		</section>

		<!-- data -->
		<section class="mt-4 promotion-tabs">
			<van-tabs type="card" @click="onTabClick">
			  <van-tab v-for="(tab,index) in dataTabCard" :key="index" :title="tab.title" class="data_tab_content">
			  	<!-- ITEM -->
			  	<div class="mt-4">
				  	<template v-for="(cell,j) in tab.content">
				  		<van-row type="flex" justify="space-between" align="center" class="pt-2 pb-2 pl-3 pr-3 mb-3 data_item bg_dark-400">
				  			<van-col :span="2" class="text-center data_sort mr-3">
				  				<span class="d-block">{{j+1}}</span>
				  			</van-col>
				  			<van-col :span="11" class="d-flex align-items-center">
				  				<van-image width="40" height="40" round :src="cell.userAvatar" />
				  				<span class="ml-3">{{cell.userName}}</span>
				  			</van-col>
				  			<van-col :span="11" class="text-right">
				  				<div class="text_yellow fs_18"><span class="mr-1">{{cell.amount}}</span>元</div>
				  			</van-col>
				  		</van-row>	
				  	</template>
			  	</div>
			  	<!-- /ITEM -->
			  </van-tab>
			</van-tabs>
		</section>

	</div>
</template>

<script>
	export default {
		name: 'index',
		data () {
			return {
				currentdate:'',
				dataTabCard:[
					{
						title:"免费用户",
						content:[
							{
								userAvatar:"https://img.yzcdn.cn/vant/cat.jpeg",
								userName:"张三",
								amount:"112565.00"
							},
							{
								userAvatar:"https://img.yzcdn.cn/vant/cat.jpeg",
								userName:"李四",
								amount:"10256.02"
							},
							{
								userAvatar:"https://img.yzcdn.cn/vant/cat.jpeg",
								userName:"王五",
								amount:"10256.02"
							},
							{
								userAvatar:"https://img.yzcdn.cn/vant/cat.jpeg",
								userName:"周六",
								amount:"10256.02"
							},
							{
								userAvatar:"https://img.yzcdn.cn/vant/cat.jpeg",
								userName:"张三",
								amount:"112565.00"
							},
							{
								userAvatar:"https://img.yzcdn.cn/vant/cat.jpeg",
								userName:"张三",
								amount:"112565.00"
							},
							{
								userAvatar:"https://img.yzcdn.cn/vant/cat.jpeg",
								userName:"李四",
								amount:"10256.02"
							},
							{
								userAvatar:"https://img.yzcdn.cn/vant/cat.jpeg",
								userName:"王五",
								amount:"10256.02"
							},
							{
								userAvatar:"https://img.yzcdn.cn/vant/cat.jpeg",
								userName:"周六",
								amount:"10256.02"
							},
							{
								userAvatar:"https://img.yzcdn.cn/vant/cat.jpeg",
								userName:"张三",
								amount:"112565.00"
							},
						]
					},
					{
						title:"付费会员",
						content:[
							{
								userAvatar:"https://img.yzcdn.cn/vant/cat.jpeg",
								userName:"李四",
								amount:"10256.02"
							},
							{
								userAvatar:"https://img.yzcdn.cn/vant/cat.jpeg",
								userName:"王五",
								amount:"10256.02"
							},
							{
								userAvatar:"https://img.yzcdn.cn/vant/cat.jpeg",
								userName:"周六",
								amount:"10256.02"
							},
						]
					},
				],
			}
		},
		components: {},
		mounted(){
			this.getNowFormatDate();
		},
		methods:{
			getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        this.currentdate = currentdate;
    	},
    	// tab切换
    	onTabClick(name,title){
				this.$toast(name);
			},
		},
	}
</script>

<style>

</style>