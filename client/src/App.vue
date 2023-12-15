
<template>
  <RouterView />
  Hello world
</template>

<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth'

export default {
    created: () => {
        const authStore = useAuthStore()

        //authStore.login('enes2@gmail.com', '12312312')
        //authStore.register('test2@gmail.com', 'Aa111111', 'testtesta', 0)
    }
}

</script>

<style scoped>

</style>
