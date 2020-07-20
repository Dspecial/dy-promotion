<template>
	<div class="page-container">
		<section class="text-center">
			<van-image round width="60" height="60" :src="avatarUrl" />
			<p class="m-0 mt-2 fs_16 font-weight-normal">{{name}}</p>
		</section>
		<!-- 激活码 -->
		<section class="mt-3 bg_yellow-200 border-radius-4 p-3">
			<h5 class="m-0 fs_18 font-weight-normal text_yellow-300 text-center">财源广进卡激活会员</h5>
			<van-form @submit="onSubmit" class="memberCode_form">
				<p class="fs_16 m-0 mt-3">请输入财源广进卡激活码：</p>
			  <van-field
			  	class="mt-3"
			    v-model="username"
			    name="招财进宝卡激活码"
			    placeholder="请输入招财进宝卡激活码"
			    :rules="[{ required: true, message: '请填写招财进宝卡激活码' }]"
			  />
			  <div class="mt-3">
			    <van-button round block color="#161F30" class="border-radius-4 text_yellow-200 fs_16" native-type="submit" >
			      激活会员
			    </van-button>
			  </div>
			</van-form>
		</section>
		<p class="m-0 mt-3 font-weight-normal text_yellow-400 fs_12">官方财源广进激活码唯一购途径，联系团队负责人购买，统一价
格为298元！</p>

		<!-- 负责人 -->
		<section class="bg_dark-400 official mt-3">
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
		<!-- 激活须知 -->
		<section class="mt-3 text_yellow-400 font-weight-normal">
			<h6 class="m-0 mb-2">激活须知</h6>
			<p class="m-0 mb-2">1.输入财源广进卡激活码即可激活会员收益；</p>
			<p class="m-0 mb-2">2.激活成功后即升级为会员，享受会员服务；</p>
			<p class="m-0 mb-2">3.财源广进卡激活码可向团队负责人购买活的。</p>
			<p class="m-0 mb-2">*注：如果通过其他途径购买上当受骗，与平台无关！</p>
		</section>
	</div>
</template>

<script>
	export default {
		name: 'ActivationOpenMember',
		data () {
			return {
				avatarUrl:"https://img.yzcdn.cn/vant/cat.jpeg",
				name:"片刻安静",
				username: '',

				directorUrl:"https://img.yzcdn.cn/vant/apple-2.jpg",
				directorWechat:"负责人微信",
			}
		},
		components: {},
		methods:{
			// 提交激活码
			onSubmit(values) {
	      console.log('submit', values);
	    },
	    // 复制到粘贴板成功
			onCopy: function (e) {
	      this.$toast.success("复制成功\n" + e.text);
	    },
	    // 复制到粘贴板失败
	    onError: function (e) {
	      this.$toast.fail("复制失败");
	    },
		},
	}
</script>

<style>

</style>