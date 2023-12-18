<template>
  <h3>Factory Details Page</h3>
  <button @click='navigateEdit'>Edit</button>
  <router-view></router-view>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { usePageStore } from '../stores/pageState'

export default {
    beforeRouteEnter(to, from){
        const authStore = useAuthStore()
        if(!authStore.getUserId){
            return '/login'
        }

        const pageStore = usePageStore()
        pageStore.setShowError(false)
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