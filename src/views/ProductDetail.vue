<template>
	<div class="page-container">
		<!-- info -->
		<section class="pro_info">
			<van-row :gutter="15" type="flex" justify="space-between">
			  <van-col>
			  	<div class="d-flex align-items-center">
			  		<van-image width="70" height="70" :src="proImgUrl"/>
			  		<div class="ml-3">
			  			<h5 class="m-0 fs_18">{{proTitle}}</h5>
			  			<p class="m-0 fs_14 opacity-60 mt-1">已有{{personNum}}人推广</p>
			  		</div>
					</div>
			  </van-col>
			  <van-col>
			  	<van-button class="mt-4" color="#FE2C58">下载程序码</van-button>
			  </van-col>
			</van-row>
			<div class="mt-3 fs_12 opacity-60 txt">{{proInfo}}</div>
		</section>
	
		<!-- 子产品 -->
		<section class="mt-4">
			<h4 class="m-0 fs_18">精选 {{proChild.length}} 款子产品</h4>
			<div class="item_child mt-3">
				<ul class="bg_dark-400 p-3">
					<template v-for="(child,index) in proChild">
						<li class="d-flex justify-content-between align-items-center mb-3">
							<van-image width="50" height="50" :src="child.imgUrl" />
							<div class="item_child_about item_child_txt ml-3">
								<h5 class="m-0 fs_14 mb-1 text-truncate">{{child.title}}</h5>
								<p class="m-0 fs_12 opacity-60 font-weight-normal">{{child.contentInfo}}</p>
							</div>
							<van-button color="#FE2C58">预览</van-button>
						</li>
					</template>
					<p class="m-0 mt-3 text-center">加载更多</p>
				</ul>
			</div>
		</section>

		<!-- 抖音小程序推广分佣比例 -->
		<section class="mt-4">
			<h4 class="m-0 fs_18">抖音小程序推广分佣比例</h4>
			<div class="mt-3 bg_dark-400 pl-2 pr-2 pt-3 pb-3">
				<van-row>
					<van-col :span="6" class="text-center">
						<h5 class="m-0 fs_16">广告分成</h5>
						<p class="fs_12 opacity-60 m-0 mt-3 font-weight-normal">预估eCPM</br>95%分成</p>
					</van-col>
					<van-col :span="6" class="text-center">
						<h5 class="m-0 fs_16">85%</h5>
						<p class="fs_12 opacity-60 m-0 mt-3 font-weight-normal">自己拍抖音</br>赚佣金比例</p>
					</van-col>
					<van-col :span="6" class="text-center">
						<h5 class="m-0 fs_16">7%</h5>
						<p class="fs_12 opacity-60 m-0 mt-3 font-weight-normal">直推团队拍</br>抖音佣金比例</p>
					</van-col>
					<van-col :span="6" class="text-center">
						<h5 class="m-0 fs_16">3%</h5>
						<p class="fs_12 opacity-60 m-0 mt-3 font-weight-normal">间接团队拍</br>抖音佣金比例</p>
					</van-col>
				</van-row>
				<p class="m-0 mt-3 text_yellow-400 fs_12 text-center">结算周期：次月发放收益</p>
			</div>
		</section>
		
		<!-- 个人收益 -->
		<section class="mt-4">
			<h4 class="m-0 fs_18">个人收益 <van-icon class-prefix="icon" name="loop3" size="15" color="#fff"/></h4>
			<!-- 日期下拉选择 -->
			<vant-field-date
				class="mt-3"
			  v-model="currentDate"
			  type="date"
			  :placeholder="'请选择想要查看的日期'"
			  :min-date="minDate"
			  :max-date="maxDate"
			  @change="onChange"
			/>
			<p class="m-0 fs_12 opacity-60 mt-3">07月份数据统计中，目前收益100元，预计08月31日发放</p>

			<div class="mt-4 bg_dark-400 p-3">
				<h4 class="m-0 fs_16">今日CPM收益 <van-icon class-prefix="icon" name="question3" size="10" color="#fff"/></h4>
				<van-row :gutter="15" class="mt-3">
					<van-col :span="12" class="text-center">
						<span class="fs_14 opacity-60 d-inline-block mr-2 font-weight-normal">本日预估收益</span>
						<span class="fs_18">10</span>
					</van-col>
					<van-col :span="12" class="text-center">
						<span class="fs_14 opacity-60 d-inline-block mr-2 font-weight-normal">本月收益</span>
						<span class="fs_18">10</span>
					</van-col>
				</van-row>

				<van-row :gutter="5" class="mt-4">
					<van-col :span="6" class="text-center">
						<h5 class="m-0 fs_16">60</h5>
						<p class="fs_14 opacity-60 m-0 mt-2 font-weight-normal">今日访问量</p>
					</van-col>
					<van-col :span="6" class="text-center">
						<h5 class="m-0 fs_16">80</h5>
						<p class="fs_14 opacity-60 m-0 mt-2 font-weight-normal">广告完播量</p>
					</van-col>
					<van-col :span="6" class="text-center">
						<h5 class="m-0 fs_16">30-200</h5>
						<p class="fs_14 opacity-60 m-0 mt-2 font-weight-normal">预估eCPM</p>
					</van-col>
					<van-col :span="6" class="text-center">
						<h5 class="m-0 fs_16">130.00</h5>
						<p class="fs_14 opacity-60 m-0 mt-2 font-weight-normal">昨日eCPM</p>
					</van-col>
				</van-row>
			</div>

			<!-- 团队收益 -->
			<div class="mt-4 promotion-tabs">
				<van-tabs type="card" @click="onTabClick">
				  <van-tab v-for="(tab,index) in dataTabCard" :key="index" :title="tab.title" class="proDetail_tab_content">
				  	<!-- 收益 -->
						<van-row :gutter="5" class="mt-4">
							<van-col :span="8" class="text-center">
								<h5 class="m-0 fs_18">{{tab.income.total}}</h5>
								<p class="fs_14 opacity-60 m-0 mt-2 font-weight-normal">本小程序总收益</p>
							</van-col>
							<van-col :span="8" class="text-center">
								<h5 class="m-0 fs_18">{{tab.income.yesterday}}</h5>
								<p class="fs_14 opacity-60 m-0 mt-2 font-weight-normal">昨日收益</p>
							</van-col>
							<van-col :span="8" class="text-center">
								<h5 class="m-0 fs_18">{{tab.income.today}}</h5>
								<p class="fs_14 opacity-60 m-0 mt-2 font-weight-normal">今日完播量</p>
							</van-col>
						</van-row>

				  	<!-- 列表 -->
				  	<div class="mt-4">
					  	<template v-for="(cell,j) in tab.cellList">
					  		<van-row type="flex" justify="space-between" align="center" class="pt-2 pb-2 pl-3 pr-3 mb-3 data_item bg_dark-400">
					  			<van-col :span="1" class="text-center data_sort mr-3">
					  				<span class="d-block">{{j+1}}</span>
					  			</van-col>
					  			<van-col :span="12" class="d-flex align-items-center">
					  				<van-image width="35" height="35" round :src="cell.userAvatar" />
					  				<span class="ml-3 fs_16">{{cell.userName}}</span>
					  			</van-col>
					  			<van-col :span="11" class="text-right">
					  				<div class="fs_16">¥<span class="ml-1">{{cell.amount}}</span></div>
					  			</van-col>
					  		</van-row>
					  	</template>
				  	</div>	
				  	<!-- /列表 -->

				  </van-tab>
				</van-tabs>
			</div>
		</section>
	</div>
