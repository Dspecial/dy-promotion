import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  scrollBehavior (to, from, savedPosition) { //简单的让页面滚动到顶部
    return { x: 0, y: 0 }
  },
  routes: [
  	{
			path:'/',
			name:'默认页',
			redirect:'/index'
		},
    {
      path: '/home',
      name: '主页',
      component: () => import('@/views/Home'),
      redirect:'/index',
      children:[
        {
          path:'/index',
          name:'Index',
          meta:{
            title:'首页',
          },
          icon:{
            active: require('@/assets/images/tab_home_active.png'),
            inactive: require('@/assets/images/tab_home.png'),
          },
          component:()=>import('@/views/Index'),
        },
        {
          path:'/data',
          name:'DataCenter',
          meta:{
            title:'数据',
          },
          icon:{
            active: require('@/assets/images/tab_num_active.png'),
            inactive: require('@/assets/images/tab_num.png'),
          },
          component:()=>import('@/views/DataCenter')
        },
        {
          path:'/profile',
          name:'Profile',
          meta:{
            title:'个人中心',
          },
          icon:{
            active: require('@/assets/images/tab_per_active.png'),
            inactive: require('@/assets/images/tab_per.png'),
          },
          component:()=>import('@/views/Profile')
        },
      ],
    },
    {
      path: '/home_nei',
      name: '内页主体结构',
      component: () => import('@/views/HomeNei'),
      children:[
        {
          path: '/introduction',
          name: 'IntroductionVideo',
          meta:{
            title:'玩法介绍',
          },
          component: () => import('@/views/IntroductionVideo'),
        },
        {
          path: '/douyin',
          name: 'MyDouyin',
          meta:{
            title:'我的抖音号',
          },
          component: () => import('@/views/MyDouyin'),
        },
        {
          path: '/news',
          name: 'NewsList',
          meta:{
            title:'每日资讯',
          },
          component: () => import('@/views/NewsList'),
        },
        {
          path: '/productDetail',
          name: 'productDetail',
          meta:{
            title:'产品详情页',
          },
          component: () => import('@/views/productDetail'),
        },
        {
          path: '/income',
          name: 'IncomeStatement',
          meta:{
            title:'收益报表',
          },
          component: () => import('@/views/IncomeStatement'),
        },
        {
          path: '/myPurse',
          name: 'MyPurse',
          meta:{
            title:'我的钱包',
          },
          component: () => import('@/views/MyPurse'),
        },
        {
          path: '/revenueRecord',
          name: 'RevenueRecord',
          meta:{
            title:'收益记录',
          },
          component: () => import('@/views/RevenueRecord'),
        },
        {
          path: '/cashoutRecord',
          name: 'CashoutRecord',
          meta:{
            title:'提现记录',
          },
          component: () => import('@/views/CashoutRecord'),
        },
        {
          path: '/myCashout',
          name: 'MyCashout',
          meta:{
            title:'我的提现',
          },
          component: () => import('@/views/MyCashout'),
        },
        {
          path: '/cashoutFinished',
          name: 'CashoutFinished',
          meta:{
            title:'提现已完成',
          },
          component: () => import('@/views/CashoutFinished'),
        },
        {
          path: '/bankCard',
          name: 'BankCard',
          meta:{
            title:'银行卡',
          },
          component: () => import('@/views/BankCard'),
        },
        {
          path: '/addBankcard',
          name: 'BankcardAdd',
          meta:{
            title:'添加银行卡',
          },
          component: () => import('@/views/BankcardAdd'),
        },
        {
          path: '/myTeam',
          name: 'MyTeam',
          meta:{
            title:'我的团队',
          },
          component: () => import('@/views/MyTeam'),
        },
        {
          path: '/openMember',
          name: 'OpenMember',
          meta:{
            title:'开通会员',
          },
          component: () => import('@/views/OpenMember'),
        },
        {
          path: '/activationOpenMember',
          name: 'ActivationOpenMember',
          meta:{
            title:'激活码开通会员',
          },
          component: () => import('@/views/ActivationOpenMember'),
        },
        {
          path: '/poster',
          name: 'Poster',
          meta:{
            title:'招商海报',
          },
          component: () => import('@/views/Poster'),
        },
      ],
    },
  ]
})