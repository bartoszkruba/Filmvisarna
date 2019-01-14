import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import AdminPage from '@/components/AdminPage'
import KontaktSida from '@/components/KontaktSida'
import MoviesPage from '@/components/MoviesPage'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/adminpage',
      name: 'AdminPage',
      component: AdminPage
    },
    {
      path: '/kontaktSida',
      name: 'KontaktSida',
      component: KontaktSida
    },
    {
      path: '/moviesPage',
      name: 'MoviesPage',
      component: MoviesPage
    }

  ]
})
