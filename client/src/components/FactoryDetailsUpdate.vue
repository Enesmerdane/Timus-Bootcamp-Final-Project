<template>
  <h3>Factory Details Update Page</h3>
  {{detailId}}
</template>

<script>
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
    data(){
        return {
            detailId: this.$route.params.detail_id
        }
    }
}
</script>

<style>

</style>