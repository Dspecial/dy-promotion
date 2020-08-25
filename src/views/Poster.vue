<template>
	<div class="page-container">
		<template>
		  <swiper ref="mySwiper" :options="swiperOptions" class="mySwiper scaleSwiper pt-5 pb-5">
		  	<swiper-slide v-for="(poster, index) in swipePoster" :key="index">
			    <img v-lazy="poster.images"/>
			  </swiper-slide>
				<div class="swiper-pagination" slot="pagination"></div>
		  </swiper>
		</template>

		<!-- 生成推广海报 -->
    <section class="p_fixed add_user">
    	<van-button size="large" color="#FE2C58" class="border-radius-4 fs_16" @click="toBePoster">生成推广海报</van-button>
    </section>

    <!-- 推广海报 -->
		<van-dialog v-model="posterShow" :title="'推广海报'" :show-cancel-button="false" :showConfirmButton="false" :closeOnClickOverlay="true" class="posterDialog">
			<div class="text-center pt-3 pb-3">
			  <img :src="posterImg" />
			  <p class="m-0 opacity-60 mt-2">长按图片保存到相册</p>
		  </div>
		</van-dialog>
	</div>
</template>

<script>
	export default {
		name: 'Poster',
		data () {
			return {
				swiperOptions: {
					slidesPerView: 'auto',
		      centeredSlides: true,
		      observer:true,//修改swiper自己或子元素时，自动初始化swiper 
          observeParents:true,//修改swiper的父元素时，自动初始化swiper 
		      autoplay: {
		        delay: 3000,
		        disableOnInteraction: false,
		      },
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
        },
        swipePoster:[
				],
				posterShow:false,
				posterImg:'',

			}
		},
		components: {},
		computed: {
      swiper() {
        return this.$refs.mySwiper.$swiper
      }
    },
    mounted() {
    	this.onLoad();
      this.swiper.slideTo(1, 1000, false);
    },
    methods:{
    	onLoad(){
    		this.MyAxios.post("/api/wechat/user/get_template_list",{

				}).then(data => {
					if (data.code == 0) {
						this.swipePoster = data.data;
					} else {
						this.$notify({
              message: data.msg,
              type: 'warning'
            });
					}
				})
    	},
    	toBePoster(){
    		var id = this.swipePoster[this.swiper.activeIndex].id;
    		this.MyAxios.post("/api/wechat/user/create_template_img",{
    			id:id,
				}).then(data => {
					if (data.code == 0) {
						this.posterShow = true;
						this.posterImg = data.data;
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