<template>
  <button 
		class="my_button">
    <slot></slot>
  </button>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'my-button',

		computed: {
      ...mapState({
        nightMode: state => state.nightMode
      })
    },
  }
</script>

<style scoped>
  .my_button {
		width: 100px;
		text-transform: uppercase;
		padding: 8px 16px;
		cursor: pointer;
		border-radius: 2px;
		font-size: 16px;
		transition: all 0.3s;
		margin: 0 5px;
		color: var(--white-color);
	}

	.my_button:hover {
		transition: all 0.3s;
	}
</style>