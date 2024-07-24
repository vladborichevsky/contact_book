<template>
  <button class="my_button_big">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name: 'my-button-big'
  }
</script>

<style scoped>
  .my_button_big {
		width: 180px;
		text-transform: uppercase;
		padding: 8px 16px;
		cursor: pointer;
		color: var(--white-color);
		border-radius: 2px;
		font-size: 16px;
		transition: all 0.3s;
		margin: 0 5px;
	}

	.my_button_big:hover {
		transition: all 0.3s;
	}
</style>