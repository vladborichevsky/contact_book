
<template>

  <my-modal-window  
    v-if="Object.entries(contactToDeleteObj).length > 0"
    @closeModalWindow=closeModalWindow 
    :contactToDeleteObj="contactToDeleteObj">

      <div class="delete_contact_header">
        Are you sure you want to delete the contact: <span>{{ contactToDeleteObj.name }}</span>
      </div>

      <div>
        <my-button 
          v-focus
          ref="firstBtn"
          tabindex="1" 
          @click="closeModalWindow" 
          class="delete_contact_no_btn">
            No
        </my-button>

        <my-button
          tabindex="2" 
          @click="deleteContact(contactToDeleteObj.id)"
          @keydown.tab.prevent="changeFocus"
          class="delete_contact_yes_btn">
            Yes
        </my-button>
      </div>
  </my-modal-window>

</template>
  
  
  
<script>
	export default {
		props: {
      contactToDeleteObj: {
        type: Object,
        required: true
      }
		},

		emits: {
      'deleteContact': null,
      'closeModalWindow': null,
    },

		methods: {
			deleteContact(id) {
				this.$emit('deleteContact', id)
        this.closeModalWindow()
			},

      changeFocus() {
        this.$refs.firstBtn.$el.focus()
      },
      
      closeModalWindow() {
        this.$emit('closeModalWindow')
      }
		}
  }
</script>
  
  
  
<style scoped>  
  .delete_contact_header {
		font-size: 20px;
		font-weight: 600;
		color: var(--black-color);
	}

  .delete_contact_header span{
		font-weight: 800;
		color: var(--red-color);
	}

  .delete_contact_no_btn {
    background-color: var(--green-color);
    border: 2px solid var(--green-color);
    color: var(--white-color);
  }

  .delete_contact_no_btn:hover {
    background-color: var(--white-color);
    border: 2px solid var(--green-color);
    color: var(--green-color);
  }

  .delete_contact_yes_btn {
    background-color: var(--red-color);
    border: 2px solid var(--red-color);
    color: var(--white-color);
  }

  .delete_contact_yes_btn:hover {
    background-color: var(--white-color);
    border: 2px solid var(--red-color);
    color: var(--red-color);
  }
</style>