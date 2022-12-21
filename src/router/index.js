import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    // name: 'layout',
    component: () => import('@/views/layout/index.vue'),
    children: [
      {
      path: '',
      name: 'home',
      component: () =>import('@/views/home/home.vue')
    }, 
    {
      path: '/qa',
      name: 'qa',
      component: () =>import('@/views/qa/qa.vue')
    }, 
    {
      path: '/vedio',
      name: 'vedio',
      component: () =>import('@/views/vedio/vedio.vue')
    }, 
    {
      path: '/my',
      name: 'my',
      component: () =>import('@/views/my/my.vue')
    }]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/index.vue')
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article/index.vue'),
    props: true//开启props传参
  },
  {
    path: '/user/profile',
    name: 'userProfile',
    component: () => import('@/views/user_profile/index.vue'),
  },
  
]

const router = new VueRouter({
  routes
})

export default router
