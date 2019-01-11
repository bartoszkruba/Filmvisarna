import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import KontaktSida from '@/components/KontaktSida'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/kontaktSida',
      name: 'KontaktSida',
      component: KontaktSida
    }

  ]
})
