<template>
	<div class="page-container profile">
		<!-- 头像 -->
		<van-row :gutter="15" type="flex" justify="space-between" align="center">
		  <van-col>
		  	<van-image round width="60" height="60" :src="profile.avatar" />
		  </van-col>
		  <van-col span="14">
		  	<div class="fs_18 font-weight-normal">{{profile.name}}</div>
		  	<div class="fs_12 font-weight-normal mt-2">手机号：<span>{{profile.mobile}}</span></div>
		  </van-col>
		  <van-col class="text-center" @click="showQR">
		  	<van-icon name="qr" size="36"/>
		  	<p class="m-0">关注公众号</p>
		  </van-col>			
		</van-row>

		<!-- 邀请码 -->
		<section class="mt-4 bg_dark-400 member p-3">
			<van-row :gutter="15">
			  <van-col :span="12">
			  	<div class="d-flex justify-content-between align-items-center">
			  		<div class="fs_12 font-weight-normal text-999 w-70 text-truncate">微信：<span>{{profile.wx_name}}</span></div>
			  		<van-button plain hairline size="mini" @click="weChatInputShow = true">编辑</van-button>
	  				<!-- 绑定微信号 -->
						<van-dialog v-model="weChatInputShow" title="请绑定微信号" :show-cancel-button="false" :showConfirmButton="false" :closeOnClickOverlay="true" class="codeDialog">
							<div class="text-center p-3">
							  <van-form @submit="bindWeChat" class="mt-3 wxName" :show-error-message="false">
									<!-- 允许输入数字，调起带符号的纯数字键盘 -->
									<van-field v-model="wxName" name="微信号" placeholder="请填写微信号"
										:rules="[{ required: true, message: '请填写微信号' }]" border>
									</van-field>
									<van-button size="large" color="#FE2C58" class="border-radius-4 fs_16 w-75 mt-3" native-type="submit">
									确认</van-button>
								</van-form>
							  <p class="m-0 opacity-60 mt-2 text_pink">请绑定微信号方便下级用户联系</p>
						  </div>
						</van-dialog>
			  	</div>
			  </van-col>
			  <van-col :span="12">
			  	<!-- 是会员 -->
			  	<div class="d-flex justify-content-between align-items-center" v-if="profile.is_vip == 2">
			  		<div class="fs_12 font-weight-normal text-999 w-70 text-truncate">邀请码：<span>{{profile.is_vip_text}}</span></div>
			  		<van-button plain hairline size="mini" 
			  			v-clipboard:copy="profile.is_vip_text"
        			v-clipboard:success="onCopy"
        			v-clipboard:error="onError">复制</van-button>
			  	</div>
			  	<!-- 未开通会员 -->
			  	<div class="d-flex justify-content-between align-items-center" v-else>
			  		<div class="fs_12 font-weight-normal text-999">未开通会员</div>
			  		<van-button plain hairline size="mini" @click="toBeMember">开通</van-button>
			  	</div>
			  </van-col>
			</van-row>
		</section>

		<!-- 提现 -->
		<section class="mt-4 bg_white withdraw">
			<div class="d-flex justify-content-between align-items-center p-3 withdraw_up">
				<div>
					<h4 class="fs_12 m-0">可提现余额</h4>
					<p class="m-0 fs_26 mt-2">{{withdraw.all_can_deposit}}</p>
				</div>
				<router-link :to="'myPurse'">
					<van-button color="#FE2C58">我的钱包</van-button>
				</router-link>
			</div>
			<van-row :gutter="15" class="p-3">
			  <van-col :span="7" class="text-center">
			  	<span class="fs_14 font-weight-normal text-999">总收益(元)</span>
			  	<p class="fs_20 m-0 mt-2">{{withdraw.all_money}}</p>
			  </van-col>
			  <van-col :span="10" class="text-center">
			  	<span class="fs_14 font-weight-normal text-999">今日预估收益(元)</span>
			  	<p class="fs_20 m-0 mt-2">{{withdraw.today_money}}</p>
			  </van-col>
			  <van-col :span="7" class="text-center">
			  	<span class="fs_14 font-weight-normal text-999">昨日收益(元)</span>
			  	<p class="fs_20 m-0  mt-2">{{withdraw.yesterday_money}}</p>
			  </van-col>
			</van-row>
		</section>

		<!-- 我的团队 -->
		<section class="mt-4">
			<h3 class="fs_18 m-0">我的团队</h3>
			<div class="mt-3 bg_dark-400 official">
				<div class="d-flex justify-content-between align-items-center p-3">
					<div class="d-flex align-items-center">
						<van-image round width="45" height="45" :src="director.avatar" />
						<div class="ml-3">
							<h4 class="fs_18 m-0">{{director.name}}</h4>
							<p class="m-0 fs_12 mt-1 opacity-40">遇到问题加微信咨询我哦</p>
						</div>
					</div>
					<van-button color="#FE2C58" 
						v-clipboard:copy="director.wx_name"
        		v-clipboard:success="onCopy"
        		v-clipboard:error="onError">复制微信</van-button>
				</div>
			</div>

			<div class="mt-3 bg_dark-400 recruit p-3">
				<van-row>
					<van-col span="6" class="text-center">
						<router-link :to="'myTeam'">	
							<van-image width="35" height="35" :src="require('@/assets/images/recruit_team.png')" />
							<p class="m-0 mt-1 font-weight-normal">我的团队</p>
						</router-link>
					</van-col>
					<van-col span="6" class="text-center">
						<router-link :to="'poster'">	
							<van-image width="35" height="35" :src="require('@/assets/images/recruit_pic.png')" />
							<p class="m-0 mt-1 font-weight-normal">招商素材</p>
						</router-link>
					</van-col>
					<van-col span="6" class="text-center">
						<div @click="onlineService">	
							<van-image width="35" height="35" :src="require('@/assets/images/recruit_service.png')" />
							<p class="m-0 mt-1 font-weight-normal">在线客服</p>
						</div>
					</van-col>
					<van-col span="6" class="text-center">
						<div @click="addTeam">	
							<van-image width="35" height="35" :src="require('@/assets/images/recruit_group.png')" />
							<p class="m-0 mt-1 font-weight-normal">加入群聊</p>
						</div>
					</van-col>
				</van-row>
				<!-- 是会员 -->
				<div class="mt-3" v-if="profile.is_vip == 2">
					<van-button class="border-radius-4 fs_16" size="large">点击这里招募团队</van-button>
				</div>
				<!-- 未开通会员 -->
				<div class="mt-3" v-else>
					<van-row :gutter="15">
						<van-col span="12">
							<van-button class="border-radius-4 fs_16 invite_bth" size="large" @click="inviteFriend">邀请好友</van-button>
						</van-col>
						<van-col span="12">
							<van-button class="border-radius-4 fs_16" size="large" @click="toBeMember">开通会员</van-button>
						</van-col>
					</van-row>
					
				</div>
			</div>
		</section>

		<!-- 其他功能 -->
		<section class="mt-4">
			<h3 class="fs_18 m-0">其他功能</h3>
			<van-row class="mt-3">
