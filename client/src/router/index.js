import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import AdminPage from '@/components/AdminPage'
import KontaktSida from '@/components/KontaktSida'
import BokningSida from '@/components/BokningSida'
import MoviesPage from '@/components/MoviesPage'
import Kalendarium from '@/components/Kalendarium'
import Startsida from '@/components/Startsida'
import Movie from '@/components/Movie'
import LoggaIn from '@/components/LoggaIn'
import MinSida from '@/components/MinSida'

Vue.use(Router)

export default new Router({
  routes: [
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
      path: '/LoggaIn',
      name: 'LoggaIn',
      component: LoggaIn
    },
    {
      path: '/MinSida',
      name: 'MinSida',
      component: MinSida
    }, 
    {
      path: '/bokningSida',
      name: 'BokningSida',
      component: BokningSida
    },
    {
      path: '/moviesPage',
      name: 'MoviesPage',
      component: MoviesPage
    },
    {
      path: '/kalendarium',
      name: 'Kalendarium',
      component: Kalendarium
    },
    {
      path:'/',
      name: 'Startsida',
      component: Startsida
    },
    {
      path: '/movie',
      name: 'Movie',
      component: Movie
    }

  ]
})
