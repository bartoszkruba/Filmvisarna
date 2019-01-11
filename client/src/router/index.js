import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
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
      path: '/moviesPage',
      name: 'MoviesPage',
      component: MoviesPage
    }
  ]
})
