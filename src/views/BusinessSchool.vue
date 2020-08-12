<template>
	<div class="page-container">
		<!-- banner -->
		<section class="business_ban banner">
			<van-image width="100%" height="100%" :src="business_ban" />
		</section>

		<section class="mt-3">
			<van-tabs v-model="active" class="promotion-tabs2 business_tab"  @click="onTabClick">
				<van-tab>
					<template #title><span class="fs_18">每周分享</span></template>
					<section class="mt-3 lesson_list">
			  		<!-- 内容 -->
			  		<template v-for="(lesson,j) in weekly">
			  			<div class="lesson_cell mt-3 d-flex justify-content-between">
					  		<div class="lesson_left p_relative" @click="playVideo(lesson.videourl)">
							    <img v-lazy="lesson.image" />
							    <div class="p_absolute ban_paly">
							    	<van-icon name="play" />
							    </div>
						  	</div>
						  	<div class="lesson_right d-flex flex-column justify-content-between">
						  		<h4 class="m-0 fs_16">{{lesson.title}}</h4>
						  		<p class="m-0 fs_12" style="color:#5E5E7F">时长：{{lesson.times}}分钟</p>
						  		<div class="d-flex justify-content-between align-items-center">
						  			<div class="author_info d-flex align-items-center">
						  				<van-image width="22" height="22" :src="lesson.author.avatar" />
						  				<span class="d-inline-block fs_12 ml-2">{{lesson.author.name}}</span>
						  			</div>
						  			<van-button color="#FE2C58" class="fs_12" @click="goLessonDetail(lesson)">回看课程</van-button>
						  		</div>
						  	</div>
			  			</div>
			  		</template>
			  		<!-- /内容 -->
			  	</section>
				</van-tab>
			  <van-tab>
			  	<template #title><span class="fs_18">高级教程</span></template>
					<section class="mt-3 lesson_list">
			  		<!-- 内容 -->
			  		<template v-for="(lesson,j) in higher">
			  			<div class="lesson_cell mt-3 d-flex justify-content-between">
					  		<div class="lesson_left p_relative" @click="playVideo(lesson.videourl)">
							    <img v-lazy="lesson.image" />
							    <div class="p_absolute ban_paly">
							    	<van-icon name="play" />
							    </div>
						  	</div>
						  	<div class="lesson_right d-flex flex-column justify-content-between">
						  		<h4 class="m-0 fs_16">{{lesson.title}}</h4>
						  		<p class="m-0 fs_12" style="color:#5E5E7F">时长：{{lesson.times}}分钟</p>
						  		<div class="d-flex justify-content-between align-items-center">
						  			<div class="author_info d-flex align-items-center">
						  				<van-image width="22" height="22" :src="lesson.author.avatar" />
						  				<span class="d-inline-block fs_12 ml-2">{{lesson.author.name}}</span>
						  			</div>
						  			<van-button color="#FE2C58" class="fs_12" @click="goLessonDetail(lesson)">回看课程</van-button>
						  		</div>
						  	</div>
			  			</div>
			  		</template>
			  		<!-- /内容 -->
			  	</section>
			  </van-tab>
			</van-tabs>
		</section>

		<!-- 视频播放遮罩层 -->
		<van-overlay :show="videoShow" @click="closeVideo">
		  <div class="wrapper" @click.stop>
		  	<div id="vs"></div>
		  </div>
		</van-overlay>
	</div>
</template>

<script>
	import Player from 'xgplayer';// 西瓜播放器，h5视频播放
	export default {
		name: 'BusinessSchool',
		data () {
			return {
				business_ban:require("@/assets/images/business_bg.png"),
				videoShow:false,
	      Player: null,
				active:"1",
				weekly:[],
				higher:[],
			}
		},
		components: {},
		mounted(){
			this.onLoad();// 默认展示本月收益排序
		},
		methods:{
			onLoad(){
				this.MyAxios.post("/api/wechat/course/index",{

				}).then(data => {
					if (data.code == 0) {
						this.weekly = data.data.share_list;
						this.higher = data.data.high_list;
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
    		this.onLoad();
			},
			// 视频播放
			playVideo(video){
				this.videoShow = true;
				this.Player = new Player({
	      	// el、url为必选配置，其它为可选配置
	        el: document.querySelector('#vs'),
	        url: video,
	        //poster: item.coverImg,
	        volume: 0.6,    // 初始音量
	        autoplay: true,  // 自动播放
	        playbackRate: [0.5, 0.75, 1, 1.5, 2],   // 当前播放速度
	        defaultPlaybackRate: 1,     // 播放速度设置为1
	        playsinline: true,
	      });
			},
			// 关闭视频
			closeVideo(){
				this.videoShow = false;
				this.Player.destroy(document.querySelector('#vs')); // 关闭的时候销毁播放器
			},
			// 去课程详细页面
			goLessonDetail(item){
				this.$router.push({
          path: "/businessDetail",
          query: {
            id: item.id
          }
        });
			},
		},
	}
</script>

<style lang="scss">
	.business_tab{
		.van-tab--active{
			color:#FE2C58;
		}
	}
</style>