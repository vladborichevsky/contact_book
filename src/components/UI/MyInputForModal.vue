<template>

  <input 
    :value="modelValue" 
    @input="updateModelValue($event.target.value)" 
    type="text" 
    class="my_input_for_modal">
    
</template>

<script>
  export default {
    name: 'my-input-for-modal',

    props: {
      modelValue: {
        type: String,
        required: true
      }
    },

    emits: [
      'updateModelValue'
    ],

    methods: {
      updateModelValue(value) {
        this.$emit('updateModelValue', value)
      }
    }
  }
</script>

<style scoped>
	.my_input_for_modal {
		padding: 5px;
		font-size: 16px;
		outline: none;
		border: none;
		border-bottom: 1px solid var(--black-color);
    z-index: 5px;
	}
</style>