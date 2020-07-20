<template>
	<div class="page-container">
		<!-- 负责人 -->
		<section class="bg_dark-400 official">
			<div class="d-flex justify-content-between align-items-center p-3">
				<div class="d-flex align-items-center">
					<van-image round width="45" height="45" :src="directorUrl" />
					<div class="ml-3">
						<h4 class="fs_18 m-0">{{directorWechat}}</h4>
						<p class="m-0 fs_12 mt-1 opacity-40">遇到问题加微信咨询我哦</p>
					</div>
				</div>
				<van-button color="#FE2C58" 
					v-clipboard:copy="directorWechat"
      		v-clipboard:success="onCopy"
      		v-clipboard:error="onError">联系他</van-button>
			</div>
		</section>

		<!-- notice -->
		<van-notice-bar class="mt-3 border-radius-4" 
			color="#fff" 
			background="transparent" 
			:scrollable="false">
			<template #left-icon>
				<div class="notice_title fs_18 pr-3 mr-3">
					开通会员
				</div>
			</template>
		  <van-swipe
		    vertical
		    class="notice-swipe"
		    :autoplay="3000"
		    :show-indicators="false">
		    <van-swipe-item v-for="(notice,index) in swipeNotice" :key="index" class="fs_14 text-truncate font-weight-normal">
		    {{notice.title}}
		    	<div class="d-flex align-items-center">
		    		<van-image round width="25" height="25" :src="notice.avatarUrl" />
		    		<p class="m-0 ml-3 font-weight-normal">
		    			<span>{{notice.userName}}</span>
		    			<span>{{notice.time}}前</span>
		    			<span class="text_yellow-400">已开通</span>
		    		</p>
		    	</div>
		  	</van-swipe-item>
		  </van-swipe>
		</van-notice-bar>

		<section class="mt-4">
			<h4 class="m-0 fs_18">开通会员&优势</h4>
			<div class="mt-4">
				<template v-for="(adv,index) in advantageList">
					<div class="mb-3 d-flex align-items-center">
						<van-image width="35" height="35" :src="adv.imgUrl" />
						<p class="m-0 ml-3 fs_16 text_yellow-400">{{adv.advTxt}}</p>
					</div>
				</template>
			</div>

			<van-row :gutter="15">
				<template v-for="(adv,index) in advantageList2">
					<van-col span="12">
						<div class="bg_dark-300 p-2 mb-3 d-flex align-items-center">
							<van-image width="35" height="35" :src="adv.imgUrl" />
							<div class="ml-2">
								<h4 class="fs_14 m-0">{{adv.advTxt}}</h4>
								<p class="m-0 fs_12 mt-1 opacity-60">{{adv.advInfo}}</p>
							</div>
						</div>
					</van-col>
				</template>
			</van-row>
		</section>
		
		<div class="d-flex align-items-center">
			<div class="mr-2">
				<van-field name="checkbox" class="my_checkbox" :border="false">
				  <template #input>
				    <van-checkbox v-model="checkbox" checked-color="#F9CE91" />
				  </template>
				</van-field>
			</div>
			<div class="opacity-60 fs_12">开通会员前我已阅读并遵守<span>《平台用户服务协议》</span></div>
		</div>

		<section class="p_fixed recruit open_btn">
			<van-button size="large" class="fs_16" @click="onOpenSubmit(checkbox)">激活开通会员</van-button>
		</section>

		<!-- 填写邀请码 -->
		<van-dialog v-model="showDialog" class="p-3 dialog_onInvite"
			width="300"
			title="填写邀请码" 
			:show-confirm-button="false" 
			:close-on-click-overlay="true">
			<van-form @submit="onInviteSubmit">
			  <van-field
			  	class="mt-4"
			    v-model="inpuInvitationCode"
			    name="邀请码"
			    placeholder="请输入邀请码"
			    :rules="[{ required: true, message: '请填写邀请码' }]"
			  />
			  <div class="mt-3">
			    <van-button class="fs_16" block color="#FE2C58" native-type="submit">
			      确认
			    </van-button>
			  </div>
			  <p class="m-0 fs_12 opacity-40 mt-3">说明：邀请码填写后不可更改，请确认后填写</p>
			</van-form>
		</van-dialog>
	</div>
</template>

<script>
	export default {
		name: 'OpenMember',
		data () {
			return {
				directorUrl:"https://img.yzcdn.cn/vant/apple-2.jpg",
				directorWechat:"负责人微信",
				swipeNotice:[
					{
						id:"1",
						avatarUrl:"https://img.yzcdn.cn/vant/cat.jpeg",
						userName:"小明",
						time:"1分钟",
					},
					{
						id:"1",
						avatarUrl:"https://img.yzcdn.cn/vant/apple-2.jpg",
						userName:"王刚",
						time:"10分钟",
					},
				],
				advantageList:[
					{
						imgUrl:require("@/assets/images/advantage_icon1.png"),
						advTxt:"小程序的推广权限",
					},
					{
						imgUrl:require("@/assets/images/advantage_icon2.png"),
						advTxt:"短视频高级人脉联系方式",
					},
					{
						imgUrl:require("@/assets/images/advantage_icon3.png"),
						advTxt:"商学院推广课程免费学习",
					},
					{
						imgUrl:require("@/assets/images/advantage_icon4.png"),
						advTxt:"低成本 零基础 无压货 结算快",
					},
					{
						imgUrl:require("@/assets/images/advantage_icon5.png"),
						advTxt:"抓住小程序先机 多种变现产品任你选",
					},
				],
				advantageList2:[
					{
						imgUrl:require("@/assets/images/advantage_icon6.png"),
						advTxt:"推广方案",
						advInfo:"代理运营策略",
					},
					{
						imgUrl:require("@/assets/images/advantage_icon7.png"),
						advTxt:"对接资源",
						advInfo:"电商产品对接资源",
					},
					{
						imgUrl:require("@/assets/images/advantage_icon8.png"),
						advTxt:"内部社群",
						advInfo:"社群学习交流",
					},
					{
						imgUrl:require("@/assets/images/advantage_icon9.png"),
						advTxt:"讲师入驻",
						advInfo:"可申请为课程讲师",
					},
				],
				checkbox:false,

				showDialog: true,
				inpuInvitationCode:"",
			}
		},
		components: {},
		methods:{
			// 复制到粘贴板成功
			onCopy: function (e) {
	      this.$toast.success("复制成功\n" + e.text);
	    },
	    // 复制到粘贴板失败
	    onError: function (e) {
	      this.$toast.fail("复制失败");
	    },
	    // 激活开通会员
	    onOpenSubmit(value) {
	    	// 还要判断一下邀请码有没有填写
	    	// ...
	    	
	    	if(value){
	    		this.$router.push("activationOpenMember");
	    	}else{
	    		this.$dialog.confirm({
					  title: '温馨提示',
					  message: '请先阅读并同意用户服务协议书',
					  showCancelButton:false,
					})
	    	}
    	},
			// 提交邀请码
	    onInviteSubmit(){
	    	this.showDialog = false;
	    },
		},
	}
</script>

<style>

</style>