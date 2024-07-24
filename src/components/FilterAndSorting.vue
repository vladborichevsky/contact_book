<template>

	<!-- Инпут с поиском контакта по имени будет отображаться только в том случае, если в списке контактов есть более 5 контактов -->
	<div 
    v-if="contactListArr.length > 5" 
    class="filter_wrapper">
      <!-- меняем placeholder в зависимости от того, по городу или по имени идёт сортировка контактов -->
      <input
        v-if="sortBy == 'name'"
        :value="filter"
        @input="UpdateFilter($event.target.value)" 
        v-focus 
        type="text"
        :placeholder=placeholder.name>

      <input 
        v-else-if="sortBy == 'city'"
        :value="filter"
        @input="UpdateFilter($event.target.value)" 
        v-focus 
        type="text"
        :placeholder=placeholder.city>

      <!-- блок кода, где пользователь через select может выбрать, по какому полю будет происходить сотрировка контактов - по имени или названию города -->
      <div class="sort_by_wrapper">
        <p class="sort_by_descr">sort by:</p>
        <form class="sort_by_params" id="selectFilter">
          <select
            :value="sortBy"
            @input="UpdateSortBy($event.target.value)" 
            class="sort_by" 
            form="selectFilter">
              <option value="name">name</option>
              <option value="city">city</option>
          </select>
        </form>
      </div>
	</div>
</template>


<script>
  export default {
    setup() {
      const placeholder = {
        "name": "Enter a name to search",
        "city": "Enter a city to search"
      }

      return { placeholder }
    },

    props: {
      filter: { 
        type: String,
        required: true
      },

      sortBy: { 
        type: String,
        required: true
      },

      contactListArr: {
        type: Array,
        required: true
      },

      sortBy: {
        type: String,
        required: true
      }
    },

    emits: {
      'update:filter': null,
      'update:sortBy': null
    },
    
    methods: {
      UpdateFilter(value) {
        this.$emit('update:filter', value)
      },

      UpdateSortBy(value) {
        this.$emit('update:sortBy', value)
      }
    }
  }
</script>


<style scoped>
	.filter_wrapper {
		width: 80%;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
	}

  .sort_by_wrapper {
		display: flex;
	}

	.sort_by_descr {
		margin-right: 5px;
	}

	.sort_by {
		width: 80px;
	}

	input {
		width: 18%;
		outline: none;
		border: none;
		font-size: 14px;
		padding: 3px 5px;
    border: 1px solid var(--night-mode-color);
	}
</style>