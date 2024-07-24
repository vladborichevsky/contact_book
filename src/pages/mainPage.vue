<template>
  <!-- обёртка вообще всей страницы. Создана для того, чтобы можно было переключать приложение в ночной режим -->
  <div class="page_wrapper" :class="{ night_mode_class: nightMode }">
    <div class="container">

      <div class="about"  
        @click="$router.push('/about/')"
        :class="{ text_color_white: nightMode, text_color_black: nightMode }">
          About
      </div>

      <h1>Contacts</h1>

      <add-new-contact-block
        :sameUserError="sameUserError"
        @addContactEmit="addContactFunc"/>

      <contacts-block
        :contactListArr="contactListArr"
        @showDeleteModal="showDeleteModalFunc"
        @showInfoModal="showInfoModalFunc"
        @showEditModal="showEditFunc"/>

      <modal-info-contact
        :showInfoWindowObj="showInfoWindowObj"
        @closeModalWindow="closeWindowFunc"/>

      <modal-edit-contact 
        :showEditWindowObj="showEditWindowObj"
        @closeModalWindow="closeWindowFunc"
        @saveChanges="saveChangesFunc"/>

      <modal-delete-contact
        :contactToDeleteObj="contactToDeleteObj"
        @deleteContact="deleteContactFunc"
        @closeModalWindow="closeWindowFunc"/>

      <modal-success-message
        :showSuccessMessageObj="showSuccessMessageObj"
        @closeModalWindow="closeWindowFunc"/>
    </div>
  </div>
</template>



