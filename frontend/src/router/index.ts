import { createRouter, createWebHistory } from 'vue-router'
import store from '../store' // Import your Vuex store

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/ListPoke.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/series',
      name: 'Series',
      component: () => import('../views/ListSeriesView.vue'),
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: () => import('../views/Login.vue'),
    },
    {
      path: '/poke/:name',
      name: 'PokeDetail',
      component: () => import('../views/PokeDetail.vue'),
      props: (route) => ({ name: String(route.params.name) }),
    },
    {
      path: '/series/:id',
      name: 'CardsOfSerie',
      component: () => import('../views/CardsOfSerie.vue'),
      props: (route) => ({ id: String(route.params.id) }),
    },
    {
      path: '/Profile',
      name: 'ProfilePage',
      component: () => import('../views/Profile.vue'),
    },
  ],
})

export default router
