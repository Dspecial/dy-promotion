<template>
	<div class="page-container">
		<!-- swipe -->
		<van-swipe class="my-swipe" 
			:autoplay="6000" 
			indicator-color="white">
			<van-swipe-item v-for="(image, index) in swipeImages" :key="index">
		    <img v-lazy="image"/>
		  </van-swipe-item>
		</van-swipe>

		<!-- notice -->
		<van-notice-bar class="mt-3 border-radius-4" 
			color="#fff" 
			background="#24262E" 
			:scrollable="false" 
			mode="link"
			@click="toNoticeDetail">
			<template #left-icon>
				<div class="notice_icon">
					<van-image width="22" height="22" fit="contain" :src="require('@/assets/images/notice_icon.png')" />
				</div>
			</template>
		  <van-swipe
		    vertical
		    class="notice-swipe"
		    :autoplay="3000"
		    :show-indicators="false">
		    <van-swipe-item v-for="(notice,index) in swipeNotice" :key="index" class="fs_14 text-truncate font-weight-normal">{{notice.title}}</van-swipe-item>
		  </van-swipe>
		</van-notice-bar>

		<!-- 商学院、玩法介绍 -->
		<section class="mt-3">
			<van-row :gutter="15" type="flex" justify="space-between" align="center">
			  <van-col span="12">
			  	<router-link class="link_item link_item1 text-center" :to="''">
			  		<span class="fs_18">商学院</span>
			  	</router-link>
			  </van-col>
			  <van-col span="12">
			  	<router-link class="link_item link_item2 text-center" :to="'introduction'">
			  		<span class="fs_18">玩法介绍</span>
			  	</router-link>
			  </van-col>
			</van-row>
		</section>

		<!-- 会员群 -->
		<section class="mt-4">
			<van-row :gutter="15" type="flex" justify="space-around" align="center">
			  <van-col span="8">
			  	<div class="fun_item text-center" 
			  		v-clipboard:copy="membership"
        		v-clipboard:success="onCopy"
        		v-clipboard:error="onError">
			  		<van-image width="45" height="45" :src="require('@/assets/images/fun_item1.png')" />
			  		<span class="fs_14 d-block mt-2 font-weight-normal">会员群</span>
			  	</div>
			  </van-col>
			  <van-col span="8">
			  	<router-link class="fun_item text-center" :to="'douyin'">
			  		<van-image width="45" height="45" :src="require('@/assets/images/fun_item2.png')" />
			  		<span class="fs_14 d-block mt-2 font-weight-normal">抖音号</span>
			  	</router-link>
			  </van-col>
			  <van-col span="8">
			  	<router-link class="fun_item text-center" :to="'news'">
			  		<van-image width="45" height="45" :src="require('@/assets/images/fun_item3.png')" />
			  		<span class="fs_14 d-block mt-2 font-weight-normal">每日资讯</span>
			  	</router-link>
			  </van-col>
			</van-row>
		</section>

		<section class="mt-4 proList">
			<h3 class="fs_18 m-0 mb-3">产品列表</h3>
			<van-tabs @click="onTabClick" background="transparent" color="#fff">
				<van-tab v-for="(tab,index) in tabCard" :key="index" :title="tab.title" class="tab_content">
					<!-- ITEM -->
					<template v-for="(item,j) in tab.content">
						<div class="p-3 mt-3 content_item bg_dark-400 border-radius-4">
							<!-- isVip -->
							<div :class="['tag',item.isVip?'vip':'free']">
								<span v-if="item.isVip">会员</span>
								<span v-else>免费</span>
							</div>
							<!-- heading -->
							<div class="item_heading d-flex flex-nowrap justify-content-between align-items-center">
								<div class="w-75 d-flex flex-nowrap">
									<van-image width="60" height="60" :src="item.imgUrl" />
									<div class="ml-3 item_heading_title">
										<router-link :to="'data'">
											<h4 class="m-0 fs_16 text-truncate">{{item.title}}<van-tag class="ml-2 fs_12 font-weight-thin">评测</van-tag></h4>
										</router-link>
										<div class="mt-2">
											<van-image class="mr-1" width="16" height="16" :src="require('@/assets/images/douyin.png')" />
											<van-image width="16" height="16" :src="require('@/assets/images/toutiao.png')" />
										</div>
									</div>
								</div>
								<van-button color="#FE2C58" @click="goProductDetail(item)">查看详情</van-button>
							</div>
							<!-- detail -->
							<p class="item_p fs_14 mb-0 opacity-60 font-weight-thin300">{{item.contentInfo}}</p>

							<hr class="item_hr" />

							<!-- 收益 -->
							<van-row :gutter="15" type="flex" justify="space-between" align="center" class="item_profit">
							  <van-col span="8" class="text-center">
							  	<h5 class="m-0 fs_14 font-weight-normal">昨日最高收益</h5>
							  	<p class="m-0 mt-3 fs_18">{{item.profit}}</p>
							  </van-col>
							  <van-col span="8" class="text-center">
							  	<h5 class="m-0 fs_14 font-weight-normal">总分佣比例</h5>
							  	<p class="m-0 mt-3 fs_18">{{item.ratio}}</p>
							  </van-col>
							  <van-col span="8" class="text-center">
							  	<van-icon class-prefix="icon" name="download4" color="#FE2C58" /><span class="ml-2 font-weight-normal text_pink fs_14">下载推广码</span>
							  </van-col>
							</van-row>

							<hr class="item_hr" />

							<!-- child -->
							<div class="item_child">
								<h4 class="m-0 fs_16">精选 {{item.childItem.length}} 款子产品</h4>
								<ul>
									<template v-for="(child,k) in item.childItem">
										<li class="d-flex justify-content-between align-items-center mt-3">
											<van-image width="45" height="45" :src="child.imgUrl" />
											<div class="item_child_about">
												<h5 class="m-0 fs_14 mb-1 text-truncate">{{child.title}}</h5>
												<p class="m-0 fs_12 opacity-60 font-weight-normal text-truncate">{{child.contentInfo}}</p>
											</div>
											<van-button color="#FE2C58">推广</van-button>
										</li>
									</template>
								</ul>
								<router-link :to="'data'" class="item_child_more mt-3">推广更多单品</router-link>
							</div>
						</div>
					</template>
					<!-- /ITEM -->
				</van-tab>
			</van-tabs>
		</section>

		<!-- 新手课堂、会员 -->
		<section class="index_hang">
			<van-image width="55" height="57" :src="require('@/assets/images/hang_class.png')" />
			<van-image width="59" height="57" :src="require('@/assets/images/hang_vip.png')" />
		</section>
	</div>
