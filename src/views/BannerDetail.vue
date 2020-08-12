<template>
	<div class="page-container details_news">
		<h2 class="m-0 fs_22">{{title}}</h2>
		<van-row :gutter="15" type="flex" justify="space-between" align="center" class="mt-4" >
		  <van-col class="d-flex align-items-center">
		  	<van-image width="30" height="30" :src="image" />
		  	<div class="font-weight-normal ml-3">
		  		<p class="m-0">{{author}}</p>
		  		<span>{{createtime}}</span>
		  	</div>
		  </van-col>
		  <van-col class="d-flex flex-wrap align-content-between">
		  	<span class="fs_12 font-weight-normal bg_dark-400 pt-2 pb-2 pl-3 pr-3">分享资讯</span>
		  </van-col>
		</van-row>

		<!-- 视频 -->
	  <div class="p_relative mt-4 news_video" @click="playVideo" v-if="videoUrl">
	    <img v-lazy="coverImg"/>
	    <div class="p_absolute ban_paly">
	    	<van-icon name="play" />
	    </div>
  	</div>
		<!-- 视频播放遮罩层 -->
		<van-overlay :show="videoShow" @click="closeVideo">
		  <div class="wrapper" @click.stop>
		  	<div id="vs"></div>
		  </div>
		</van-overlay>
			
		<section class="mt-4 banner_content">
			<div v-html="content"></div>
		</section>
	</div>
</template>

<script>
	import Player from 'xgplayer';// 西瓜播放器，h5视频播放
	export default {
		name: 'BannerDetail',
		data () {
			return {
				id:"",
				title:"我是资讯详细页面",
				image:require("@/assets/images/tab_per_active.png"),
				author:"趣推",
				createtime:"2020-08-05",
				content:"<p>大家好才是真的好</p>",

				coverImg:require("@/assets/images/ban_video1.png"),
				videoUrl:"",
				videoShow:false,
	      Player: null,
			}
		},
		components: {},
		mounted(){
			this.id = this.$route.query.id;
			this.loadBanDetail();
		},
		methods:{
			// 获取资讯详情
	    loadBanDetail(){
				this.MyAxios.post("/api/wechat/banner/details",{
					id:this.id,
				}).then(data => {
					if (data.code == 0) {
						// banner详情
						this.title = data.data.title;
						this.createtime = data.data.createtime;
						this.videoUrl = data.data.videourl;
						this.content = data.data.content;

					} else {
						this.$notify({
              message: data.msg,
              type: 'warning'
            });
					}
				})
	    },

	    // 视频播放
	    playVideo(){
				this.videoShow = true;
				this.Player = new Player({
	      	// el、url为必选配置，其它为可选配置
	        el: document.querySelector('#vs'),
	        url: this.videoUrl,
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

<style lang="scss">
	.news_video{
		height: 200px;
    background: #020202;
	}
	.news_video img{
		width: 100%;
		height: 100%;
	}
	.banner_content{
		div,p,span{
			background: transparent!important;
			color:#fff!important;
		}
		img{
			width:100%!important;
			margin:0 auto!important;
			height:auto!important;
		}
		video{
			width:100%!important;
		}
	}
</style>