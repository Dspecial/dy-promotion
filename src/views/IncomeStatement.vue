<template>
	<div class="page-container">
		<van-tabs v-model="active" class="promotion-tabs2"  @click="onTabClick">
			<van-tab>
				<template #title><span class="fs_16">本月收益排序</span></template>
				<section class="mt-3">
		  		<!-- 内容 -->
		  		<template v-for="(card,j) in contents1">
		  			<div class="mb-3 bg_dark-400 p-3">
			  			<van-row :gutter="15" type="flex" align="center">
			  				<van-col>
			  					<van-image round width="40" height="40" :src="card.image" />
			  				</van-col>
			  				<van-col>
			  					<h5 class="m-0 fs_16">{{card.name}}</h5>
									<p class="fs_12 opacity-60 m-0 mt-2 font-weight-normal">今日访问：{{card.views}}</p>
			  				</van-col>
			  			</van-row>
			  			<hr class="item_hr" />
			  			<van-row :gutter="5" class="mt-3">
								<van-col :span="8" class="text-center">
									<h5 class="m-0 fs_20">{{card.current_month_income}}</h5>
									<p class="fs_12 opacity-60 m-0 mt-2 font-weight-normal">本月已获得(元)</p>
								</van-col>
								<van-col :span="8" class="text-center">
									<h5 class="m-0 fs_20">{{card.current_month_maybe_income}}</h5>
									<p class="fs_12 opacity-60 m-0 mt-2 font-weight-normal">本月预估(元)</p>
								</van-col>
								<van-col :span="8" class="text-center">
									<h5 class="m-0 fs_20">{{card.yesterday_income}}</h5>
									<p class="fs_12 opacity-60 m-0 mt-2 font-weight-normal">昨日收益(元)</p>
								</van-col>
							</van-row>
		  			</div>
		  		</template>
		  		<!-- /内容 -->
		  	</section>
			</van-tab>
		  <van-tab>
		  	<template #title><span class="fs_16">昨日收益排序</span></template>
				<section class="mt-3">
		  		<!-- 内容 -->
		  		<template v-for="(card,j) in contents2">
		  			<div class="mb-3 bg_dark-400 p-3">
			  			<van-row :gutter="15" type="flex" align="center">
			  				<van-col>
			  					<van-image round width="40" height="40" :src="card.image" />
			  				</van-col>
			  				<van-col>
			  					<h5 class="m-0 fs_16">{{card.name}}</h5>
									<p class="fs_12 opacity-60 m-0 mt-2 font-weight-normal">今日访问：{{card.views}}</p>
			  				</van-col>
			  			</van-row>
			  			<hr class="item_hr" />
			  			<van-row :gutter="5" class="mt-3">
								<van-col :span="8" class="text-center">
									<h5 class="m-0 fs_20">{{card.yesterday_income}}</h5>
									<p class="fs_12 opacity-60 m-0 mt-2 font-weight-normal">昨日收益(元)</p>
								</van-col>
								<van-col :span="8" class="text-center">
									<h5 class="m-0 fs_20">{{card.current_month_maybe_income}}</h5>
									<p class="fs_12 opacity-60 m-0 mt-2 font-weight-normal">本月预估(元)</p>
								</van-col>
								<van-col :span="8" class="text-center">
									<h5 class="m-0 fs_20">{{card.current_month_income}}</h5>
									<p class="fs_12 opacity-60 m-0 mt-2 font-weight-normal">本月已获得(元)</p>
								</van-col>
							</van-row>
		  			</div>
		  		</template>
		  		<!-- /内容 -->
		  	</section>
		  </van-tab>
		 	<van-tab>
		  	<template #title><span class="fs_16">总收益排序</span></template>
				<section class="mt-3">
		  		<!-- 内容 -->
		  		<template v-for="(card,j) in contents3">
		  			<div class="mb-3 bg_dark-400 p-3">
			  			<van-row :gutter="15" type="flex" align="center">
			  				<van-col>
			  					<van-image round width="40" height="40" :src="card.image" />
			  				</van-col>
			  				<van-col>
			  					<h5 class="m-0 fs_16">{{card.name}}</h5>
									<p class="fs_12 opacity-60 m-0 mt-2 font-weight-normal">今日访问：{{card.views}}</p>
			  				</van-col>
			  			</van-row>
			  			<hr class="item_hr" />
			  			<van-row :gutter="5" class="mt-3">
								<van-col :span="8" class="text-center">
									<h5 class="m-0 fs_20">{{card.current_month_income}}</h5>
									<p class="fs_12 opacity-60 m-0 mt-2 font-weight-normal">本月已获得(元)</p>
								</van-col>
								<van-col :span="8" class="text-center">
									<h5 class="m-0 fs_20">{{card.yesterday_income}}</h5>
									<p class="fs_12 opacity-60 m-0 mt-2 font-weight-normal">昨日收益(元)</p>
								</van-col>
								<van-col :span="8" class="text-center">
									<h5 class="m-0 fs_20">{{card.all_money}}</h5>
									<p class="fs_12 opacity-60 m-0 mt-2 font-weight-normal">当前总收益(元)</p>
								</van-col>
							</van-row>
		  			</div>
		  		</template>
		  		<!-- /内容 -->
		  	</section>
		  </van-tab>
		</van-tabs>
	</div>
</template>

<script>
	export default {
		name: 'IncomeStatement',
		data () {
			return {
				active:"1",
				contents1:[],
				contents2:[],
				contents3:[],
			}
		},
		components: {},
		mounted(){
			this.onLoad('1');// 默认展示本月收益排序
		},
		methods:{
			onLoad(type){
				this.MyAxios.post("/api/wechat/income/index",{
					type:type,
				}).then(data => {
					if (data.code == 0) {
						if(type == 1){
							this.contents1 = data.data;
						}else if(type == 2){
							this.contents2 = data.data;
						}else if(type == 3){
							this.contents3 = data.data;
						}
					} else {
						this.$notify({
              message: data.msg,
              type: 'warning'
            });
					}
				})
			},
			// tab切换
    	onTabClick(name,title){
    		this.onLoad(name+1);
			},
		},
	}
</script>

<style>

</style>