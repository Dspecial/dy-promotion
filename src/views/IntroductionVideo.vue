<template>
	<div class="page-container">
		<!-- video swipe -->
		<van-swipe :loop="false" :show-indicators="false" :width="300" class="ban_video">
		  <van-swipe-item v-for="(video, index) in swipeVideo" :key="index" @click="playVideo(video)">
		  	<div class="p_relative">
			    <img v-lazy="video.coverImg"/>
			    <div class="p_absolute ban_paly">
			    	<van-icon name="play" />
			    </div>
		  	</div>
		    <p class="m-0 fs_18 p-3">{{index+1}}.<span class="ml-1">{{video.title}}</span></p>
		  </van-swipe-item>
		</van-swipe>

		<!-- 视频播放遮罩层 -->
		<van-overlay :show="videoShow" @click="closeVideo">
		  <div class="wrapper" @click.stop>
		  	<div id="vs"></div>
		  </div>
		</van-overlay>

		<section class="mt-4">
			<h4 class="fs_20 m-0">常见问题</h4>
			<van-collapse v-model="activeName" accordion class="mt-3 my_collapse" :border="false">
				<template v-for="(question,index) in questionList">
					<van-collapse-item :name="index+1" :border="false">
						<template #title>
							<div class="d-flex align-items-center">
					      <span class="sort_square border-radius-4">{{index+1}}</span>
					      <h5 class="fs_18 m-0 ml-2 w-90">{{question.title}}</h5>
							</div>
				    </template>
				    <!-- 内容 -->
					  <div class="p_relative" @click="playVideo(question)">
					    <img v-lazy="question.coverImg"/>
					    <div class="p_absolute ban_paly">
					    	<van-icon name="play" />
					    </div>
				  	</div>
				  </van-collapse-item>					
				</template>
			</van-collapse>
		</section>
	</div>
</template>

<script>
	import Player from 'xgplayer';// 西瓜播放器，h5视频播放
	export default {
		name: 'IntroductionVideo',
		data () {
			return {
				swipeVideo:[	
					{
						coverImg: require("@/assets/images/ban_video1.png"),
						title:"如何绑定抖音挂载小程序？",
						videoUrl:require('@/assets/video/video1.mp4'),
					},
					{
						coverImg:require("@/assets/images/banner.png"),
						title:"如何绑定抖音挂载小程序？",
						videoUrl:require('@/assets/video/video2.mp4'),
					},
					{
						coverImg:require("@/assets/images/ban_video1.png"),
						title:"如何绑定抖音挂载小程序？",
						videoUrl:require('@/assets/video/video1.mp4'),
					},
					{
						coverImg:require("@/assets/images/banner.png"),
						title:"如何绑定抖音挂载小程序？",
						videoUrl:require('@/assets/video/video2.mp4'),
					},
				],
				videoShow:false,
	      Player: null,
	      activeName:1,
	      questionList:[
	      	{
	      		coverImg: require("@/assets/images/ban_video1.png"),
						title:"平台介绍有吗？",
						videoUrl:require('@/assets/video/video1.mp4'),
	      	},
	      	{
	      		coverImg: require("@/assets/images/banner.png"),
						title:"新人加入第一步怎么去学习？新人加入第一步怎么去学习？",
						videoUrl:require('@/assets/video/video2.mp4'),
	      	},
	      	{
	      		coverImg: require("@/assets/images/ban_video1.png"),
						title:"88老会员和298新会员有什么区别？",
						videoUrl:require('@/assets/video/video1.mp4'),
	      	},
	      ],
			}
		},
		components: {

		},
		mounted(){
			
		},
		methods:{
			playVideo(item){
				this.videoShow = true;
				this.Player = new Player({
	      	// el、url为必选配置，其它为可选配置
	        el: document.querySelector('#vs'),
	        url: item.videoUrl,
	        //poster: item.coverImg,
	        volume: 0.6,    // 初始音量
	        autoplay: true,  // 自动播放
	        playbackRate: [0.5, 0.75, 1, 1.5, 2],   // 当前播放速度
	        defaultPlaybackRate: 1,     // 播放速度设置为1
	        playsinline: true,
	      });
			},
			closeVideo(){
				this.videoShow = false;
				this.Player.destroy(document.querySelector('#vs')); // 关闭的时候销毁播放器
			},
		},
	}
</script>

<style>

</style>