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
					<van-tabs type="card" @click="onTabClick">
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
							    :placeholder="'请输入您的' + index==0?'银行卡账号':'支付宝账号'"
							    required
							    :border="false"
							    :error="false"
							    :rules="[{ required: true, message: index==0?'请填写您的银行卡账号':'请填写您的支付宝账号' }]"
							  />

								<van-field
							  	class="d-flex flex-wrap"
							    v-model="tab.tel"
							    label="银行卡预留手机号"
							    name="银行卡预留手机号"
							    placeholder="请输入您的银行卡预留手机号"
							    type="tel"
							    required
							    :border="false"
							    :error="false"
							    :rules="[{ required: true, message: '请填写您的银行卡预留手机号' }]"
							  />

					  	</div>
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
					<div class="opacity-60 fs_12">本人承诺已阅读并同意<span>《灵活用工平台综合服务协议》</span>，本人按照协议内容向贵公司提供相应的服务。</div>
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
		    :columns="columns"
		    @confirm="onConfirm"
		    @cancel="showPicker = false"
		  />
		</van-popup>
	</div>
</template>

<script>
	export default {
		name: 'BankcardAdd',
		data () {
			return {
				username: '',
      	IDNumber: '',
      	columns: ['中国银行', '农业银行', '建设银行', '工商银行', '广发银行', '南京银行'],
      	showPicker: false,
      	bankTabCard:[
					{
						title:"银行卡",
						bank:"",
						cardNum:"12121",
						tel:""
					},
					{
						title:"支付宝账户",
						cardNum:"",
						tel:""
					},
				],
				checkbox:false,
			}
		},
		components: {},
		methods:{
	    // tab切换
    	onTabClick(name,title){
				this.$toast(name);
			},
			onConfirm(value) {
	      this.bankTabCard[0].bank = value;
	      this.showPicker = false;
	    },
			onSubmit(values) {
				if(this.checkbox){
					console.log('submit', values);
	    		this.$router.go(-1);
	    	}else{
	    		this.$dialog.confirm({
					  title: '温馨提示',
					  message: '请先阅读并同意《灵活用工平台综合服务协议》',
					  showCancelButton:false,
					})
	    	}
	    },
		},
	}
</script>

<style>

</style>