import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/components/Dashboard.vue'
import LoginPage from '@/components/Login.vue'
import RegisterPage from '@/components/RegisterPage.vue';
import ChangePassword from '@/components/ChangePassword.vue';
import HomePage from '@/components/HomePage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
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
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    },
    {
      path: '/change-password',
      name: 'change-password',
      component: ChangePassword
    }
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
