<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <button class="btn btn-black" @click="logout">
        <i class="fa fa-sign-out" />
        登出
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const logout = async () => {
  await localStorage.removeItem('Token')
  await router.push('/')
}
</script>

<style scoped></style>
