
<template>
	<!-- В пропсах получаем объект с информацией о контакте. Для отображения этого модального окна используем директиру v-show и метод Object.entries(), который преобразует объект в массив. Если этот массив пуст, то модальное окно не отображается. -->
	<my-modal-window
		v-if="Object.entries(showEditWindowObj).length > 0" 
		@click.self="closeModalWindow" 
		@closeModalWindow="closeModalWindow" 
		:showEditWindowObj="showEditWindowObj">

			<div class="edit_header">{{ showEditWindowObj.name }}</div>

			<div class="edit_inputs_wrapper">

				<modal-edit-contact-elem
					:notation="notations.name"
					v-model.trim="editName"
					ref="firstInput"
					v-focus 
					tabindex="1"/>

				<modal-edit-contact-elem
					:notation="notations.phoneNumber"
					:phoneNumberMask="phoneNumberMask"
					v-model="editPhoneNumber"
					@accept="onAccept"
					@complete="onComplete"
					tabindex="2"/>

				<modal-edit-contact-elem
					:notation="notations.city"
					v-model.trim="editCity"
					tabindex="3"/>

			</div>

			<div class="edit_btns_wrapper">

				<my-button 
					tabindex="4"
					@click="saveChanges"
					class="save_btn">
						save
				</my-button>

				<my-button 
					tabindex="5"
					@click="closeModalWindow" 
					@keydown.tab.prevent="changeFocus" 
					class="cancel_btn">
						cancel
				</my-button>

			</div>

	</my-modal-window>

</template>
  
  
  
<script>
	import ModalEditContactElem from "./ModalEditContactElem.vue"

	export default {
		components: {
			ModalEditContactElem
		},

		setup() {
			const notations = {
				name: "Name",
				city: "City",
				phoneNumber: "Phone number"
			}

			return { notations }
		},

		props: {
			showEditWindowObj: {
				type: Object,
				required: true
				}
			},

		emits:{
				'saveChanges': function (editName, editCity) {
					if (!isFinite(+editName) || !isFinite(+editCity)) { // проверяем, чтобы в инпуты с именем и городом не были введены цифры
						return true
					} else {
						console.log('Эмит "saveChanges" сработал неверно!')
						return false
					}
				},
				'closeModalWindow': null
			},

		data() {
			return{
				editName: '',
				editPhoneNumber: '',
				editPhoneNumberValidated: '',
				editCity: '',
				phoneNumberMask: { // этот объект необходлим для маски ввода номера телефона. Здесь же как раз можно менять маску.
					mask: '+(7)(000)000-00-00',
					lazy: true
					}
				}
			},

			methods: {
				saveChanges() {
					this.$emit('saveChanges', this.editName[0].toUpperCase() + this.editName.slice(1), this.editPhoneNumber, this.editCity[0].toUpperCase() + this.editCity.slice(1), this.showEditWindowObj.index)
					this.closeModalWindow()
				},

				// Этот метод необходлим для маски ввода номера телефона
				onAccept(e) {
					const maskRef = e.detail
					this.editPhoneNumber = maskRef.value // это переменная, которая будет отображаться в инпуте для пользователя (она не передаётся как номер телефона на сервер)
				},

					// Этот метод необходлим для маски ввода номера телефона
				onComplete(e) {
					const maskRef = e.detail
					this.editPhoneNumberValidated = maskRef.unmaskedValue // переменная, в которую записывается номер телефона в обычном виде, без маски (она передаётся как номер телефона на сервер)
				},

				changeFocus() {
					this.$refs.firstInput.$el.focus()
				},
				
				closeModalWindow() {
					this.$emit('closeModalWindow')
				}
			},

			// через вотчер следим за изменениями в объекте showEditWindowObj из пропсов. Это нужно, чтобы в инпутах сразу отображались уже имеющиеся значения
			watch: {
				showEditWindowObj: { 
					handler() {
						this.editName = this.showEditWindowObj.name
						this.editCity = this.showEditWindowObj.city
						this.editPhoneNumber = this.showEditWindowObj.phoneNumber
					},
					deep: true
				}
			}
	}
</script>
  
  
  
<style scoped>
	.edit_header {
		font-size: 35px;
		font-weight: 600;
		color: var(--black-color);
	}

	.edit_inputs_wrapper {
		margin-top: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.edit_btns_wrapper {
		margin: 0 auto;
		margin-top: 20px;
		width: 220px;
		display: flex;
		justify-content: space-around;
	}

	.save_btn {
		border: 2px solid var(--blue-color);
		background-color: var(--blue-color);
	}

	.save_btn:hover {
		transition: all 0.3s;
		border: 2px solid var(--blue-color);
		background-color: var(--white-color);
		color: var(--blue-color);
	}

	.cancel_btn {
		border: 2px solid var(--red-color);
		background-color: var(--red-color);
	}

	.cancel_btn:hover {
		border: 2px solid var(--red-color);
		background-color: var(--white-color);
		color: var(--red-color);
}
</style>