
<template>
  <RouterView />
  <button @click="action">Action</button>
  <button @click="action2">Action2</button>
  Hello world
</template>

<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth'
import { useFactoryListStore } from './stores/factoryList'

export default {
    created: () => {
        const authStore = useAuthStore()

        //authStore.login('enes2@gmail.com', '12312312')
        //authStore.register('test2@gmail.com', 'Aa111111', 'testtesta', 0)
        //console.log();

        
    },
    methods: {
      action(){
        const authStore = useAuthStore()
        //authStore.logout()
        authStore.login('enes2@gmail.com', '12312312')
        //authStore.renewToken()
      },
      action2(){
        const authStore = useAuthStore()
        //authStore.renewToken()
        const factoryStore = useFactoryListStore()
        factoryStore.loadFactoryList(1)
      }
    }
}

</script>

<style scoped>

</style>
