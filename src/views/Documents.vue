<template>
	<div class="page-container documents-container">
		<div v-html="text"></div>
	</div>
</template>

<script>
	export default {
		name: 'Documents',
		data () {
			return {
				text:"<p class='m-0'>用户协议</p>",
			}
		},
		props:['protocolid'],
		components: {

		},
		mounted(){
			var id = this.isEmpty(this.$route.query.id)?this.protocolid:this.$route.query.id;
			this.onLoad(id);
		},
		methods:{
			// 获取信息id id=18服务协议;id=19隐私政策;id=20推广规范;id=21客服微信;id=22平台名称;id=23平台logo,id=24结算规则,id=25平台综合服务协议
			onLoad(id){
				this.MyAxios.post("/api/wechat/base/get_base_info",{
					id:id,
				}).then(data => {
					//console.log(data);
					if (data.code == 0) {
						this.text = data.data.value;
					} else {
						this.$notify({
              message: data.msg,
              type: 'warning'
            });
					}
				})
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

<style lang="scss">
	.documents-container div,.documents-container table{
		color:#fff!important;
		background: transparent!important;
		width: 100%!important;
	}
	.documents-container span,.documents-container p{
		color:#fff!important;
		background: transparent!important;
	}

	.van-dialog{
		.documents-container div,.documents-container table{
			color:#000!important;
			background: transparent!important;
			width: 100%!important;
		}
		.documents-container span,.documents-container p{
			color:#000!important;
			background: transparent!important;
		}
	}
</style>