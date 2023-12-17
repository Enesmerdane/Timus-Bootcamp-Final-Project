<template>
  <h3>Factory Details Update Page</h3>
  {{detailId}}
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
            detailId: this.$route.params.detail_id
        }
    }
}
</script>

<style>

</style>