<template>
	<div class="inputs_wrapper">

		<my-input 
			v-model.trim="inputName"
			:class="{ error_input: errorInput == 'name'}"
			title="Enter contact's name"
			placeholder="Name">
		</my-input>

		<!-- v-imask="phoneNumberMask" @accept="onAccept" @complete="onComplete" - это всё необходимые атрибуты для маски ввода номера телефона -->
		<my-input 
			v-model="inputPhoneNumber"
			:class="{ error_input: errorInput == 'phone'}"
			v-imask="phoneNumberMask" @accept="onAccept"
			@complete="onComplete"
			title="Enter contact's phone number"
			placeholder="+(7)(123)456-78-90">
		</my-input>

		<my-input 
			v-model.trim="inputCity"
			@keydown.enter="addContactEmit"
			:class="{ error_input: errorInput == 'city'}"
			title="Enter contact's city"
			placeholder="City">
		</my-input>

		<my-button-big 
			@click="addContactEmit" 
			class="add_contact_btn">
				add contact
		</my-button-big>

	</div>

	<div 
		class="error_message" 
		:class="{ error_message_night: nightMode }">
			{{ errorMessage }}
	</div>
</template>

  

  
<script>
  import { mapState } from 'vuex'

	export default {
		emits:{
			'addContactEmit': function (inputName, inputPhoneNumber, inputCity) {
				if (!isFinite(+inputName) && !isFinite(+inputCity)) { // проверяем, чтобы в инпуты с именем и городом не были введены цифры
					return true
				} else {
					console.log('Эмит "addContactEmit" сработал неверно!')
					return false
				}
			}
		},

		props: {
			// в этой переменной добавляется текст ошибки, если пользователь ввёл имя контакт или телефон, которые уже имеются в списке. Далее при помощи watch мы отслеживаем эту переменную, и в случае ошибки значение этой переменной на 3 секунды присваивается переменной errorMessage
			sameUserError: {
				type: String,
				required: true
			}
		},

    data() {
			return{
				inputName: '',
				inputPhoneNumber: '', // это переменная, которая будет отображаться в инпуте для пользователя (она не передаётся как номер телефона на сервер)
				inputPhoneNumberValidated: '', // переменная, в которую записывается номер телефона в обычном виде, без маски (она передаётся как номер телефона на сервер)
				inputCity: '',
				errorMessage: '',
				errorInput: '', // переменная, которая нужна для подсветки красным цветом инпута, который ещё не заполнен
				phoneNumberMask: { // этот объект необходлим для маски ввода номера телефона. Здесь же как раз можно менять маску.
					mask: '+(7)(000)000-00-00',
					lazy: true
				}
			}
		},

    computed: {
      ...mapState({
        nightMode: state => state.nightMode
      })
    },

		watch: {
			// в этой переменной добавляется текст ошибки, если пользователь ввёл имя контакт или телефон, которые уже имеются в списке. Отслеживаем эту переменную, и в случае ошибки значение этой переменной на 3 секунды присваивается переменной errorMessage. Она приходит из пропсов.
			sameUserError() {
				if(this.sameUserError.length > 0) this.errorMessage = this.sameUserError
				setTimeout( ()=> {
					this.errorMessage = ''
				}, 3000)
			}
		},
		
		methods: {
			// Эмит добавления нового контакта, сразу с проверками
			addContactEmit() {
				if(this.inputName.length < 2) {
					this.errorMessage = 'Enter name'
					this.errorInput = 'name'
					setTimeout( ()=> {
						this.errorMessage = ''
						this.errorInput = ''
					}, 3000)
					return false
				}

				if(this.inputPhoneNumber.length < 10) {
					this.errorMessage = 'Enter phone number'
					this.errorInput = 'phone'
					setTimeout( ()=> {
						this.errorMessage = ''
						this.errorInput = ''
					}, 3000)
					return false
				}

				if(this.inputCity.length < 2) {
					this.errorMessage = 'Enter city name'
					this.errorInput = 'city'
					setTimeout( ()=> {
						this.errorMessage = ''
						this.errorInput = ''
					}, 3000)
					return false
				}

				this.errorMessage = ''
				// добавлена автокоррекция, что если пользователь ввёл имя и город с маленькой буквы, то они всё равно запишутся с заглавной
				this.$emit('addContactEmit', this.inputName[0].toUpperCase() + this.inputName.slice(1), this.inputPhoneNumber , this.inputCity[0].toUpperCase() + this.inputCity.slice(1))
				// очищаем инпуты
				this.inputName = ''
				this.inputPhoneNumber = ''
				this.inputCity = ''
			},
			
			// Этот метод необходлим для маски ввода номера телефона
			onAccept(e) {
				const maskRef = e.detail
				this.inputPhoneNumber = maskRef.value
			},
			// Этот метод необходлим для маски ввода номера телефона
			onComplete(e) {
				const maskRef = e.detail
				this.inputPhoneNumberValidated = maskRef.unmaskedValue
			}
		}
	}
</script>
  
  
  
<style scoped>
	.inputs_wrapper {
		margin: 0 auto;
		margin-top: 40px;
		width: 80%;
		display: flex;
		justify-content: space-around;
	}

	.add_contact_btn {
		border: 2px solid var(--blue-color);
		background-color: var(--blue-color);
		color: var(--white-color);
	}

	.add_contact_btn:hover {
		border: 2px solid var(--blue-color);
		background-color: var(--white-color);
		color: var(--blue-color);
	}

	.error_message {
		margin-top: 15px;
		height: 20px;
		color: var(--red-color);
	}

	.error_message_night {
		color: var(--white-color);
	}
</style>