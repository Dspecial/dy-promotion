<template>
	<div class="page-container">
		<template v-for="(cell,index) in bankCardList">
			<div class="bank_cell p-3 mb-3">
				<van-row type="flex" align="center" justify="space-between">
					<van-col class="d-flex align-items-center">
						<van-image width="25" height="25" round :src="cell.logoUrl" />
						<span class="fs_16 font-weight-normal ml-2">{{cell.bank}}</span>
					</van-col>
					<van-col>
						<span class="font-weight-normal"><i class="badge bg_green"></i>审核通过</span>
					</van-col>
				</van-row>

				<van-row type="flex" align="center" justify="space-between" class="mt-3">
					<van-col>
						<span class="fs_18 font-weight-normal">{{cell.cardNum}}</span>
					</van-col>
					<van-col>
						<van-icon :name="cell.isVisible?'eye':'closed-eye'" color="#fff" size="20" @click="cell.isVisible = !cell.isVisible"/>
					</van-col>
				</van-row>

				<van-row type="flex" align="center" justify="space-between" class="mt-3">
					<van-col>
						<span class="fs_18 font-weight-normal">{{cell.cardholder}}</span>
					</van-col>
					<van-col>
						<span class="fs_12 font-weight-normal">每人每月限额{{cell.cardLimit}}</span>
					</van-col>
				</van-row>
			</div>
		</template>

    <!-- 添加银行卡 -->
    <section class="p_fixed add_user">
	    <router-link :to="'addBankcard'">
	    	<van-button size="large" color="#FE2C58" class="border-radius-4 fs_16">添加银行卡</van-button>
	    </router-link>
    </section>
	</div>
</template>

<script>
	export default {
		name: 'BankCard',
		data () {
			return {
				bankCardList:[
					{
						logoUrl:require("@/assets/images/Alipay.png"),
						bank:"支付宝",
						cardNum:"138****2812",
						isVisible:true,
						cardholder:"张三",
						cardLimit:"9万",
					},
					{
						logoUrl:require("@/assets/images/CCB.png"),
						bank:"建设银行",
						cardNum:"*** **** **** **** 4231",
						isVisible:false,
						cardholder:"张三",
						cardLimit:"9万",
					},
				],
			}
		},
		components: {}
	}
</script>

<style>

</style>