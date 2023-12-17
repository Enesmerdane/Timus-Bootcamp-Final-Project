<template>
  <h3>Factory Details Page</h3>
  <button @click='navigateEdit'>Edit</button>
  <router-view></router-view>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from '../stores/auth'

export default {
    beforeRouteEnter(to, from){
        const authStore = useAuthStore()
        if(!authStore.getUserId){
            return '/login'
        }
    },
    methods: {
        navigateEdit: function(){
            this.$router.push(`factorydetails/edit/${789789}`)
        }
    }
}
</script>

<style>

</style>