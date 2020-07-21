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
			<van-list
				class="mt-3"
			  v-model="loading"
			  :finished="finished"
			  finished-text="没有更多了"
			  @load="onLoad">
				<template v-for="(news,index) in newsList">
					<van-row :gutter="15" type="flex" class="mb-3" @click="goNewsDetail(news)">
					  <van-col>
					  	<van-image width="100" height="100" :src="news.newsimage" />
					  </van-col>
					  <van-col class="d-flex flex-wrap align-content-between">
					  	<div class="fs_16 font-weight-normal flex-fill-100">{{news.title}}</div>
					  	<span class="fs_12 font-weight-normal bg_dark-400 pt-2 pb-2 pl-3 pr-3 opacity-60 flex-fill-100">{{news.createtime}}</span>
					  </van-col>
					</van-row>
				</template>
			</van-list>
		</section>
	</div>
</template>

<script>
	export default {
		name: '',
		data () {
			return {
				topNewsTitle:"",
				newsList:[],
				page: 0, 
        //limit: 5,
        total: 0, 
				loading: false,
      	finished: false,
			}
		},
		components: {},
		mounted(){
			this.onLoad();
		},
		methods:{
			onLoad() {
	    	this.page++; // 分页数加一
	     	this.loadData(); // 调用方法,请求数据
	    },
			loadData(){
				this.MyAxios.post("/api/wechat/information/index",{
					//page:1,
				}).then(data => {
					if (data.code == 0) {
						// 今日资讯
						this.topNewsTitle = data.data.top_info.title;

						/**
						 * 资讯列表
						 */
						var newsData = data.data.list;
						if (newsData.data.length === 0) {  		// 判断获取数据条数若等于0
              this.newsList = [];				// 清空数组
              this.finished = true;		// 停止加载
            }
            if(this.page==1){
            	this.newsList = [];				// 清空数组
            	this.finished = true;		// 停止加载
            }

            // 若数据条数不等于0
            this.newsList = [];				// 清空数组
            this.total = newsData.total;		// 给数据条数赋值
            this.newsList.push(...newsData.data);	// 将数据放入list中
            this.loading = false;			// 加载状态结束

            // 如果list长度大于等于总数据条数,数据全部加载完成
            if (this.newsList.length >= newsData.total) {
              this.finished = true;	// 结束加载状态
            }

					} else {
						this.$notify({
              message: data.msg,
              type: 'warning'
            });
					}
				})
			},
			goNewsDetail(news){
				console.log(news);
			},
		},
	}
</script>

<style>

</style>