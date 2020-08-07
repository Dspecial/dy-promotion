<template>
	<div class="page-container">

	</div>
</template>

<script>
	export default {
		name: 'Author',
		data () {
			return {

			}
		},
		components: {},
		mounted(){
			this.getAuth();
		},
		methods:{
			// 授权
			getAuth(){

		    var code = this.getWxVariable('code');
        var invite_code = this.getWxVariable('invite_code');

				this.MyAxios.get("/api/wechat/wechat/get_wx_user",{
					params: {
			      code:code,
						invite_code:invite_code,	
			    }
				}).then(data => {
					console.log(data);
					if (data.code == 0) {

					} else {
						this.$notify({
              message: data.msg,
              type: 'warning'
            });
					}
				})
			},

			// 获取微信返回的地址
			getWxVariable(variable){
	      var query = window.location.search.substring(1);
	      var vars = query.split("&");
	      for (var i=0;i<vars.length;i++) {
          var pair = vars[i].split("=");
          if(pair[0] == variable){return pair[1];}
	      }
	      return(false);
	  	}

		},

	}
</script>

<style>

</style>