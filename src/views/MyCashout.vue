<template>
	<div class="page-container">
		<!-- 账户余额 -->
		<section class="bg_dark-400 p-3 text-center">
			<h5 class="m-0 fs_16 font-weight-normal">账户余额(元)</h5>
			<p class="m-0 mt-3 fs_30">{{balance}}</p>
		</section>

		<van-form @submit="onSubmit">
			<section class="mt-3 bg_dark-400 p-3">
				<h5 class="m-0 d-flex align-items-center">
					<img :src="require('@/assets/images/wechat.png')" alt="" width="22px" />
					<span class="ml-2 fs_16">微信提现</span>
				</h5>
				<hr class="item_hr" />

				<div class="mt-4">
					<h5 class="m-0 fs_16">提现金额</h5>
					<div class="mt-3 outMoney">
						<!-- 允许输入数字，调起带符号的纯数字键盘 -->
						<van-field v-model="number" name="提现金额" type="number" label="¥" 
							:rules="[{ required: true, message: '请填写提现金额' }]">
						</van-field>
					</div>
				</div>
				<hr class="item_hr" />

				<div class="mt-4">
					<p class="m-0 fs_16">可提现金额 ¥<span>{{balance2}}</span><span class="text_yellow-400 ml-3" @click="outAll()">全部提现</span></p>
				</div>
			</section>

	    <!-- 提现 -->
	    <section class="mt-4">
		    <van-button size="large" color="#FE2C58" class="border-radius-4 fs_16" native-type="submit">提现</van-button>
	    </section>

    </van-form>
	</div>
</template>

<script>
	export default {
		name: '',
		data () {
			return {
				balance:"1000.00",
				number:"",
				balance2:"1000.00",
			}
		},
		components: {},
		methods:{
			outAll(){
				this.number = this.balance2;
			},
			onSubmit(values) {
	      console.log('submit', values);
	      this.$router.push("cashoutFinished");
	    }
		}
	}
</script>

<style>

</style>