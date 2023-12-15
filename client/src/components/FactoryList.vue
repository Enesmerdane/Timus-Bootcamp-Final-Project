<template>
  <h3>Factory List Table Page</h3>
  <button @click='navigateEdit'>Edit</button>
  <router-view></router-view>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
export default {
    methods: {
        navigateEdit: function(){
            this.$router.push(`factorylist/edit/${123123}`)
        }
    }
}
</script>

<style>

</style>