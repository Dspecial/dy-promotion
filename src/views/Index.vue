<template>
	<div class="page-container">
		<!-- swipe -->
		<van-swipe class="my-swipe" 
			:autoplay="6000" 
			indicator-color="white">
			<van-swipe-item v-for="(image, index) in swipeImages" :key="index" @click="bannerClick(image)">
		    <img v-lazy="image.bannerimage"/>
		  </van-swipe-item>
		</van-swipe>

		<!-- notice -->
		<van-notice-bar class="mt-3 border-radius-4" 
			color="#fff" 
			background="#24262E" 
			:scrollable="false">
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
		    <van-swipe-item v-for="(notice,index) in swipeNotice" :key="index" class="fs_14 text-truncate font-weight-normal" @click="toNoticeDetail(notice)">
		    	<div class="d-flex justify-content-between align-items-center">	    	
		    		{{notice.title}}
		    		<i class="van-icon van-icon-arrow van-notice-bar__right-icon"></i>
		    	</div>	
		  	</van-swipe-item>
		  </van-swipe>
		</van-notice-bar>

		<!-- 商学院、玩法介绍 -->
		<section class="mt-3">
			<van-row :gutter="15" type="flex" justify="space-between" align="center">
			  <van-col span="12">
			  	<router-link class="link_item link_item1 text-center" :to="'businessSchool'">
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
			  <van-col span="8" >
			  	<div class="fun_item text-center" @click="addTeam">
			  		<van-image width="45" height="45" :src="require('@/assets/images/fun_item1.png')" />
			  		<span class="fs_14 d-block mt-2 font-weight-normal">会员群</span>
			  	</div>
			  	<!-- 会员群的二维码 -->
					<van-dialog v-model="membershipShow" :show-cancel-button="false" :showConfirmButton="false" :closeOnClickOverlay="true" class="codeDialog">
						<div class="text-center pt-3 pb-3">
						  <img :src="membershipImg" />
						  <p class="m-0 opacity-60 mt-2">长按图片识别客户微信</p>
					  </div>
					</van-dialog>

			  </van-col>
