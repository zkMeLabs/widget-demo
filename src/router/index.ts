import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior () {
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/DappHome.vue'),
      meta: {
        noAuth: true
      }
    },

    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