</template>

<script>
	import VantFieldDate from '@/components/VantFieldDate'
	export default {
		name: 'ProductDetail',
		data () {
			return {
				proImgUrl:"https://img.yzcdn.cn/vant/cat.jpeg",
				proTitle:"心理评测平台",
				personNum:"338484",
				proInfo:"CPM广告收益，支持苹果和安卓。包含200多款心理评测，包括 情商、性格扫描、潜意识探测、人格魅力、恋爱、感情等愈合相 关测试，种类丰富。支持PC端发布自定义分享标题！",
				proChild:[
					{
						imgUrl:"https://img.yzcdn.cn/vant/cat.jpeg",
						title:"综合心里状态测试",
						contentInfo:"分享标题：超准免费心理评测",
					},
					{
						imgUrl:"https://img.yzcdn.cn/vant/cat.jpeg",
						title:"综合心里状态测试",
						contentInfo:"分享标题：超准免费心理评测600万人",
					},
					{
						imgUrl:"https://img.yzcdn.cn/vant/cat.jpeg",
						title:"综合心里状态测试",
						contentInfo:"分享标题：超准免费心理评测600万人",
					},
					{
						imgUrl:"https://img.yzcdn.cn/vant/cat.jpeg",
						title:"综合心里状态测试",
						contentInfo:"分享标题：超准免费心理评测600万人",
					},
				],
	      minDate: new Date(2020, 0, 1),
	      maxDate: new Date(2020, 11, 31),
	      currentDate: "2020-07-16",
	      dataTabCard:[
					{
						title:"直推团队收益",
						income:{
							total: "0.12",
							yesterday:"0.10",
							today:"0.00"
						},
						cellList:[
							{
								userAvatar:"https://img.yzcdn.cn/vant/cat.jpeg",
								userName:"张三",
								amount:"0.11"
							},
							{
								userAvatar:"https://img.yzcdn.cn/vant/cat.jpeg",
								userName:"李四",
								amount:"0.15"
							},
						]
					},
					{
						title:"间接团队收益",
						income:{
							total: "0.65",
							yesterday:"0.20",
							today:"0.15"
						},
						cellList:[
							{
								userAvatar:"https://img.yzcdn.cn/vant/cat.jpeg",
								userName:"张三",
								amount:"0.08"
							},
							{
								userAvatar:"https://img.yzcdn.cn/vant/cat.jpeg",
								userName:"李四",
								amount:"0.12"
							},
						]
					},
				],
			}
		},
		components: {
			VantFieldDate,
		},
		methods:{
			// tab切换
    	onTabClick(name,title){
				this.$toast(name);
			},
			// 日期下拉框值发生改变以后，@change 是接收的子组件的方法
			onChange(val1,val2,val3){ // val1是毫秒数，val2是原始值，val3是格式过的"yyyy-MM-dd"
				console.log(val3);
			},
		}
	}
</script>

<style>

</style>