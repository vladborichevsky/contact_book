<template>
  <!-- тег transition-group нужен для анимации элементов списка -->
  <transition-group name="contact-list">
    
    <li 
      v-for="item in filtredContactsArr.slice(startItem, endItem)" 
      :key="item.id" 
      class="list_item" 
      :class="{ list_item_night: nightMode }">
        {{ item.name }}
      
      <div>
        <my-button
          @click="showInfoModal(item)"
          class="info_btn">
            info
        </my-button>

        <my-button
          @click="showEditModal(item)"
          class="edit_btn">
            edit
        </my-button>

        <my-button
        @click="showDeleteModal(item.id, item.name)"
          class="delete_btn">
            delete
        </my-button>
      </div>
    </li>
    
  </transition-group>
</template>

<script>
  import { mapState } from 'vuex' 

  export default {
    props: {
      filtredContactsArr: {
        type: Array,
        required: true
      },

      startItem: {
        type: Number,
        required: true
      },

      endItem: {
        type: Number,
        required: true
      }
    },

    emits: [
      'showInfoModal', 'showEditModal', 'showDeleteModal'
		],

    computed: {
      ...mapState({
        nightMode: state => state.nightMode
      })
    },

    methods: {
      showInfoModal(item) {
				this.$emit('showInfoModal', item)
			},

      showEditModal(item) {
				this.$emit('showEditModal', item)
			},

      showDeleteModal(id, name) {
        this.$emit('showDeleteModal', id, name)
      }
    }
  }
</script>

<style scoped>
	.list_item {
    margin: 15px auto;
    width: 850px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border: 1px solid var(--black-color);
		padding: 10px 15px 10px 20px;
	}

  .list_item_night {
		border: 1px solid var(--white-color);
	}

  .info_btn {
		border: 2px solid var(--green-color);
		background-color: var(--green-color);
	}

	.info_btn:hover {
		border: 2px solid var(--green-color);
		background-color: var(--white-color);
		color: var(--green-color);
	}
  
  .edit_btn {
		border: 2px solid var(--grey-color);
		background-color: var(--grey-color);
	}

	.edit_btn:hover {
		border: 2px solid var(--grey-color);
		background-color: var(--white-color);
		color: var(--grey-color);
	}

  .delete_btn {
		border: 2px solid var(--red-color);
		background-color: var(--red-color);
	}

	.delete_btn:hover {
		border: 2px solid var(--red-color);
		background-color: var(--white-color);
		color: var(--red-color);
	}


  /* Все анимации, которые расположены ниже, нужны для анимации */
  .contact-list-item {
		display: inline-block;
		margin-right: 10px;
	}

	.contact-list-enter-active,
	.contact-list-leave-active {
		transition: all 0.5s ease;
	}

  .contact-list-move {
    transition: all 0.6s ease;
  }
</style>