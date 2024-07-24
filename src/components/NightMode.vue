<template>
  <div class="night_mode_wrapper">
    <!-- через v-if и v-else меняются символы луны и солнца при переключении ночного режима -->
    <div 
      v-if="nightMode" 
      @click="nightModeChange" 
      class="night_mode" 
      :class="{ night_mode_class_off: nightMode }">
        &#9788;
    </div>

    <div 
      v-else 
      @click="nightModeChange" 
      class="night_mode">
        &#9789;
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex' 

  export default {

    computed: {
      ...mapState({
        nightMode: state => state.nightMode
      })
    },

    methods: {
      ...mapMutations({
        setNightMode: 'setNightMode'
      }),

      nightModeChange() {
        this.setNightMode(!this.nightMode)
      }
    }

  }
</script>

<style scoped>
  .night_mode_wrapper {
    position: absolute;
    top: 40px;
    right: 200px;
  }

  .night_mode {
    width: 45px;
    height: 45px;
    display: flex;
    justify-content: center;
    border-radius: 100%;
    border: 1px solid var(--black-color);
    line-height: 45px;
    font-size: 30px;
    cursor: pointer;
  }

  .night_mode:hover {
    background-color: var(--black-color);
    color: var(--white-color);
  }

  .night_mode_class_off {
    border: 1px solid var(--white-color);
    color: var(--white-color);
  }

  .night_mode_class_off:hover {
    background-color: var(--white-color);
    color: var(--black-color);
  }
</style>