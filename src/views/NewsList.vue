<template>
	<div class="page-container">
		<!-- 顶部资讯 -->
		<section class="top_news">
			<div class="bg_dark-400 p-3">
				<h4 class="text_yellow fs_18 m-0">今日资讯</h4>
				<h5 class="fs_22 m-0 mt-3">{{topNewsTitle}}</h5>
				<div class="text-right">
					<van-button class="mt-4" color="#FE2C58">查看资讯</van-button>
				</div>
			</div>
		</section>
		<!-- 资讯列表 -->
		<section class="mt-4">
			<h4 class="fs_18 m-0">资讯列表</h4>
			<div class="mt-3">
				<template v-for="(news,index) in newsList">
					<van-row :gutter="15" type="flex" class="mb-3" @click="goNewsDetail(news)">
					  <van-col>
					  	<van-image width="100" height="100" :src="news.imgUrl" />
					  </van-col>
					  <van-col class="d-flex flex-wrap align-content-between">
					  	<div class="fs_16 font-weight-normal">{{news.newsTitle}}</div>
					  	<span class="fs_12 font-weight-normal bg_dark-400 pt-2 pb-2 pl-3 pr-3 opacity-60">{{news.newsTime}}</span>
					  </van-col>
					</van-row>
				</template>
			</div>
		</section>
	</div>
</template>

<script>
	export default {
		name: '',
		data () {
			return {
				topNewsTitle:"抖音年度最大黑马你猜是谁？",
				newsList:[
					{
						imgUrl:"https://img.yzcdn.cn/vant/cat.jpeg",
						newsTitle:"抖音怎么推，今天老师来教你，07月7日，教学走起",
						newsTime:"2020-07-07 12:00",
					},
					{
						imgUrl:"https://img.yzcdn.cn/vant/cat.jpeg",
						newsTitle:"抖音怎么推，今天老师来教你，07月7日，教学走起",
						newsTime:"2020-07-07 12:00",
					},
					{
						imgUrl:"https://img.yzcdn.cn/vant/cat.jpeg",
						newsTitle:"抖音怎么推，今天老师来教你，07月7日，教学走起",
						newsTime:"2020-07-07 12:00",
					},
				]
			}
		},
		components: {},
		methods:{
			goNewsDetail(news){
				console.log(news);
			},
		},
	}
</script>

<style>

</style>