<!-- 			  <van-col span="8">
			  	<router-link class="fun_item text-center" :to="'douyin'">
			  		<van-image width="45" height="45" :src="require('@/assets/images/fun_item2.png')" />
			  		<span class="fs_14 d-block mt-2 font-weight-normal">抖音号</span>
			  	</router-link>
			  </van-col> -->
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
			<van-tabs v-model="proActive" @click="onTabClick" background="transparent" color="#fff">
				<van-tab v-for="(tab,index) in tabCard" :key="index" :title="tab.name" class="tab_content">

					<van-list
					  v-model="loadingPro"
					  :finished="finishedPro"
					  finished-text="没有更多了"
					  @load="onLoadPro">
						<!-- ITEM -->
						<template v-for="(item,j) in tabProList">
							<div class="p-3 mt-3 content_item bg_dark-400 border-radius-4">
								<!-- isVip -->
								<div :class="['tag',item.is_need_vip == 2?'vip':'free']">
									<!-- 如果为2表示会员所属，不能点击和下载 -->
									<span v-if="item.is_need_vip == 2">会员</span>
									<span v-else>免费</span>
								</div>
								<!-- heading -->
								<div class="item_heading d-flex flex-nowrap justify-content-between align-items-center">
									<div class="w-75 d-flex flex-nowrap">
										<van-image width="60" height="60" :src="item.image" >
											<van-tag mark color="#FE2C58" class="new_pro" v-if="item.is_tagdata == 2">新品</van-tag>
										</van-image>
										<div class="ml-3 item_heading_title">
											<div @click="goProductDetail(item)">
												<h4 class="m-0 fs_16 text-truncate">{{item.d_name}}<van-tag class="ml-2 fs_12 font-weight-thin">{{tab.name}}</van-tag></h4>
											</div>
											<div class="mt-2">
												<van-image width="16" height="16" :src="require('@/assets/images/douyin.png')" />
											</div>
										</div>
									</div>
									<van-button color="#FE2C58" @click="goProductDetail(item)">查看详情</van-button>
								</div>
								<!-- detail -->
								<p class="item_p fs_14 mb-0 opacity-60 font-weight-thin300">{{item.d_bref}}</p>

								<hr class="item_hr" />

								<!-- 收益 -->
								<van-row :gutter="15" type="flex" justify="space-between" align="center" class="item_profit">
								  <van-col span="8" class="text-center">
								  	<h5 class="m-0 fs_14 font-weight-normal">昨日最高收益</h5>
								  	<p class="m-0 mt-3 fs_18">{{item.yes_shammoney}}</p>
								  </van-col>
								  <van-col span="8" class="text-center">
								  	<h5 class="m-0 fs_14 font-weight-normal">佣金比例</h5>
								  	<p class="m-0 mt-3 fs_18">{{item.ad_extends}}%</p>
								  </van-col>
								  <van-col span="8" class="text-center" @click="downloadCode(1,item.id)" >
								  	<van-icon class-prefix="icon" name="download4" color="#FE2C58" />
								  	<span class="ml-1 font-weight-normal text_pink fs_14">下载推广码</span>
								  </van-col>
								</van-row>

								<!-- 下载推广码 -->
								<van-dialog v-model="pCodeShow" title="下载推广码" :show-cancel-button="false" :showConfirmButton="false" :closeOnClickOverlay="true" class="codeDialog">
									<div class="text-center pt-3 pb-3">
									  <img :src="codeImg" />
									  <p class="m-0 opacity-60 mt-2">长按图片保存到相册</p>
								  </div>
								</van-dialog>

								<hr class="item_hr" />

								<!-- child -->
								<div class="item_child">
									<h4 class="m-0 fs_16">精选 {{item.p_list.length}} 款子产品</h4>
									<ul>
										<template v-for="(child,k) in item.p_list">
											<li class="d-flex justify-content-between align-items-center mt-3">
												<van-image width="45" height="45" :src="child.image" />
												<div class="item_child_about">
													<h5 class="m-0 fs_14 mb-1 text-truncate">{{child.matter_name}}</h5>
													<p class="m-0 fs_12 opacity-60 font-weight-normal text-truncate">{{child.share_title}}</p>
												</div>
												<van-button color="#FE2C58" @click="downloadCode(2,child.id)">推广</van-button>
											</li>
										</template>
									</ul>
									<a class="item_child_more mt-3" @click="goProductDetail(item)">推广更多单品</a>
								</div>
							</div>
						</template>
						<!-- /ITEM -->
					</van-list>
				</van-tab>
			</van-tabs>
		</section>

		<!-- 新手课堂、会员 -->
		<section class="index_hang">
