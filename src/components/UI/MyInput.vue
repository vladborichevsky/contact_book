<template>
  <input 
    :value="modelValue" 
    @input="updateModelValue($event.target.value)" 
    type="text" 
    class="my_input">
</template>

<script>
  export default {
    name: 'my-input',

    props: {
      modelValue: {
        type: String,
        required: true
      }
    },

    emits: [
      'update:modelValue'
    ],

    methods: {
      updateModelValue(value) {
        this.$emit('update:modelValue', value)
      }
    }
  }
</script>

<style scoped>
  .my_input {
    width: 20%;
		outline: none;
		border: none;
		border-bottom: 1px solid var(--black-color);
		font-size: 17px;
		padding: 3px 5px;
  }

  .my_input::placeholder {
		color: var(--grey-color);
	}

  .error_input {
		border-bottom: 1px solid var(--red-color);
	}

	.error_input::placeholder {
		color: var(--red-color);
		font-weight: 500;
	}
</style>