<script>
  import { mapState, mapMutations } from 'vuex' 

  import AddNewContactBlock from '@/components/AddNewContactBlock.vue'
  import ContactsBlock from '@/components/ContactsBlock.vue'
  import ModalInfoContact from '@/components/ModalInfoContact.vue'
  import ModalEditContact from '@/components/ModalEditContact.vue'
  import ModalDeleteContact from '@/components/ModalDeleteContact.vue'
  import ModalSuccessMessage from '@/components/ModalSuccessMessage.vue'


  export default {
    components: { 
      AddNewContactBlock, ContactsBlock, ModalInfoContact, ModalEditContact, ModalDeleteContact, ModalSuccessMessage
    },

    setup() {
      const messagesKit = { // объект с текстами для сообщений
          sameNameError: 'A contact with the same name already exists',
          samePhoneNumberError: 'A contact with the same phone number already exists',
          changesSaved: 'Changes saved!'
        }

      return { messagesKit }
    },

    data() {
      return {
        contactListArr: [],
        sameUserError: '', 
        contactToDeleteObj: {}, // объект, который мы передаём в компонент ModalDeleteContact, и в котором содержатся айдишник и имя контакта, которого пользователь собирается удалить
        showInfoWindowObj: {}, // объект, который мы передаём в компонент WindowInfo, и в котором содержится информация выбранного контакта
        showEditWindowObj: {}, // объект, который мы передаём в компонент WindowEdit, и в котором содержится информация выбранного контакта
        showSuccessMessageObj: {}, // объект, который мы передаём в компонент WindowSuccessMessage, и в котором содержится информация с текстом и цветом заднего фона сообщения. Срабатывает при: добавлении контакта, сохранении изменений контакта, удалении контакта.
      }
    },

    computed: {
      ...mapState({
        nightMode: state => state.nightMode
      }),
    },

    methods: {
      ...mapMutations({
        setNightMode: 'setNightMode'
      }),

      // главная функция, которая добавляет новый объект (контакт) в массив
      addContactFunc(inputName, inputPhoneNumber, inputCity) {
        // проверка, чтобы нельзя было добавлять контакты с одинаковым именем
        if(this.contactListArr.find(item => item.name == inputName)) {
          // показываем пользователю сообщение об ошибке
          this.sameUserError = this.messagesKit.sameNameError // текст ошибки берём из объекта с текстами для сообщений
          setTimeout( ()=> {
            this.sameUserError = ''
          }, 3000)

            return false
        // проверка, чтобы нельзя было добавлять контакты с одинаковым номером телефона
        } else if(this.contactListArr.find(item => item.phoneNumber == inputPhoneNumber)) {
            // показываем пользователю сообщение об ошибке
            this.sameUserError = this.messagesKit.samePhoneNumberError // текст ошибки берём из объекта с текстами для сообщений
            setTimeout( ()=> {
              this.sameUserError = ''
            }, 3000)

            return false
          } else {
            // используем функцию Date.now(), чтобы задать уникальный id каждому контакту
            this.contactListArr.push({name: inputName, phoneNumber: inputPhoneNumber, city: inputCity, id: Date.now()})
            // присваиваем нужные значения в объект showSuccessMessageObj и у нас появляется окошко с информацией о добавлении контакта, а через сетТаймаут убираем это окошко через 3 секунды
            this.showSuccessMessageObj.text = `Contact ${inputName} added!` // сюда передаётся текст сообщения в окошке
            this.showSuccessMessageObj.color = 'green' // сюда передаётся название нужного цвета окошка
            setTimeout( ()=> {
              this.showSuccessMessageObj = {}
            }, 3000)
          }
      },

      // функция удаления контакта
      deleteContactFunc(id) {
        this.contactListArr = this.contactListArr.filter(item => item.id != id)
        // если в функции addContactFunc мы просто присваивали нужные значения в объект showSuccessMessageObj и у нас появлялось окошко с информацией о добавлении контакта, то в случае с функцией deleteContactFunc всё немного сложнее. Дело в том, что функция deleteContactFunc рабатывает при пользовательском событии deleteContact, получаемом из компонента WindowConfirmDelComp, а это уже модальное окно. Т.е при нажатии кнопки "Yes" в компоненте WindowConfirmDelComp срабатывает функция closeWindowFunc, которая закрывает все модальные окна приложения. Получается, что нужное нам модальное окно при выполнении функции saveChangesFunc не сработает. Поэтому мы немного схитрили - добавили сетТаймаут, который сработает через 10 миллисекунд. Т.е. сначала функция closeWindowFunc закроет все модальные окна, а через 10 миллисекунд мы заново окроем новое модальное окно.
        setTimeout( ()=> {
          this.showSuccessMessageObj.text = `Contact ${name} deleted!` // сюда передаётся текст сообщения в окошке
        this.showSuccessMessageObj.color = 'red' // сюда передаётся название нужного цвета окошка
        }, 100)
        setTimeout( ()=> {
          this.showSuccessMessageObj = {}
        }, 3000)
      },

      // функция, которая срабатывает при пользовательском событии saveChanges, получаемом из компонента WindowEdit. Она принимает в себя обновлённые данные контакта, а также индекс контакт в главном массиве объектов с контактами contactListArr. Через индекс происходит обращение к нужному объекту (контакту), в котором перезаписываются данные.
      saveChangesFunc(name, phoneNumber, city, index) {
        this.contactListArr[index].name = name
        this.contactListArr[index].phoneNumber = phoneNumber
        this.contactListArr[index].city = city

        // если в функции addContactFunc мы просто присваивали нужные значения в объект showSuccessMessageObj и у нас появлялось окошко с информацией о добавлении контакта, то в случае с функцией saveChangesFunc всё немного сложнее. Дело в том, что функция saveChangesFunc рабатывает при пользовательском событии saveChanges, получаемом из компонента WindowEdit, а это уже модальное окно. Т.е при нажатии кнопки "Save" в компоненте WindowEdit срабатывает функция closeWindowFunc, которая закрывает все модальные окна приложения. Получается, что нужное нам модальное окно при выполнении функции saveChangesFunc не сработает. Поэтому мы немного схитрили - добавили сетТаймаут, который сработает через 10 миллисекунд. Т.е. сначала функция closeWindowFunc закроет все модальные окна, а через 10 миллисекунд мы заново окроем новое модальное окно.
        setTimeout( ()=> {
          this.showSuccessMessageObj.text = this.messagesKit.changesSaved // текст берём из объекта с текстами для сообщений
          this.showSuccessMessageObj.color = 'brown' // сюда передаётся название нужного цвета окошка
        }, 100)
        // через сетТаймаут убираем наше модульное окно через 3 секунды
        setTimeout( ()=> {
          this.showSuccessMessageObj = {}
        }, 3000)
      },

      // функция, которая присваивает значение имени контакта в строку, которая передаётся в компонент WindowConfirmDelComp - это модальное окно с вопросом подтверждения удаления контакта
      showDeleteModalFunc(id, name) {
        this.contactToDeleteObj = { 'id': id, 'name': name}
      },

      // функция, которая добавляет данные выбранного контакта в специальный объект, который передаётся в компонент WindowInfo - это модальное окно с информацией о выбранном контакте
      showInfoModalFunc(item) {
        this.showInfoWindowObj = JSON.parse( JSON.stringify(item) );
      },

      // функция, которая добавляет данные выбранного контакта в специальный объект, который передаётся в компонент WindowEdit - это модальное окно с информацией о выбранном контакте, в котором можно внести изменения в данные контакта.
      showEditFunc(item) {
        this.showEditWindowObj = JSON.parse( JSON.stringify(item) );
        // В наш передаваемый объект добавляем ещё одно значение - index. Это порядковый номер изменяемого объекта в главном массиве контактов. Определяем его (порядковый номер) при помощи findIndex()
        this.showEditWindowObj.index = this.contactListArr.findIndex(el => el.name == item.name) 
      },

      // функция, которая закрывает все модальные окна в приложении
      closeWindowFunc() {
        this.showInfoWindowObj = {}
        this.showEditWindowObj = {}
        this.showSuccessMessageObj = {}
        this.contactToDeleteObj = {}
      },

      // функция, которую мы передаём в mounted и через addEventListener отслеживаем нажатие кнопки Esc
      closeWindowFuncForEventListener(e) {
        if(e.key === 'Escape') {
          this.closeWindowFunc()
        }
      }
    },

    watch: {
      contactListArr: { // Все изменения (добавление/удаление/изменение контакта) в нашем главном массиве объектов с контактами сразу же записываем в localStorage
        handler() {
          let contactListArrJSON = JSON.stringify(this.contactListArr)
          localStorage.setItem('localStorageList', contactListArrJSON)
        },
        deep: true
      },

      // добавляем в localStorage изменения переменной переключения в ночной режим
      nightMode() {
        localStorage.setItem('nightMode', this.nightMode)
      }
    },

    mounted() {      
      // как только страница загрузилась, мы проверяем в localStorage переменную localStorageList. Если в ней есть массив, то записываем его (этот самый массив) в наш главный массив объектов с контактами contactListArr
      if (JSON.parse(localStorage.getItem('localStorageList'))) {
        this.contactListArr = JSON.parse(localStorage.getItem('localStorageList')) 
      }

      // проверяем в localStorage ночной режим
      if (localStorage.getItem('nightMode') == 'true') {
        this.setNightMode(true)
      } else if (localStorage.getItem('nightMode') == 'false') {
        this.setNightMode(false)
      }

      // при нажатии Esc все модальные окна на странице будут закрываться
      window.addEventListener('keydown', this.closeWindowFuncForEventListener)
    },

    beforeUnmount() {
      // поскольку в mounted мы добавили обработчик события - нажатие клавики Esc, то в beforeUnmount мы должны удалить этот обработчик
      window.removeEventListener('keydown', this.closeWindowFuncForEventListener)
    }
  }
</script>



<style scoped>
  .page_wrapper {
    width: 100%;
    min-height: 100vh;
    box-sizing: border-box;
    margin: 0 auto;
    padding: 0;
  }

  .container {
    margin: 0 auto;
    width: 1100px;
    padding: 40px 0;
  }

  .night_mode_class {
    background-color: var(--night-mode-color);
    color: var(--white-color);
  }

  h1 {
    font-size: 45px;
    font-weight: 400;
  }

  .about {
    width: 100px;
		text-transform: uppercase;
		padding: 8px 16px;
		cursor: pointer;
		border-radius: 2px;
		font-size: 16px;
		transition: all 0.3s;
		margin: 0 5px;
    background-color: transparent;
    border-color: transparent;
    padding: 8px 0px;
  }
  
  .about:hover {
    color: var(--blue-color);
  }

  .text_color_black {
    color: var(--black-color);
  }

	.text_color_white {
    color: var(--white-color);
  }
</style>

