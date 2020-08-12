<template>
	<div class="page-container cashOut-container">
		<!-- 账户余额 -->
		<section class="bg_dark-400 p-3 text-center">
			<h5 class="m-0 fs_16 font-weight-normal">账户余额(元)</h5>
			<p class="m-0 mt-3 fs_30">{{balance}}</p>
		</section>

		<van-form @submit="onSubmit">
			<section class="mt-3 bg_dark-400 p-3">

				<h5 class="m-0 d-flex align-items-center">
					<img :src="logoType==1?bankLogo:logoType==2?alipayLogo:wechatLogo" alt="" width="22px" />
					<van-field
						class="d-flex flex-nowrap justify-content-start align-items-center"
					  readonly
					  clickable
					  colon
					  label="提现账户"
					  label-width="65"
					  right-icon="play"
					  name="picker"
					  :value="cashOutText"
					  placeholder="点击选择提现账户"
				    :border="false"
				    :error="false"
				    :rules="[{ required: true, trigger:'onChange',message: '请选择提现账户' }]"
					  @click="showPicker = true"
					/>
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

    <!-- 银行卡/支付宝选择 -->
		<van-popup v-model="showPicker" position="bottom">
		  <van-picker
		    show-toolbar
		    value-key="text"
		    :columns="cashOutAccount"
		    @confirm="onConfirm"
		    @cancel="showPicker = false"
		  />
		</van-popup>

	</div>
</template>

<script>
	export default {
		name: '',
		data () {
			return {
				balance:"",
				number:"",
				balance2:"",
				showPicker: false,
				logoType:"",// 1是银行卡；2是支付宝；其余是微信
				cashOutText:'', // 默认微信提现:微信
				cashOutId:"", // 默认微信提现:wechat
				wechatLogo:require('@/assets/images/wechat.png'),
				alipayLogo:require("@/assets/images/Alipay.png"),
				bankLogo:require("@/assets/images/bank.png"),
				cashOutAccount:[
					{
						type:3,
						id:"wechat",
						text: "微信",
					},
				],
			}
		},
		components: {},
		mounted(){
			this.onLoadBalance();
			this.onLoadBank();
		},
		methods:{
			onLoadBalance(){
				this.MyAxios.post("/api/wechat/deposit/my_deposit",{
				}).then(data => {
					if (data.code == 0) {
						this.balance = data.data;
						this.balance2 = data.data;
					} else {
						this.$notify({
              message: data.msg,
              type: 'warning'
            });
					}
				})
			},
			onLoadBank(){
				this.MyAxios.post("/api/wechat/deposit/index",{
				}).then(data => {
					if (data.code == 0) {
						var pickerOption = [];
						data.data.map((item,index)=>{
							if(item.type == 1){ // 银行卡
								pickerOption.push(
									Object.assign(item,{text:item.bank_name + ' (' + item.bank_code.slice(-4) + ') '})
								)
							}else if(item.type == 2){ // 支付宝
								pickerOption.push(
									Object.assign(item,{text:item.type_text + ' (' + item.alipay + ') '})
								)
							}
						});
						this.cashOutAccount.push(...pickerOption);
					} else {
						this.$notify({
              message: data.msg,
              type: 'warning'
            });
					}
				})
			},
			onConfirm(value) {
	      this.cashOutText = value.text;
	      this.logoType = value.type;
	      this.cashOutId = value.id;
	      this.showPicker = false;
	    },
			outAll(){
				this.number = this.balance2;
			},
			onSubmit(values) {
	      var _this = this;
				this.MyAxios.post("/api/wechat/deposit/apply_deposit",{
					deposit_type:this.cashOutId,
					deposit_money:this.number,
				}).then(data => {
					if (data.code == 0) {
            this.$toast.loading({
							message:"提交中...",
							duration:3000,
							onClose:function(){
								_this.$router.push("cashoutFinished?cash="+this.number);
							}
						});
					} else {
						this.$notify({
              message: data.msg,
              type: 'warning'
            });
					}
				})
	    },
		}
	}
</script>

<style>

</style>