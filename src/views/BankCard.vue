<template>
	<div class="page-container">
		<!-- 默认页 -->
		<div class="p-absolute default_img text-center" v-if="isDefault">
			<van-image :src="defaultImg" class="flex-fill-100"/>
			<p class="m-0 mt-3 fs_16 flex-fill-100">这里还没有任何内容哦</p>
		</div>
		<template v-for="(cell,index) in bankCardList">
			<div class="bank_cell p-3 mb-3">
				<van-row type="flex" align="center" justify="space-between">
					<van-col class="d-flex align-items-center">
						<div class="border-radius-large bank_logo d-flex justify-content-center align-items-center">
							<van-image width="25" height="25" :src="cell.type == 2?alipayLogo:bankLogo" />
						</div>
						<span class="fs_16 font-weight-normal ml-2">{{cell.type == 1?cell.bank_name:cell.type_text}}</span>
					</van-col>
					<van-col>
						<span class="font-weight-normal"><i class="badge bg_green"></i>审核通过</span>
					</van-col>
				</van-row>

				<van-row type="flex" align="center" justify="space-between" class="mt-3">
					<van-col>
						<span class="fs_18 font-weight-normal" v-if="cell.isVisible">{{cell.type == 2?numSplit(cell.alipay):numSplit(cell.bank_code)}}</span>
						<span class="fs_18 font-weight-normal" v-else>{{cell.type == 2?phoneNumFilter(cell.alipay):bankCodeFilter(cell.bank_code)}}</span>
					</van-col>
					<van-col>
						<van-icon :name="cell.isVisible?'eye':'closed-eye'" color="#fff" size="20" @click="cell.isVisible = !cell.isVisible"/>
					</van-col>
				</van-row>

				<van-row type="flex" align="center" justify="space-between" class="mt-3">
					<van-col>
						<span class="fs_18 font-weight-normal">{{cell.truename}}</span>
					</van-col>
					<van-col>
						<span class="fs_12 font-weight-normal">每人每月限额 {{quota}}</span>
					</van-col>
				</van-row>
			</div>
		</template>

    <!-- 添加银行卡 -->
    <section class="p_fixed add_user">
	    <router-link :to="'addBankcard'" v-if="isCertified">
	    	<van-button size="large" color="#FE2C58" class="border-radius-4 fs_16">添加银行卡</van-button>
	    </router-link>
	    <router-link :to="''" v-else>
	    	<van-button size="large" color="#FE2C58" class="border-radius-4 fs_16">实名认证</van-button>
	    </router-link>
    </section>
	</div>
</template>

<script>
	export default {
		name: 'BankCard',
		data () {
			return {
				isDefault:false, // 显示缺省页面
				isCertified: true,// 是否进行了实名认证
				defaultImg:require("@/assets/images/default.png"),
				alipayLogo:require("@/assets/images/Alipay.png"),
				bankLogo:require("@/assets/images/bank.png"),
				bankCardList:[],
				quota:"9万元",
			}
		},
		components: {},
		mounted(){
			this.onLoad();
		},
		methods:{
			onLoad(){
				this.MyAxios.post("/api/wechat/deposit/index",{
				}).then(data => {
					if (data.code == 0) {
						var list = [];
						data.data.map((item,index)=>{
					   	list.push(
					      Object.assign(item,{isVisible:false})
					    )
					  });
					  this.bankCardList = list;
					  if(this.bankCardList.length == 0){
					  	this.isDefault = true;
					  }
					} else {
						this.$notify({
              message: data.msg,
              type: 'warning'
            });
					}
				})
			},
			// 电话号码加密
			phoneNumFilter (phone) {
				var _phone = '';
				// 1字符串转化成数组
				let phoneArr = [...phone];
				// 2.将数组中的4-7位变成*
				phoneArr.map((res, index) => {
					if (index > 2 && index < 7) {
						_phone += '*';
					} else {
						_phone += res;
					}
				});
				return _phone;
			},

			// 银行账号加密
			bankCodeFilter (code) {
				var _code = '';
				// 1字符串转化成数组
				let codeArr = [...code];
				// 2.将数组中的5-15位变成*
				codeArr.map((res, index) => {
					if (index > 3 && index < 15) {
						_code += '*';
					} else {
						_code += res;
					}
				});
				return _code;
			},

			// 加分隔符
			numSplit(value){
				let len = value.length;
				if (len <= 13) {
					value = value.replace(/^(\d{3})(\d{4})/g, '$1 $2 ')
				} else if (len > 13) {
					value = value.replace(/(\d{4})(?=\d)/g, '$1 ')
				}
				return value;
			}
		}
	}
</script>

<style>

</style>