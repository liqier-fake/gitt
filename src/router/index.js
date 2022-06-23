import Vue from 'vue'
import VueRouter from 'vue-router'

 
Vue.use(VueRouter)

const routes = [
  // 首页
  {
    path: '/',
    name: 'Home',
    component:()=>import('../views/Home.vue')
  },
  // 所有场景
  {
    path: '/sceneDetails',
    name: 'SceneDetails',
    component:()=>import('../views/SceneDetails.vue')

  },
  // 场景详情
  {
    path:'/tempDetail',
    name:'TempDetail',
    component:()=>import('../views/TempDetail.vue')

  },

  // 所有主题
  {
    path:'/themeDetails',
    name:'ThemeDetails',
    component:()=>import('../views/ThemeDetails.vue')

  }
  ,

  // 搜索
  {
    path:'/search',
    name:'Search',
    component:()=>import('../views/Search.vue')

  },
  // 我的设计
  {
    path:'/myDesign',
    name:'MyDesign',
    component:()=>import('../views/MyDesign.vue')

  },
  // 个人中心
  {
    path:'/userCenter',
    name:'UserCenter',
    component:()=>import('../views/UserCenter.vue')

  },
  {
    path:'/register',
    name:'Register',
    component:()=>import('../views/Register.vue')

  },

]

const router = new VueRouter({
  routes
})

export default router
