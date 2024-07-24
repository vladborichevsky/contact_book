
<template>
	<!-- В пропсах получаем объект с информацией о контакте. Для отображения этого модального окна используем директиру v-show и метод Object.entries(), который преобразует объект в массив. Если этот массив пуст, то модальное окно не отображается. -->
	<my-modal-window
		v-if="Object.entries(showInfoWindowObj).length > 0" 
		@closeModalWindow="closeModalWindow" 
		:showInfoWindowObj=showInfoWindowObj>
			<div class="modal_info_wrapper">
				<div class="info_header">{{ showInfoWindowObj.name }}</div>
				<div class="info_item"><span>Phone number:</span>{{ showInfoWindowObj.phoneNumber }}</div>
				<div class="info_item"><span>City:</span> {{ showInfoWindowObj.city }}</div>
			</div>
	</my-modal-window>
</template>
  
  
  
<script>
	export default {
		props: {
			showInfoWindowObj: {
				type: Object,
				required: true
			}
		},

		emits:{
			'closeModalWindow': null,
    },

		methods:{
      btnTabOff(e) { // функция, которая проверяет, что у нас открыто это модальное окно и в случае нажатия клавиши Tab убирает стандартное поведение
        if (e.code === 'Tab' && Object.entries(this.showInfoWindowObj).length > 0) {
          e.preventDefault()
        }
      },

			closeModalWindow() {
				this.$emit('closeModalWindow')
			}
    },

		mounted() { // отслеживаем за нажатием клавиши Tab
      window.addEventListener('keydown', this.btnTabOff)
    },
		
    beforeUnmount() { // удаляем прослушиватель события за нажатием клавиши Tab
      window.removeEventListener('keydown', this.btnTabOff)
    }
	}
</script>
  
  
  
<style scoped>
	.modal_info_wrapper {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		height: 80%;
	}

	.info_header {
		font-size: 35px;
		font-weight: 600;
		color: var(--black-color);
	}

	.info_item {
		text-align: left;
		margin: 0 15px ;
		font-size: 20px;
		font-weight: 600;
		color: var(--black-color);
	}

	.info_item span {
		font-weight: 300;
	}
</style>