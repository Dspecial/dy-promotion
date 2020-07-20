<template>
	<div class="vant-field-date">
	  <van-cell
			:value="value"
			:title="label"
			:class="{'readonly': readonly, 'placeholder' : text}"
			:is-link="!readonly"
			:required="required"
			@click="show">
	  	<!-- 显示当前值，没有值显示提示文字 -->
	   	{{ text ? text : placeholder }}
	   	<!-- 自定义错误显示 -->
	   	<div
				v-if="$attrs.error"
				v-text="$attrs['error-message']"
				class="van-field__error-message"
	   	/>
	  </van-cell>
	  <!-- 用 actionsheet 来包裹弹出层日期控件 -->
	  <van-action-sheet v-model="isShowPicker">
	   	<!-- $attrs 可以把根节点的attr放到目标组件上，如此可以像使用 DatePicker 组件一样使用这个新组件 -->
	   	<van-datetime-picker
				v-model="currentDate"
				v-bind="$attrs"
				:type="type"
				title="请选择日期"
				:min-date="minDate"
				:max-date="maxDate"
				@cancel="cancel"
				@confirm="confirm"
			/>
	  </van-action-sheet>
	</div>
</template>
 
<script>
	export default {
	  name: 'VantFieldDate',
	  inheritAttrs: false, // https://cn.vuejs.org/v2/api/#inheritAttrs
	  props: {
			value: {
				type: [Number, Date, String],
				default: undefined // 值不能是 null，DatePicker会报错
			},
			// Cell 显示的文字
			label: {
				type: String,
				default: null
			},
			// 必填的星号
			required: {
				type: Boolean,
				default: false
			},
			// 只读状态
			readonly: {
				type: Boolean,
				default: false
			},
			// 占位提示文字
			placeholder: {
				type: String,
				default: '请选择'
			},
			// 展示的格式化
			format: {
				type: String,
				default: null
			},
			// 日期类型
			type:{
				type: String,
				default: 'datetime'
			},
			// 可选的最小时间
			minDate:{
				type: Date,
				default: new Date(2018, 0, 1)
			},
			// 可选的最大时间
			maxDate:{
				type: Date,
				default: new Date(2025, 12, 31),
			}
	  },
	  data() {
		  return {
		    selectedItem: null,
		    isShowPicker: false,
		    currentDate:new Date(),
		  }
	  },
	  computed: {
		  // 展示的格式化，时间提交的值是Date类型数据
		  formatFormula() {
		    if(this.format){
		    	return this.format
		    } else if (this.type === 'date') {
		    	return 'yyyy-MM-dd'
		    } else if (this.type === 'datetime') {
		    	return 'yyyy-MM-dd hh:mm'
		    } else if (this.type === 'time') {
		    	return 'hh:mm'
		    } else if (this.type === 'year-month') {
		    	return 'yyyy-MM'
		    }
		  },
		  text() {
		   	return this.value ? this.dateFormat(this.value, this.formatFormula) : ''
		  }
	  },
	  methods: {
		  dateFormat: (value, format) => {
		    if (!value) return
		    if (!(value instanceof Date)) {
		    	value = new Date(value)
		    }
		    let o = {
					'M+': value.getMonth() + 1, // month
					'd+': value.getDate(), // day
					'h+': value.getHours(), // hour
					'm+': value.getMinutes(), // minute
					's+': value.getSeconds(), // second
					'q+': Math.floor((value.getMonth() + 3) / 3), // quarter
					'S': value.getMilliseconds() // millisecond
		    }
		 
		    if (!format || format === '') {
		    	format = 'yyyy-MM-dd hh:mm:ss'
		    }
		 
		    if (/(y+)/.test(format)) {
		    	format = format.replace(RegExp.$1, (value.getFullYear() + '').substr(4 - RegExp.$1.length))
		    }
		 
		    for (let k in o) {
		     	if (new RegExp('(' + k + ')').test(format)) {
		    		format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
		     	}
		    }
		    return format
		  },
		  show() {
		    if (!this.readonly) {
		    	this.isShowPicker = true
		    }
		  },
		  confirm(value) {
		    // 更新 v-model 绑定的 value 值，同时用this.$emit向父组件传递方法，父组件可使用的方法是 input 和 change 
		    // 第二个参数是毫秒数，第三个参数是原始值，第四个参数是格式过dateFormat的日期。根据自己的项目的数据结构来修改
		    
		    // input 事件同时也会触发 vee-validate 的验证事件
		    this.$emit('input', value.getTime(), value , this.dateFormat(value, this.formatFormula))
		    // onChange事件，虽然重写 @input可以实现，但这样会破坏 v-model 写法。
		    this.$emit('change', value.getTime(), value , this.dateFormat(value, this.formatFormula))
		    this.cancel();
		  },
		  // 隐藏弹框
		  cancel() {
		    this.isShowPicker = false
		  }
	  }
	}
</script>
<style>
	.vant-field-date{

	}
	.vant-field-date .van-cell{
		background-color: #24262E;
		color: #fff;
	}
	.vant-field-date .van-cell__value--alone{
		color: #fff;
	}
	.vant-field-date .van-cell::after{
		border-bottom: 0;
	}
	.vant-field-date .van-icon-arrow::before{
		content: '\F0A1';
	}
	.vant-field-date .van-icon-arrow{
		transform:rotate(90deg);
	}
</style>