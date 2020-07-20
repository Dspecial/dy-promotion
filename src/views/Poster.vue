<template>
	<div class="page-container">
		<template>
		  <swiper ref="mySwiper" :options="swiperOptions" class="mySwiper scaleSwiper pt-5 pb-5">
		  	<swiper-slide v-for="(poster, index) in swipePoster" :key="index">
			    <img v-lazy="poster"/>
			  </swiper-slide>
				<div class="swiper-pagination" slot="pagination"></div>
		  </swiper>
		</template>

		<!-- 生成推广海报 -->
    <section class="p_fixed add_user">
    	<van-button size="large" color="#FE2C58" class="border-radius-4 fs_16" @click="toBePoster">生成推广海报</van-button>
    </section>
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
					require("@/assets/images/poster1.jpg"),
        	require("@/assets/images/poster1.jpg"),
        	require("@/assets/images/poster1.jpg"),
				],

			}
		},
		components: {},
		computed: {
      swiper() {
        return this.$refs.mySwiper.$swiper
      }
    },
    mounted() {
      this.swiper.slideTo(1, 1000, false);
    },
    methods:{
    	toBePoster(){
    		console.log(this.swiper.activeIndex);
    	},
    },
	}
</script>

<style>

</style>