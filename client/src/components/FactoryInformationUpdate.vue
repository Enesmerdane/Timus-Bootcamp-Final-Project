<template>
  <h3>Factory Information Update Page</h3>
  {{factoryId}}
</template>

<script>
export default {
    data(){
        return {
            factoryId: this.$route.params.factory_id
        }
    },
}
</script>

<style>

</style>