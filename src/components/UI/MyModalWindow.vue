
<!-- Здесь мы создаём дефолтное модальное окно. Все составляющие модальных окон поступают сюда через слоты. Поскольку у каждого модального окна есть свои определённые css-стили, то мы получаем объект от каждого модального окна и в соответствии с этим присваиваем модальному окну определённые css-классы -->

<template>
  <div class="modal_screen" @click.self="closeModalWindow">
    
    <div 
      class="modal_window"
      :class="{ edit_contact_message_styles: showEditWindowObj,
                info_contact_message_styles: showInfoWindowObj, 
                delete_contact_message_styles: contactToDeleteObj, 
                success_message_styles: showSuccessMessageObj, 
                bg_green: showSuccessMessageObj?.color == 'green', 
                bg_red: showSuccessMessageObj?.color == 'red', 
                bg_brown: showSuccessMessageObj?.color == 'brown' }">

        <slot></slot>

        <div 
          @click="closeModalWindow" 
          class="window_close">
            &#10006;
        </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'my-modal-window',

    props: {
      showSuccessMessageObj: {
        type: Object,
        required: false
      },

      contactToDeleteObj: {
        type: Object,
        required: false
      },

      showInfoWindowObj: {
        type: Object,
        required: false        
      },
      
      showEditWindowObj: {
        type: Object,
        required: false      
      }
    },

    emits:{
      'closeModalWindow': null,
    },
    
    methods: {
      closeModalWindow() {
        this.$emit('closeModalWindow')
      }
    }
  }
</script>

<style scoped>
  .modal_screen {
    position: fixed;
		top: 0;
		left: 0;
		overflow: hidden;
		width: 100%;
		height: 100%;
		z-index: 5;
		background-color: var(--modal-screen-bckg);
		display: flex;
		justify-content: center;
		align-items: center;
  }

  .modal_window {
    position: relative;
		width: 400px;
		height: 300px;
		background-color: var(--white-color);
    color: var(--black-color);
		border-radius: 2px;
		padding: 25px;
  }

  .window_close {
		position: absolute;
		top: -5px;
		right: -30px;
		font-size: 30px;
		cursor: pointer;
    color: var(--white-color);
	}

	.window_close:hover {
		color: var(--red-color);
	}

  .success_message_styles {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
  }

  .delete_contact_message_styles {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 130px;
  }

  .info_contact_message_styles {
    height: 200px;
  }

  .edit_contact_message_styles {
		height: 300px;
  }

  .bg_red {
		background-color: var(--red-color);
	}

	.bg_green {
		background-color: var(--green-color);
	}

	.bg_brown {
		background-color: var(--grey-color);
	}
</style>