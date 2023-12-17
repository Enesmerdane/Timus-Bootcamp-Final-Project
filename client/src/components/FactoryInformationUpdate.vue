<template>
  <h3>Factory Information Update Page</h3>
  {{factoryId}}
</template>

<script>
import { useAuthStore } from '../stores/auth'

export default {
    beforeRouteEnter(to, from){
        const authStore = useAuthStore()
        if(!authStore.getUserId){
            return '/login'
        }
    },
    data(){
        return {
            factoryId: this.$route.params.factory_id
        }
    },
}
</script>

<style>

</style>