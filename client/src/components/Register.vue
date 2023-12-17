<template>
  <h3>Register Page</h3>
</template>

<script>
import { useAuthStore } from '../stores/auth'
export default {
  beforeRouteEnter(to, from){
    const authStore = useAuthStore()
    if(authStore.getUserId){
      return '/factorylist'
    }
  }
}
</script>

<style>

</style>