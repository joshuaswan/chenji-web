import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import OrderList from '@/components/OrderList'
import Storage from '@/components/Storage'
import GoodsName from '@/components/GoodsName'
import GoodsType from '@/components/GoodsType'
import MeasureUnit from '@/components/MeasureUnit'
import StaffType from '@/components/StaffType'
import UserInfo from '@/components/UserInfo'
import print from '@/components/print'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component(resolve) {
        require.ensure(['@/components/Hello.vue'], () => {
          resolve(require('@/components/Hello.vue'));
        });
      },
      // 设置 mata 字段，表示该字段需要验证
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component(resolve) {
        require.ensure(['@/components/Login.vue'], () => {
          resolve(require('@/components/Login.vue'));
        });
      }
    },
    // 简单设置404页面
    {
      path: '*',
      component(resolve) {
        require.ensure(['@/components/404.vue'], () => {
          resolve(require('@/components/404.vue'));
        });
      },
      hidden: true
    },
    {
      path: '/OrderList',
      name: 'OrderList',
      component: OrderList
    },
    {
      path: '/Storage',
      name: 'Storage',
      component: Storage
    },
    {
      path: '/GoodsName',
      name: 'GoodsName',
      component: GoodsName
    },
    {
      path: '/GoodsType',
      name: 'GoodsType',
      component: GoodsType
    },
    {
      path: '/MeasureUnit',
      name: 'MeasureUnit',
      component: MeasureUnit
    },
    {
      path: '/StaffType',
      name: 'StaffType',
      component: StaffType
    },
    {
      path: '/UserInfo',
      name: 'UserInfo',
      component: UserInfo
    },
    {
      path: '/print',
      name: 'print',
      component: print
    }
  ]
})
