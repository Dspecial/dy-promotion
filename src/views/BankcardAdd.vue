<template>
	<div class="page-container">
		<section>
			<p class="text_pink-400 m-0">为了您的资金安全，大额提现会通过第三方支付代发。</p> 
			<p class="text_pink-400 m-0">请填写实名信息和银行卡进行验证。</p> 
			<p class="text_pink-400 m-0">由于银行限额，每人每月限额9万元，如需提现更多，您可以绑定亲属实名信息用于周转。</p>
		</section>

		<section class="mt-3">
			<van-form @submit="onSubmit" class="bank_form">
			  <van-field
			  	class="d-flex flex-wrap"
			    v-model="username"
			    label="真实姓名"
			    name="真实姓名"
			    placeholder="请输入您的名字"
			    required
			    :border="false"
			    :error="false"
			    :rules="[{ required: true, message: '请填写您的真实姓名' }]"
			  />
			  <van-field
			  	class="d-flex flex-wrap"
			    v-model="IDNumber"
			    label="身份证号码"
			    name="身份证号码"
			    placeholder="请输入您的身份证号码"
			    required
			    :border="false"
			    :error="false"
			    :rules="[{ required: true, message: '请填写您的身份证号码' }]"
			  />

				<section class="promotion-tabs">
					<van-tabs type="card"  v-model="active" @click="onTabClick">
					  <van-tab v-for="(tab,index) in bankTabCard" :key="index" :title="tab.title" class="data_tab_content">
					  	<!-- ITEM -->
					  	<div class="mt-3">
								<van-field
									v-if="index==0"
									class="d-flex flex-wrap"
								  readonly
								  clickable
								  right-icon="play"
								  name="picker"
								  :value="tab.bank"
								  label="选择办卡银行"
								  placeholder="点击选择办卡银行"
								  required
							    :border="false"
							    :error="false"
							    :rules="[{ required: true, trigger:'onChange',message: '请选择办卡银行' }]"
								  @click="showPicker = true"
								/>

								<van-field
							  	class="d-flex flex-wrap"
							    v-model="tab.cardNum"
							    :label="index==0?'银行卡账号':'支付宝账号'"
							    :name="index==0?'银行卡账号':'支付宝账号'"
							    :placeholder="index==0?'请输入您的银行卡账号':'请输入您的支付宝账号'"
							    required
							    :border="false"
							    :error="false"
							    :rules="[{ required: true, message: index==0?'请填写您的银行卡账号':'请填写您的支付宝账号' }]"
							  />
					  	</div>
							<van-field
						  	class="d-flex flex-wrap"
						    v-model="mobile"
						    :label="index==0?'银行卡预留手机号':'支付宝绑定的手机号'"
							  :name="index==0?'银行卡预留手机号':'支付宝绑定的手机号'"
						    :placeholder="index==0?'请输入您的银行卡预留手机号':'请输入您的支付宝绑定的手机号'"
						    type="tel"
						    required
						    :border="false"
						    :error="false"
						    :rules="[{ required: true, message: index==0?'请填写您的银行卡预留手机号':'请输入您的支付宝绑定的手机号' }]"
						  />
					  	<!-- /ITEM -->
					  </van-tab>
					</van-tabs>
				</section>

				<div class="d-flex align-items-center">
					<div class="mr-2">
						<van-field name="checkbox" class="my_checkbox" :border="false">
						  <template #input>
						    <van-checkbox v-model="checkbox" checked-color="#FE2C58" />
						  </template>
						</van-field>
					</div>
					<div class="opacity-60 fs_12">本人承诺已阅读并同意<span @click="protocolDialog = !protocolDialog" class="text_yellow-400">《{{protocolTitle}}》</span>，本人按照协议内容向贵公司提供相应的服务。</div>
				</div>

				<!-- 提交银行卡 -->
			  <div class="mt-4">
			    <van-button round block color="#FE2C58" class="border-radius-4 fs_16" native-type="submit">
			      提交
			    </van-button>
			  </div>
			</van-form>
		</section>

		<!-- 银行卡选择 -->
		<van-popup v-model="showPicker" position="bottom">
		  <van-picker
		    show-toolbar
		    value-key="bankname"
		    :columns="bankColumns"
		    @confirm="onConfirm"
		    @cancel="showPicker = false"
		  />
		</van-popup>
		
		<!-- 《灵活用工平台综合服务协议》 -->
		<van-dialog v-model="protocolDialog" :title="protocolTitle" class="protocol">
	  	<Document :protocolid="protocolid"></Document>
		</van-dialog>
	</div>
</template>

<script>
	import Document from '@/views/Documents';
	export default {
		name: 'BankcardAdd',
		data () {
			return {
				username: '',
      	IDNumber: '',
      	active:0,
      	submitType:'',
      	bankColumns: [],
      	showPicker: false,
      	bankTabCard:[
					{
						title:"银行卡",
						bank_id:"",
						bank:"",
						cardNum:"",
					},
					{
						title:"支付宝账户",
						cardNum:"",
					},
				],
				mobile:'',
				checkbox:false,
				protocolTitle:"灵活用工平台综合服务协议",
				protocolid:"25",
				protocolDialog:false,
			}
		},
		components: {
			Document
		},
		mounted(){
			this.loadBank();	
		},
		methods:{
	    // tab切换
    	onTabClick(name,title){
				this.submitType = name + 1;
			},
			// 获取银行列表
			loadBank(){
				this.MyAxios.post("/api/wechat/deposit/bank_list",{
				}).then(data => {
					if (data.code == 0) {
						this.bankColumns = data.data;
					} else {
						this.$notify({
              message: data.msg,
              type: 'warning'
            });
					}
				})
			},
			onConfirm(value) {
	      this.bankTabCard[0].bank = value.bankname;
	      this.bankTabCard[0].bank_id = value.id;
	      this.showPicker = false;
	    },
	    // 提交
			onSubmit(values) {
				if(this.checkbox){
					//console.log('submit', values);
					this.addBankcard();
	    	}else{
	    		this.$dialog.confirm({
					  title: '温馨提示',
					  message: '请先阅读并同意《灵活用工平台综合服务协议》',
					  showCancelButton:false,
					})
	    	}
	    },
	    // 调添加银行卡号接口
	    addBankcard(){
	    	var _this = this;
				this.MyAxios.post("/api/wechat/deposit/add",{
					truename: this.username, // 真实姓名
					idcode: this.IDNumber, // 身份证号码
					type: this.submitType, // 类型:1=银行卡,2=支付宝
					bank_id: this.bankTabCard[0].bank_id, // 银行id，当type为1时必传
					bank_code: this.bankTabCard[0].cardNum, // 银行账号,当type为1时必传
					alipay: this.bankTabCard[1].cardNum, // 支付宝账号,当type为2时必传
					mobile: this.mobile, // 预留手机号
				}).then(data => {
					//console.log(data);
					if (data.code == 0) {
            this.$toast.success({
							message:"添加银行卡成功",
							duration:2000,
							onClose:function(){
								_this.$router.go(-1);
							},
						});
					} else {
						this.$notify({
              message: data.msg,
              type: 'warning'
            });
					}
				})
	    },
		},
	}
</script>

<style>

</style>