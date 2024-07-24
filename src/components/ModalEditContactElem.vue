<template>
  <div class="edit_input_wrapper">
    <p class="edit_input_notation"> {{ notation }}:</p>
    <my-input-for-modal
      :modelValue="modelValue"
      @updateModelValue="updateModelValue"
      v-imask="phoneNumberMask"
      @accept="onAccept"
      @complete="onComplete"/>
  </div>
</template>

<script>
  export default {
    props: {
      notation: {
        type: String,
        required: true
      },

      phoneNumberMask: {
        type: Object,
        required: false
      },

      modelValue: {
        type: [ String, Number ],
        required: true
      }
    },

    emits: [
      'update:modelValue', 'onAccept', 'onComplete'
    ],

    methods: {
      updateModelValue(value) {
        this.$emit('update:modelValue', value)
      },

      onAccept() {
        this.$emit('onAccept')
      },

      onComplete() {
        this.$emit('onComplete')
      }
    }
  }
</script>

<style scoped>
	.edit_input_wrapper {
		width: 50%;
		display: flex;
		flex-direction: column;
		margin: 5px 0 5px 0;
	}

	.edit_input_notation {
		color: var(--black-color);
		font-size: 14px;
    font-weight: 600;
	}
</style>