<!-- 				<van-col span="6" class="text-center mb-3">
					<router-link :to="'douyin'">
						<van-image width="35" height="35" :src="require('@/assets/images/other_fun1.png')" />
						<p class="m-0 mt-2 font-weight-normal">我的抖音号</p>
					</router-link>
				</van-col> -->
				<van-col span="6" class="text-center mb-3">
					<router-link :to="'income'">
						<van-image width="35" height="35" :src="require('@/assets/images/other_fun2.png')" />
						<p class="m-0 mt-2 font-weight-normal">收益报表</p>
					</router-link>
				</van-col>
				<van-col span="6" class="text-center mb-3">
					<router-link :to="'documents?id=18'">
						<van-image width="35" height="35" :src="require('@/assets/images/other_fun3.png')" />
						<p class="m-0 mt-2 font-weight-normal">服务协议</p>
					</router-link>
				</van-col>
				<van-col span="6" class="text-center mb-3">
					<router-link :to="'documents?id=19'">
						<van-image width="35" height="35" :src="require('@/assets/images/other_fun4.png')" />
						<p class="m-0 mt-2 font-weight-normal">隐私政策</p>
					</router-link>
				</van-col>
				<van-col span="6" class="text-center mb-3">
					<router-link :to="'documents?id=20'">
						<van-image width="35" height="35" :src="require('@/assets/images/other_fun5.png')" />
						<p class="m-0 mt-2 font-weight-normal">推广规范</p>
					</router-link>
				</van-col>
			</van-row>
		</section>

		<!-- 图片弹框 -->
		<van-dialog v-model="dialogImgShow" :title="dialogImgTitle" :show-cancel-button="false" :showConfirmButton="false" :closeOnClickOverlay="true" class="codeDialog">
			<div class="text-center pt-3 pb-3">
			  <img :src="dialogImgUrl" />
			  <p class="m-0 opacity-60 mt-2">长按图片保存到相册</p>
		  </div>
		</van-dialog>	

	</div>
