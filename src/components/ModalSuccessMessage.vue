
<template>
	<!-- При срабатывании различных событий в объекте showSuccessMessageObj (приходит из пропсов) появляются два поля: text и color. В поле text приходит нужный текст, который мы подставляем в наше модальное окно, а в поле color приходит название необходимого цвета. Далее в зависимости от того, какой цвет пришёл в поле color обеъекта showSuccessMessageObj добавляется соответствующий класс, который окрашивает цвет окна на зелёный (добавление нового контакта), красный (удаление контакта) или серый (редактирование контакта).  -->

	<!-- Наше модальное окно с сообщением о свершившемся событии (добавление/изменение/удаление контакта) отрисовывается через v-show. Ориентир - объект из пропсов showSuccessMessageObj. -->
	<my-modal-window 
		v-if="Object.entries(showSuccessMessageObj).length > 0"
		@click.self="closeModalWindow"
		@closeModalWindow="closeModalWindow"
		:showSuccessMessageObj="showSuccessMessageObj">
			<div class="success_text">{{ showSuccessMessageObj.text }}</div>
	</my-modal-window>
</template>
  
  
<script>
	export default {		
		props: {
			showSuccessMessageObj: {
				type: Object,
				required: true
			}
		},

		emits:{
			'closeModalWindow': null,
    },
		
		methods: {
			closeModalWindow() {
				this.$emit('closeModalWindow')
			},
		}
	}
</script>
  
  
<style scoped>
	.success_text {
		font-size: 20px;
		font-weight: 500;
		color: var(--white-color);
	}
</style>