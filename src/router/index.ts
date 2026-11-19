import { createRouter, createWebHistory } from 'vue-router'
import HomeV1 from '../views/v1/HomeV1.vue'
import { profile } from '@profile'

const routes = [
  {
    path: '/',
    name: 'HomeV1',
    component: HomeV1,
  },
  ...profile.extraRoutes,
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
