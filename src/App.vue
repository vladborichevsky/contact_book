<template>
  <night-mode/>
  <router-view/>
</template>

<script>
  import NightMode from './components/NightMode.vue';

  export default {
    components: { NightMode }
  }
</script>

<style scoped>

</style>