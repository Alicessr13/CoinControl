import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/components/Dashboard.vue'
import LoginPage from '@/components/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
    },
  ],
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  if (to.name === 'dashboard' && !token) {
    next('/login');
  } else {
    next();
  }
});

export default router