</template>

<script>

	export default {
		name: "index",
		data () {
			return {
				swipeImages:[
					require("@/assets/images/banner.png"),
        	require("@/assets/images/banner.png"),
        	require("@/assets/images/banner.png"),
				],
				swipeNotice:[
					{
						id:"1",
						title: "推广宣传基本要求1推广宣传基本要求1推广宣传基本要求1",
					},
					{
						id:"2",
						title: "推广宣传基本要求2",
					},
					{
						id:"3",
						title: "推广宣传基本要求3",
					},
				],
				membership:"我是会员群的id",
				tabCard:[
					{
						title:"评测",
						content:[
							{
								id:"1",
								imgUrl:"https://img.yzcdn.cn/vant/cat.jpeg",
								title:"心理评测平台心理评测平台心理评测平台心理评测平台",
								isVip:false,
								contentInfo:"随着社会的不断发展，我们的工作与生活也在每时每刻发生着变化，伴随着环境的影响，生活压力的影响，我们的心理也在发生着变化，那么如何知道我们心理健康状况呢？",
								profit:"10000.00",
								ratio:"95%",
								childItem:[
									{
										imgUrl:"https://img.yzcdn.cn/vant/cat.jpeg",
										title:"综合心里状态测试",
										contentInfo:"分享标题：综合心里状态，100万人分享标题：综合心里状态，100万人",
									},
									{
										imgUrl:"https://img.yzcdn.cn/vant/cat.jpeg",
										title:"综合心里状态测试",
										contentInfo:"分享标题：综合心里状态，100万人",
									},
									{
										imgUrl:"https://img.yzcdn.cn/vant/cat.jpeg",
										title:"综合心里状态测试",
										contentInfo:"分享标题：综合心里状态，100万人",
									},
								],
							},
							{
								id:"2",
								imgUrl:'https://img.yzcdn.cn/vant/apple-2.jpg',
								title:"心理评测平台",
								isVip:true,
								contentInfo:"随着社会的不断发展，我们的工作与生活也在每时每刻发生着变化，伴随着环境的影响，生活压力的影响，我们的心理也在发生着变化，那么如何知道我们心理健康状况呢？",
								profit:"10000.00",
								ratio:"95%",
								childItem:[
									{
										imgUrl:'https://img.yzcdn.cn/vant/apple-2.jpg',
										title:"综合心里状态测试",
										contentInfo:"分享标题：综合心里状态，100万人",
									},
									{
										imgUrl:'https://img.yzcdn.cn/vant/apple-2.jpg',
										title:"综合心里状态测试",
										contentInfo:"分享标题：综合心里状态，100万人",
									},
									{
										imgUrl:'https://img.yzcdn.cn/vant/apple-2.jpg',
										title:"综合心里状态测试",
										contentInfo:"分享标题：综合心里状态，100万人",
									},
								],
							},
						]
					},
					{
						title:"趣味",
						content:[],
					},
					{
						title:"工具",
						content:[],
					},
					{
						title:"其他",
						content:[],
					},
				],
			}
		},
		components: {},
		mounted(){

		},
		methods:{
			toNoticeDetail(){
				this.$router.push("/data");
			},
			// 复制到粘贴板成功
			onCopy: function (e) {
	      this.$toast.success("复制成功\n" + e.text);
	    },
	    // 复制到粘贴板失败
	    onError: function (e) {
	      this.$toast.fail("复制失败");
	    },
			// tab切换
			onTabClick(name,title){
				this.$toast(name);
			},
			goProductDetail(pro){
				this.$router.push({
          path: "/productDetail",
          query: {
            id: pro.id
          }
        });
			},
		},
	}
</script>

<style>

</style>