<template>
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills  align-items-center">
        <li class="nav-item">
       
          <router-link
            to="/"
            class="nav-link"
            exact-active-class="active"
            aria-current="page"
          >
            Home (Week 5)
          </router-link>
        </li>

        <li class="nav-item">
          <router-link
            to="/about"
            class="nav-link"
            active-class="active"
          >
            About
          </router-link>
        </li>

    

      
        <li class="nav-item" v-if="!auth.isAuthenticated">
          <router-link
            to="/login"
            class="nav-link"
            active-class="active"
          >
            Login
          </router-link>
        </li>
        <li class="nav-item" v-else>
          <button class="nav-link btn btn-link p-0" @click="auth.logout()">
            Logout ({{ auth.user?.username }})
          </button>
        </li>
      </ul>
    </header>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()
</script>
