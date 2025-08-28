<script setup>
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()
</script>

<template>
  <div>
    <h1>Members Area</h1>
    <p>Welcome, {{ auth.user?.username }}!</p>
  </div>
</template>
