import Vue from 'vue'
import Router from 'vue-router'

// 路由懒加载 

const layout = () => import('@/views/layout')
const index = () => import('@/views/index')
const discover = () => import('@/views/discover')
const order = () => import('@/views/order')
const profile = () => import('@/views/profile')
const search = () => import('@/views/search')
const shopDetail = () => import('@/views/shopDetail')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      redirect: 'index',
      component: layout,
      children: [
        {
          path: 'index',
          name: 'index',
          component: index,
        },
        {
          path: 'discover',
          name: 'discover',
          component: discover,
        },
        {
          path: 'order',
          name: 'order',
          component: order,
        },
        {
          path: 'profile',
          name: 'profile',
          component: profile,
        }
      ]
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/shopDetail',
      name: 'shopDetail',
      component: shopDetail
    }
  ]
})
