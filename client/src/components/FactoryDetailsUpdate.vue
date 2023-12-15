<template>
  <h3>Factory Details Update Page</h3>
  {{detailId}}
</template>

<script>
export default {
    data(){
        return {
            detailId: this.$route.params.detail_id
        }
    }
}
</script>

<style>

</style>