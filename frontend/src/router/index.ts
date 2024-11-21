import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
      path: '/login',
      name: 'LoginPage',
      component: () => import('../views/Login.vue'),
    },
    {
      path: '/poke/:id',
      name: 'PokeDetail',
      component: () => import('../views/PokeDetail.vue'),
      props: (route) => ({ id: Number(route.params.id) }),
    },
    {
      path: '/Profile',
      name: 'ProfilePage',
      component: () => import('../views/Profile.vue'),
    },
  ],
})

export default router
