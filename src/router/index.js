import Vue from 'vue'
import Router from 'vue-router'
import House from '@/components/House'
import Ci from '@/components/ci'
import Xf from '@/components/xf'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'House',
      redirect:'/xf',
      component: House,
      children:[
        {
          path: 'xf',
          name: 'Xf',
          component: Xf
        },
        {
          path: 'ci',
          name: 'Ci',
          component: Ci
        },
      ]
    }
  ]
})
