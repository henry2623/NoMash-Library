import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import AccessDeniedView from '../views/AccessDeniedView.vue'
import FirebaseSigninView from '@/views/FirebaseSigninView.vue'
import FirebaseRegisterView from '@/views/FirebaseRegisterView.vue'

import { getAuth, onAuthStateChanged } from 'firebase/auth'


import Addbook from '@/views/Addbook.vue'


const routes = [
  { path: '/', name: 'Home', component: HomeView, meta: { public: true } },
  { path: '/about', name: 'About', component: AboutView, meta: { requiresAuth: true } },
  { path: '/denied', name: 'AccessDenied', component: AccessDeniedView, meta: { public: true } },
  { path: '/FireLogin', name: 'FireLogin', component: FirebaseSigninView, meta: { public: true } },
  { path: '/FireRegister', name: 'FireRegister', component: FirebaseRegisterView, meta: { public: true } },


  { path: '/:pathMatch(.*)*', redirect: '/' }

   { path: '/Addbook', Addbook: 'add', component: Addbook, meta: {public: true  } },

  { path: '/:pathMatch(.*)*', redirect: '/' },
  

]

const router = createRouter({
  history: createWebHistory(),
  routes
})


router.beforeEach((to, from, next) => {
  const auth = getAuth()
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    unsubscribe()

 
    if (to.meta.public) return next()

   
    if (to.meta.requiresAuth && !user) return next({ name: 'FireLogin', query: { redirect: to.fullPath } })

 
    if (to.meta.roles) {
      let role = 'user'
      if (user?.email === 'admin@example.com') role = 'admin'
      else if (user?.email === 'manager@example.com') role = 'manager'

      if (!to.meta.roles.includes(role)) return next({ name: 'AccessDenied' })
    }

    next()
  })
})

export default router
