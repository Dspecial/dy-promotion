<template>
	<div class="page-container">
		<section class="my-team promotion-tabs3">
			<van-tabs type="card" @click="onTabClick">
			  <van-tab v-for="(tab,index) in teamTabCard" :key="index" class="team_tab_content">
			  	<template #title>
			  		<div class="fs_16">{{tab.title}}<span>({{tab.teamList.length}})</span></div>
			  	</template>
			  	<p class="m-0 mt-3 fs_12 font-weight-normal text_yellow-400 line_16">{{tab.tips}}</p>
			  	<!-- ITEM -->
			  	<van-list
						class="mt-3"
					  v-model="loading"
					  :finished="finished"
					  finished-text="没有更多了"
					  @load="onLoad">
				  	<template v-for="(cell,j) in tab.teamList">
				  		<van-row type="flex" justify="space-between" align="center" class="pt-2 pb-2 pl-3 pr-3 mb-3 data_item bg_dark-400">
				  			<van-col :span="16" class="d-flex align-items-end justify-content-between">
				  				<div class="d-flex  align-items-end">
				  					<van-image width="40" height="40" round :src="cell.avatar" />
					  				<div class="ml-3">
							  			<h5 class="m-0 fs_14 mb-1 text-truncate">{{cell.name}}</h5>
											<p class="m-0 fs_12 opacity-60 font-weight-normal">微信：{{cell.wx_name}}</p>
					  				</div>
					  			</div>
					  			<van-button plain hairline size="mini" class="team_copy_btn" 
					  				v-clipboard:copy="cell.wx_name"
        						v-clipboard:success="onCopy"
        						v-clipboard:error="onError">复制</van-button>
				  			</van-col>
				  			<van-col :span="8" class="text-right">
				  				<h5 class="m-0 fs_12 font-weight-normal opacity-60">加入时间</h5>
				  				<p class="m-0  fs_12 font-weight-normal opacity-60 mt-2">{{cell.createtime}}</p>
				  			</van-col>
				  		</van-row>
				  	</template>
			  	</van-list>
			  	<!-- /ITEM -->
			  </van-tab>
			</van-tabs>
		</section>
	</div>
</template>

<script>
	export default {
		name: 'MyTeam',
		data () {
			return {
				page: 0, 
        //limit: 5,
        total: 0, 
				loading: false,
      	finished: false,
				teamTabCard:[
					// {
					// 	title:"潜在用户",
					// 	tips:"以下粉丝将为您锁粉24小时，如果24小时内未开通或未绑定抖音号，后续时间付款开通VIP或绑定抖音号，所得收益可能归其他人所有。",
					// 	teamList:[
					// 	]
					// },
					{
						title:"已绑定",
						tips:"已经授权绑定抖音号，将永久是您的团队成员",
						teamList:[
						]
					},
					{
						title:"VIP会员",
						tips:"",
						teamList:[
						]
					},

				],
			}
		},
		components: {},
		mounted(){
			this.onLoad();
		},
		methods:{
			onLoad() {
	    	this.MyAxios.post("/api/wechat/user/team",{

				}).then(data => {
					console.log(data);
					if (data.code == 0) {
						this.teamTabCard[0].teamList = data.data.already_bind_list;
						this.teamTabCard[1].teamList = data.data.vip_list;
						this.finished = true; // 此处若有分页要重新修改
					} else {
						this.$notify({
              message: data.msg,
              type: 'warning'
            });
					}
				})
	    },
			// tab切换
    	onTabClick(name,title){
				this.onLoad();
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