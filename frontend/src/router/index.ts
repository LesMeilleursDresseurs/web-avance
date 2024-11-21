import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Login.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/series',
      component: () => import('../views/ListSeriesView.vue'),
    },
    {
      path: '/poke',
      name: 'poke',
      component: () => import('../views/ListPoke.vue'),
    },
    {
      path: '/poke/:name',
      name: 'PokeDetail',
      component: () => import('../views/PokeDetail.vue'),
      props: (route) => ({ name: String(route.params.name) }),
    },
  ],
})

export default router
