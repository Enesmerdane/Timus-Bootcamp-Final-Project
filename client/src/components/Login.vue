<template>
    <div class="login-modal-view">
        <div class="welcome-title">

        </div>
        <div class="email-input-filed">

        </div>
        <div class="password-input-filed">

        </div>
        <button @click="()=>{}">Login</button>
        <div>
            Don't have any account? <router-link to='/register'>Register</router-link>
        </div>
    </div>
</template>

<script>
import { RouterLink } from 'vue-router'
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

<style scoped>
.login-modal-view {
    
}


</style>