<template>

	<!-- Пагинация внизу страницы будет отображаться только в том случае, если в нашем отфильтрованном списке есть более 10 контактов -->
	<div 
    v-show="filtredContactsArr.length > 10" 
    class="pages_list">

		  <my-button 
        v-show="activePage - 1" 
        @click="activePageMinus" 
        class="change_active_page">
          {{ activePage - 1 }}
      </my-button>

		  <my-button 
        class="active_page">
          {{ activePage }}
      </my-button>

		  <my-button 
        v-show="activePage < pages" 
        @click="activePagePlus" 
        class="change_active_page">
          {{ activePage + 1 }}
      </my-button>
      
	</div>

</template>

<script>
  export default {
    props: {
      filtredContactsArr: {
        type: Array,
        required: true
      },

      activePage: {
        type: Number,
        required: true
      },

      pages: {
        type: Number,
        required: true 
      }
    },

    emits: {
      activePageMinus: null,
      activePagePlus: null
    },

    methods: {
      activePageMinus() {
        this.$emit('activePageMinus')
      },

      activePagePlus() {
        this.$emit('activePagePlus')
      }
    }
  }
</script>

<style scoped>
	.pages_list {
		display: flex;
		justify-content: center;
		margin: 0px 0 30px 0;
	}

	.active_page {
		border: 2px solid var(--blue-color);
		background-color: var(--blue-color);
		color: var(--white-color);
	}

	.change_active_page {
		background-color: var(--white-color);
		border: 2px solid var(--blue-color);
		color: var(--blue-color);
	}
</style>