
<template>
  <RouterView />
  <button @click="action">Action</button>
  <button @click="action2">Action2</button>
  Hello world
</template>

<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth'
import { useFactoryStore } from './stores/factory'

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
        const factoryStore = useFactoryStore()
        //factoryStore.loadFactoryList(1)
        factoryStore.loadFactoryDetailsList("722e4577-8a79-4ef1-a004-94ec891bea82", 1)
      }
    }
}

</script>

<style scoped>

</style>
