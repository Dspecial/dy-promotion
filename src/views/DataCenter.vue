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
				  				<van-image width="40" height="40" round :src="cell.avatar" />
				  				<span class="ml-3">{{cell.name}}</span>
				  			</van-col>
				  			<van-col :span="11" class="text-right">
				  				<div class="text_yellow fs_18"><span class="mr-1">{{cell.money}}</span>元</div>
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
								// avatar: "http://dy.weilaixxjs.cn/uploads/20200805/541431a83d05535a742872d62dd2c93a.jpg",
								// createtime: 1596722618,
								// id: 2,
								// is_vip: "1",
								// is_vip_text: "Is_vip 1",
								// money: "5115.83",
								// name: "sam2",
								// updatetime: 1596722618,
							},
						]
					},
					{
						title:"付费会员",
						content:[
						]
					},
				],
			}
		},
		components: {},
		mounted(){
			//this.getNowFormatDate(); //不需要了，从后台获取
			this.onLoad();
		},
		methods:{

			onLoad(){
				this.MyAxios.post("/api/wechat/ranking/index",{

				}).then(data => {
					if (data.code == 0) {
						this.currentdate = data.data.title;
						this.dataTabCard[0].content = data.data.is_free_list;
						this.dataTabCard[1].content = data.data.is_vip_list;
					} else {
						this.$notify({
              message: data.msg,
              type: 'warning'
            });
					}
				})
			},
			// 当天日期
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
				//this.$toast(name);
			},
		},
	}
</script>

<style>

</style>