</template>

<script>
	export default {
		name: 'index',
		data () {
			return {
				// 个人信息
				profile:{
				},

				dialogImgShow:false,
				dialogImgTitle:"",
				dialogImgUrl:'https://img.yzcdn.cn/vant/apple-2.jpg',
				// 收益
				withdraw:{
				},

				// 负责人
				director:{
					// avatar: "https://img.yzcdn.cn/vant/apple-2.jpg",
					// name: "暂无",
					// wx_name: "暂无"
				},
				// serviceWechat:'客服的微信',
				// teamWechat:"微信群的ID",
				weChatInputShow:false,
				wxName:"",
			}
		},
		components: {},
		mounted(){
			this.onLoad();
		},
		methods:{
			// 获取个人信息
			onLoad(){
				this.MyAxios.post("/api/wechat/user/index",{

				}).then(data => {
					if (data.code == 0) {
						this.profile = data.data.customer_info;
						this.withdraw = data.data.money_data;
						this.director = data.data.agent_info;
						if(this.isEmpty(this.profile.mobile)){
							this.profile.mobile = "请绑定手机号"
						};
					} else {
						this.$notify({
              message: data.msg,
              type: 'warning'
            });
					}
				})
			},
			// 关注公众号
			showQR(){
				this.MyAxios.post("/api/wechat/base/get_base_info",{
					id:39,
				}).then(data => {
					if (data.code == 0) {
						this.dialogImgShow = true;
						this.dialogImgTitle = data.data.title;
						this.dialogImgUrl = data.data.value;
					} else {
						this.$notify({
              message: data.msg,
              type: 'warning'
            });
					}
				})
			},
			// 绑定微信号
			bindWeChat(){
				this.MyAxios.post("/api/wechat/user/edit_wx",{
					//token:"",
					wx_name:this.wxName,
				}).then(data => {
					if (data.code == 0) {
						this.weChatInputShow = false;
						this.$toast.success('设置微信号成功');
						setTimeout(()=>{
					  	this.onLoad();
					 	},1000)
					} else {
						this.$notify({
              message: data.msg,
              type: 'warning'
            });
					}
				})
			},
			inviteFriend(){
				if(this.isEmpty(this.profile.mobile)){
					this.$dialog.alert({
					  title: '温馨提示',
					  message: '请绑定手机号',
					}).then(() => {
					  // on close
					});
				};
				console.log("邀请好友");
			},
			// 在线客服
			onlineService(){
				this.MyAxios.post("/api/wechat/base/get_base_info",{
					id:21,
				}).then(data => {
					if (data.code == 0) {
						this.dialogImgShow = true;
						this.dialogImgTitle = data.data.title;
						this.dialogImgUrl = data.data.value;
					} else {
						this.$notify({
              message: data.msg,
              type: 'warning'
            });
					}
				})
			},
			// 加入群聊
			addTeam(){
				this.MyAxios.post("/api/wechat/base/get_base_info",{
					id:40,
				}).then(data => {
					if (data.code == 0) {
						this.dialogImgShow = true;
						this.dialogImgTitle = data.data.title;
						this.dialogImgUrl = data.data.value;
					} else {
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
	    // 开通会员
	    toBeMember(){
	    	this.$router.push("openMember");
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
	.wxName .van-button{
		height: 35px!important;
	}
</style>