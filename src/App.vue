<template>
  <night-mode/>
  <router-view/>
</template>


<script>
  import { mapMutations } from 'vuex' 
  import NightMode from './components/NightMode.vue';

  export default {
    components: { 
      NightMode 
    },

    methods: {
      ...mapMutations({
        setNightMode: 'setNightMode'
      })
    },

    mounted() {
      // проверяем в localStorage ночной режим
      if (localStorage.getItem('nightMode') == 'true') {
        this.setNightMode(true)
      } else if (localStorage.getItem('nightMode') == 'false') {
        this.setNightMode(false)
      }
    }
  }
</script>
