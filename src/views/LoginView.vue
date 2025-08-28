<template>
  <section style="max-width:480px;margin:2rem auto;">
    <h1>Login</h1>
    <form @submit.prevent="onSubmit">
      <label style="display:block;margin-top:.5rem;">
        <span>Username</span>
        <input v-model="username" autocomplete="username" style="width:100%;padding:.5rem;border:1px solid #ccc;border-radius:.5rem;">
      </label>

      <label style="display:block;margin-top:.5rem;">
        <span>Password</span>
        <input v-model="password" type="password" autocomplete="current-password" style="width:100%;padding:.5rem;border:1px solid #ccc;border-radius:.5rem;">
      </label>

      <p v-if="error" style="color:crimson;margin-top:.5rem;">{{ error }}</p>

      <button style="margin-top:1rem;padding:.5rem .9rem;border:none;border-radius:.5rem;background:#222;color:#fff;cursor:pointer;">
        Sign in
      </button>
    </form>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const username = ref('')
const password = ref('')
const error = ref('')

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

const onSubmit = async () => {
  error.value = ''
  const ok = await auth.login(username.value.trim(), password.value)
  if (ok) {
    const redirect = route.query.redirect || '/about'
    router.push(redirect)
  } else {
    error.value = 'Invalid credentials. Try member / library123'
  }
}
</script>
