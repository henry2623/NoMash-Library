import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import AccessDeniedView from '../views/AccessDeniedView.vue'
import { useAuthStore } from '@/stores/auth'

const routes = [
  { path: '/',        name: 'Home',   component: HomeView,        meta: { public: true } },
  { path: '/login',   name: 'Login',  component: LoginView,       meta: { public: true } },
  { path: '/about',   name: 'About',  component: AboutView,       meta: { requiresAuth: true } },
  { path: '/denied',  name: 'access-denied', component: AccessDeniedView, meta: { public: true } },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const auth = useAuthStore()

  if (to.meta && to.meta.public) return true

  if (to.meta && to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'Login', query: { redirect: to.fullPath } }
  }

  const need = to.meta && to.meta.roles
  const role = (auth.user && auth.user.role) || 'user'
  if (need && !need.includes(role)) {
    return { name: 'access-denied' }
  }

  return true
})

export default router
