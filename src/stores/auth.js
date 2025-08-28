import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()

  const token = ref(localStorage.getItem('token'))
  const user  = ref(token.value ? JSON.parse(localStorage.getItem('user') || 'null') : null)

  const isAuthenticated = computed(() => !!token.value)

  const DEMO = { username: 'member', password: 'library123', role: 'user' }

  async function login(username, password) {
    if (username === DEMO.username && password === DEMO.password) {
      token.value = 'demo-token'
      user.value  = { username, role: DEMO.role }
      localStorage.setItem('token', token.value)
      localStorage.setItem('user', JSON.stringify(user.value))
      return true
    }
    return false
  }

  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push({ name: 'Login', query: { redirect: '/' } })
  }

  return { isAuthenticated, user, login, logout }
})
