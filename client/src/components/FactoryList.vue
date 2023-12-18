<template>
  <h3>Factory List Table Page {{username}}</h3>
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
        console.log(authStore.getUserId);
        if(!authStore.getUserId){
            return '/login';
        }

        const pageStore= usePageStore()
        pageStore.setShowError(false)
    },
    methods: {
        navigateEdit: function(){
            this.$router.push(`factorylist/edit/${123123}`)
        }
    },
    setup(){
        const authStore = useAuthStore()

        return {
            username: authStore.getUserName
        }
    }
}
</script>

<style>

</style>