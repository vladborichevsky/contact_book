<template>
  <div>
    
    <!-- сообщение будет показываться в случае, если в скиске нет контакта с таким именем, которое ввёл пользователь в фильтре -->
    <div 
      v-show="this.filtredContactsArr.length == 0 && contactListArr.length > 0"
      class="empty_list_message">
        {{ noMatchingMes }}
    </div>

    <!-- сообщение, что в список контактов ещё не добавлен ни один контакт -->
    <div 
      v-show="contactListArr.length == 0" 
      class="empty_list_message">
        {{ noContactsMes }}
	  </div>

  </div>
</template>

<script>
  export default {
    setup() {
        const noMatchingMes = "There are no contacts matching the request...";
        const noContactsMes = "There are no contacts in the list yet";
        
      return { noMatchingMes, noContactsMes }
    },

    props: {
      filtredContactsArr: {
        type: Array,
        required: true
      },

      contactListArr: {
				type: Array,
				required: true
			}
    }
  }
</script>

<style scoped>
	.empty_list_message {
		margin-top: 50px;
		font-size: 17px;
		font-weight: 400;
	}
</style>