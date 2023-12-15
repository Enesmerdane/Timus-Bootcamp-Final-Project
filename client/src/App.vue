
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

        authStore.login('enes2@gmail.com', '12312312')
    }
}

</script>

<style scoped>

</style>
