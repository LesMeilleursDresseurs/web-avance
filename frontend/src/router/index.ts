import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
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
      name: 'Series',
      component: () => import('../views/ListSeriesView.vue'),
    },
    {
      path: '/poke',
      name: 'poke',
      component: () => import('../views/ListPoke.vue'),
    },
    {
      path: '/poke/:id',
      name: 'PokeDetail',
      component: () => import('../views/PokeDetail.vue'),
      props: (route) => ({ id: Number(route.params.id) }),
    },
    {
      path: '/series/:id',
      name: 'CardsOfSerie',
      component: () => import('../views/CardsOfSerie.vue'),
      props: (route) => ({ id: String(route.params.id) }),
    },
  ],
})

export default router
