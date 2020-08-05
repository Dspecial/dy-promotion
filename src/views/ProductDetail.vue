<template>
	<div class="page-container">
		<!-- info -->
		<section class="pro_info">
			<van-row :gutter="15" type="flex" justify="space-between">
			  <van-col>
			  	<div class="d-flex align-items-center">
			  		<van-image width="70" height="70" :src="product_info.image"/>
			  		<div class="ml-3">
			  			<h5 class="m-0 fs_18">{{product_info.d_name}}</h5>
			  			<p class="m-0 fs_14 opacity-60 mt-1">已有{{product_info.allnumber}}人推广</p>
			  		</div>
					</div>
			  </van-col>
			  <van-col @click="downloadCode(1,id)">
			  	<van-button class="mt-4" color="#FE2C58">下载程序码</van-button>
			  </van-col>
			</van-row>
			<div class="mt-3 fs_12 opacity-60 txt">{{product_info.d_bref}}</div>
		</section>

		<!-- 下载推广码 -->
		<van-dialog v-model="pCodeShow" title="下载推广码" :show-cancel-button="false" :showConfirmButton="false" :closeOnClickOverlay="true" class="codeDialog">
			<div class="text-center pt-3 pb-3">
			  <img :src="codeImg" />
			  <p class="m-0 opacity-60 mt-2">长按图片保存到相册</p>
		  </div>
		</van-dialog>

		<!-- 子产品 -->
		<section class="mt-4">
			<h4 class="m-0 fs_18">精选 {{proChild.length}} 款子产品</h4>
			<div class="item_child mt-3">
				<ul class="bg_dark-400 p-3">
					<template v-for="(child,index) in proChild">
						<li class="d-flex justify-content-between align-items-center mb-3">
							<van-image width="50" height="50" :src="child.image" />
							<div class="item_child_about item_child_txt ml-3">
								<h5 class="m-0 fs_14 mb-1 text-truncate">{{child.matter_name}}</h5>
								<p class="m-0 fs_12 opacity-60 font-weight-normal">{{child.share_title}}</p>
							</div>
							<van-button color="#FE2C58" @click="downloadCode(2,child.id)">预览</van-button>
						</li>
					</template>
					<p class="m-0 mt-3 text-center" @click="onLoadProChild()" v-if="loadingChild">加载更多</p>
					<p class="m-0 mt-3 text-center opacity-60" v-if="finishedChild">没有更多了</p>
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
						<h5 class="m-0 fs_16">{{product_info.zitui_extends}}%</h5>
						<p class="fs_12 opacity-60 m-0 mt-3 font-weight-normal">自己拍抖音</br>赚佣金比例</p>
					</van-col>
					<van-col :span="6" class="text-center">
						<h5 class="m-0 fs_16">{{product_info.zhitui_extends}}%</h5>
						<p class="fs_12 opacity-60 m-0 mt-3 font-weight-normal">直推团队拍</br>抖音佣金比例</p>
					</van-col>
					<van-col :span="6" class="text-center">
						<h5 class="m-0 fs_16">{{product_info.jiantui_extends}}%</h5>
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
				id:"",
				product_info:{
				},
				pageChild: 0, 
        //limitChild: 5,
        totalChild: 0, 
				loadingChild: false,
      	finishedChild: false,
				proChild:[
				],
				pCodeShow:false, // 下载程序码
				codeImg:"",

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
		mounted(){
			this.id = this.$route.query.id;
			this.onLoadProDetails();
			this.loadProChildData();
		},
		methods:{
			onLoadProDetails(){
				this.MyAxios.post("/api/wechat/products/details",{
					id:this.id
				}).then(data => {
					if (data.code == 0) {
						//console.log(data);
						this.product_info = data.data.product_info;
					} else {
						this.$notify({
              message: data.msg,
              type: 'warning'
            });
					}
				})
			},
			// 加载产品
			onLoadProChild(){
				this.pageChild++; // 分页数加一
	     	this.loadProChildData(this.proActive); // 调用方法,请求数据
			},

			// 获取子产品列表数据
			loadProChildData(){
				this.MyAxios.post("/api/wechat/products/details",{
					id:this.id,
					page:this.pageChild,
				}).then(data => {
					if (data.code == 0) {
						/**
						 * 子产品列表
						 */
						var proChildData = data.data.product_children_list;
						if (proChildData.data.length === 0) {  		// 判断获取数据条数若等于0
              this.proChild = [];				// 清空数组
              this.finishedPro = true;		// 停止加载
            }
            if(this.pageChild == 1){
            	this.proChild = [];				// 清空数组
            	this.finishedChild = true;		// 停止加载
            }

            // 若数据条数不等于0
            this.proChild = [];				// 清空数组
            this.totalChild = proChildData.total;		// 给数据条数赋值

            this.proChild.push(...proChildData.data);	// 将数据放入list中
            this.loadingChild = false;			// 加载状态结束

            // 如果list长度大于等于总数据条数,数据全部加载完成
            if (this.proChild.length >= proChildData.total) {
              this.finishedChild = true;	// 结束加载状态
            }

					} else {
						this.$notify({
              message: data.msg,
              type: 'warning'
            });
					}
				})
			},

			// 下载推广码
			downloadCode(type,id){
				this.MyAxios.post("/api/wechat/products/get_extend_code",{
					// token:"",
					type:type, // 值为1传小程序id,值为2传小程序产品id
					id:id,
				}).then(data => {
					if (data.code == 0) {
						this.pCodeShow = true;
						// 推广图片
						this.codeImg = data.data;
					}else{
						this.$notify({
              message: data.msg,
              type: 'warning'
            });
					}
				})
			},
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