<template>
	<div class="page-container">
		<section class="user_list">
			<template v-for="(list,index) in userList">
				<van-row type="flex" justify="space-between" align="center" class="bg_dark-400 p-3 mb-3">
					<van-col :span="14">
						<div class="d-flex align-items-center">
							<van-image round width="45" height="45" :src="list.avatarUrl" />
							<div class="ml-3">
								<div class="fs_16 font-weight-normal">{{list.name}}</div>
								<div class="fs_12 font-weight-normal mt-1 opacity-60">粉丝数：<span>{{list.fansNum}}</span></div>
							</div>
						</div>
					</van-col>
					<van-col :span="8">
						<i class="badge"></i><span class="fs_16 font-weight-normal opacity-60">剩余{{list.remainDays}}天</span>
					</van-col>
					<van-col :span="2" class="text-right">
						<van-icon name="ellipsis" size="30" color="#fff" @click="action(list)"/>
					</van-col>
				</van-row>
			</template>
    </section>

    <!-- 添加抖音号 -->
    <section class="p_fixed add_user">
    	<van-button size="large" color="#FE2C58" class="border-radius-4 fs_16">添加抖音号</van-button>
    </section>

    <!-- 抖音 -->
		<section class="p_fixed dou_hang">
			<van-image width="50" height="50" :src="require('@/assets/images/myDouyin_hang.png')" />
		</section>
		
		<!-- 弹窗、重新授权或删除 -->
		<van-popup v-model="popupShow" round position="bottom" :style="{ height: '30%' }">
			<div class="text-center p-3">
				<h4 class="m-0 fs_18 text-333">授权剩余{{actionDays}}天</h4>
				<van-button size="large" color="#FE2C58" class="border-radius-4 fs_16 mt-4">重新授权</van-button>
				<van-button size="large" color="#C0C0C0" class="border-radius-4 fs_16 mt-4">删除抖音号</van-button>
			</div>
		</van-popup>
	</div>
</template>

<script>
	export default {
		name: 'MyDouyin',
		data () {
			return {
				userList:[
					{
						avatarUrl:"https://img.yzcdn.cn/vant/cat.jpeg",
						name:"张三",
						fansNum:"15",
						remainDays:"14",
					},
					{
						avatarUrl:"https://img.yzcdn.cn/vant/cat.jpeg",
						name:"李四",
						fansNum:"50",
						remainDays:"10",
					},
					{
						avatarUrl:"https://img.yzcdn.cn/vant/cat.jpeg",
						name:"王五",
						fansNum:"20",
						remainDays:"5",
					},
				],
				popupShow:false,
				actionDays:0,
			}
		},
		components: {
		},
		methods:{
			action(list){
				this.popupShow = true;
				this.actionDays = list.remainDays;

			},
		},
	}
</script>

<style>

</style>