<!-- 			<van-image width="55" height="57" :src="require('@/assets/images/hang_class.png')" /> -->
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
				],
				swipeNotice:[],
				pagePro: 0, 
        //limitPro: 5,
        totalPro: 0, 
				loadingPro: false,
      	finishedPro: false,
      	proActive:0,

      	membershipShow:false, // 会员群显隐
      	membershipImg:"", // 会员群图片
				// membership:"我是会员群的id",
				tabCard:[],
				tabProList:[],

				pCodeShow:false, // 推广码显隐
				codeImg:"https://img.yzcdn.cn/vant/apple-3.jpg", // 推广码图片
			}
		},
		components: {},
		mounted(){
			// banner展示列表
			this.indexBanner();
			// 公告列表
			this.indexNoticeList();
			// 产品列表分类
			this.loadProCate();
		},
		methods:{
			// banner展示列表
			indexBanner(){
				this.MyAxios.post("/api/wechat/banner/index",{

				}).then(data => {
					if (data.code == 0) {
						this.swipeImages = data.data;
					} else {
						this.$notify({
              message: data.msg,
              type: 'warning'
            });
					}
				})
			},
			// banner点击事件
			bannerClick(item){
				if(item.type==2){ //作为链接跳转
					window.location = item.url;
				}else{
					this.$router.push("/bannerDetail?id="+item.id);
					console.log("跳转到banner详情");
				}
			},
			// 公告列表
			indexNoticeList(){
				this.MyAxios.post("/api/wechat/notice/index",{
				}).then(data => {
					if (data.code == 0) {
						this.swipeNotice = data.data;
					} else {
						this.$notify({
              message: data.msg,
              type: 'warning'
            });
					}
				})
			},
			// 公告详细页面
			toNoticeDetail(notice){
				this.$router.push("/noticeDetail?id="+notice.id);
			},
			// 会员群,显示客服微信
			addTeam(){
				this.MyAxios.post("/api/wechat/base/get_base_info",{
					id:21,
				}).then(data => {
					if (data.code == 0) {
						this.membershipShow = true;
						this.membershipImg = data.data.value;
					} else {
						this.$notify({
              message: data.msg,
              type: 'warning'
            });
					}
				})
			},
			// 产品列表分类
			loadProCate(){
				this.MyAxios.post("/api/wechat/products/index",{
					page:this.pagePro,
					cate_id:this.proActive,
				}).then(data => {
					if (data.code == 0) {
						// 分类
						this.tabCard = data.data.cate_list;
					}else{
						this.$notify({
              message: data.msg,
              type: 'warning'
            });
					}
				})
			},
			// 加载产品
			onLoadPro(){
				this.pagePro++; // 分页数加一
	     	this.loadProData(); // 调用方法,请求数据
			},
			// 产品列表
			loadProData(){
				this.MyAxios.post("/api/wechat/products/index",{
					page:this.pagePro,
					cate_id:this.proActive,
				}).then(data => {
					if (data.code == 0) {
						/**
						 * 产品列表
						 */
						var proData = data.data.products_list;
						if (proData.data.length === 0) {  		// 判断获取数据条数若等于0
              this.tabProList = [];				// 清空数组
              this.finishedPro = true;		// 停止加载
            }
            if(this.pagePro == 1){
            	this.tabProList = [];				// 清空数组
            	this.finishedPro = true;		// 停止加载
            }

            // 若数据条数不等于0
            this.tabProList = [];				// 清空数组
            this.totalPro = proData.total;		// 给数据条数赋值

            this.tabProList.push(...proData.data);	// 将数据放入list中
            this.loadingPro = false;			// 加载状态结束

            // 如果list长度大于等于总数据条数,数据全部加载完成
            if (this.tabProList.length >= proData.total) {
              this.finishedPro = true;	// 结束加载状态
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
				this.proActive = name;
				this.loadProData(); // 调用方法,请求数据
			},
			goProductDetail(pro){
				this.$router.push({
          path: "/productDetail",
          query: {
            id: pro.id
          }
        });
			},
			// 下载推广码
			downloadCode(type,id){
				this.MyAxios.post("/api/wechat/products/get_extend_code",{
					// token:"",
					type:type, // 值为1传小程序id,值为2传小程序产品id
					id:id,
				}).then(data => {
					if (data.code == 0) {
						this.pCodeShow = true;
						// 推广图片
						this.codeImg = data.data;
					}else{
						this.$notify({
              message: data.msg,
              type: 'warning'
            });
					}
				})
			},

			// 复制到粘贴板成功
			onCopy: function (e) {
	      this.$toast.success("复制成功\n" + e.text);
	    },
	    // 复制到粘贴板失败
	    onError: function (e) {
	      this.$toast.fail("复制失败");
	    },

	    // 判断是否为空字符串
			isEmpty(obj){
	    	if(typeof obj == "undefined" || obj == null || obj == ""){
			  	return true;
		    }else{
		    	return false;
		    }
			},
		},
	}
</script>

<style>
	.proList .van-tabs__wrap{
		display: none;
	}
</style>