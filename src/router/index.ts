import { createRouter, createWebHistory } from 'vue-router'
import HomeV1 from '../views/v1/HomeV1.vue'
import HomeV2 from '../views/v2/HomeV2.vue'

const routes = [
  {
    path: '/',
    name: 'HomeV1',
    component: HomeV1
  },
  {
    path: '/v2',
    name: 'HomeV2',
    component: HomeV2
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
