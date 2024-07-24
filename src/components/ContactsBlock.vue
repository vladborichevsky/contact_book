
<template>

	<filter-and-sorting
		v-model:filter.trim="filter"
		v-model:sortBy="sortBy"
		:contactListArr="contactListArr"/>

	<contacts-messages
		:filtredContactsArr="filtredContactsArr"
		:contactListArr="contactListArr"/>
	
	<contacts-list 
		:filtredContactsArr="filtredContactsArr"
		:startItem="startItem"
		:endItem="endItem"
		@showInfoModal="showInfoModal"
		@showEditModal="showEditModal"
		@showDeleteModal="showDeleteModal"/>

	<contacts-pages
		:filtredContactsArr="filtredContactsArr"
		:activePage="activePage"
		:pages="pages"
		@activePageMinus="activePageMinus"
		@activePagePlus="activePagePlus"/>
	
</template>
  
  
  
<script>
	import FilterAndSorting from '@/components/FilterAndSorting.vue'
	import ContactsList from '@/components/ContactsList.vue'
	import ContactsMessages from '@/components/ContactsMessages.vue'
	import ContactsPages from '@/components/ContactsPages.vue'
	

	export default {
		components: { FilterAndSorting, ContactsList, ContactsMessages, ContactsPages },

		props: {
			contactListArr: { // основной массив с контактами
				type: Array,
				required: true
			}
		},

		emits:[
			'showDeleteModal', 'showInfoModal', 'showEditModal'
		],

		data() {
			return{
				filter: '', // переменная, отвечающая за фильтр поиска контакта по имени/городу
				sortBy: 'name', // переменная, которая определяет, по имени или по городам мы сортируем контакты
				filtredContactsArr: [], // "отфильтрованный" массив контактов в соответствии с введённым в инпут (переменная filter) именем контакта
				activePage: 1, // переменная, отвечающая за активную страницу. По умолчанию 1
			}
		},
		methods: {
			activePageMinus() {
				this.activePage = this.activePage - 1
			},

			activePagePlus() {
				this.activePage = this.activePage + 1
			},

			showInfoModal(item) {
				this.$emit('showInfoModal', item)
			},

			showEditModal(item) {
				this.$emit('showEditModal', item)
			},

			showDeleteModal(id, name) {
				this.$emit('showDeleteModal', id, name)
			},

			// функция, которую мы используем, если в переменной filter ничего не введено
			filterContactListArrWithEmptyFilterVar() {
				// в данной строчке мы используем глубокое копирование при помощи метода JSON, а также сотрируем список все объекты по алфавиту по полю 'name' или 'city'
				this.filtredContactsArr = JSON.parse( JSON.stringify(this.contactListArr) ).sort((a, b) => a[this.sortBy] > b[this.sortBy] ? 1 : -1)
			},

			// функция, которую мы используем, если в переменной filter что-то введено
			filterContactListArr() {
				this.filtredContactsArr = this.contactListArr.filter(item => item[this.sortBy].includes(this.filter[0].toUpperCase() + this.filter.slice(1))).sort((a, b) => a[this.sortBy] > b[this.sortBy] ? 1 : -1)
			}
		},

		computed: {
			startItem() {
				if(this.activePage == 1 || this.activePage < 1) {
					return 0
				} else {
					return ((this.activePage - 1) * 10)
				}
			},

			endItem() {
				if(this.activePage == 1 || this.activePage < 1) {
					return 10
				} else {
					return (this.activePage * 10) 
				}
			},

			// вычисляемое свойство, определяем общее количество страниц
			pages() {
				return Math.ceil(this.filtredContactsArr.length / 10)
			}
		},

		watch: {
			contactListArr: {
				handler() {
					if(this.filter.length == 0) {
							// функция, которую мы используем, если в переменной filter ничего не введено
							this.filterContactListArrWithEmptyFilterVar()
						} else {
							// функция, которую мы используем, если в переменной filter что-то введено
							this.filterContactListArr()
						}
						// проверка, что, если при удалении контакта у пользователя была открыта последняя страница в листе контактов и пользователь удалил как раз последний контакт (т.е. теперь эта самая последняя страница пуста), то активная страница автоматически переключалась на 1 страницу назад
						if(this.pages <  this.activePage) {
							this.activePage = this.activePage - 1
						}
					},
					deep: true
				},

			filter() {
				if(this.filter.length == 0) {
					// функция, которую мы используем, если в переменной filter ничего не введено
					this.filterContactListArrWithEmptyFilterVar()
					// отслеживаем изменения переменной activePage, чтоб добавить данные о текущем состоянии активной страницы и информации в фильтре (переменная filter) в объект window.history (в виде строки), используя метод pushState(). Если в фильтре ничего не указано, но не добавляем никакую информацию по переменной filter в url
					window.history.pushState(null, document.title, `${window.location.pathname}?sort_by=${this.sortBy}&page=${this.activePage}`)
				} else {
					// функция, которую мы используем, если в переменной filter что-то введено
					this.filterContactListArr()					

					// как только пользователь вводит что-то в инпут с фильтром, то активная страница переключается на 1
					this.activePage = 1

					// отслеживаем изменения переменной filter, чтоб добавить данные о текущем состоянии активной страницы и информации в фильтре в объект window.history (в виде строки), используя метод pushState()
					window.history.pushState(null, document.title, `${window.location.pathname}?sort_by=${this.sortBy}&filter=${this.filter}&page=${this.activePage}`)
				}
			},

			sortBy() {
				if(this.filter.length == 0) {
					// функция, которую мы используем, если в переменной filter ничего не введено
					this.filterContactListArrWithEmptyFilterVar()
				} else {
					// функция, которую мы используем, если в переменной filter что-то введено
					this.filterContactListArr()
				}

				// отслеживаем изменения переменной sortBy, чтоб добавить данные о текущей сортировке в объект window.history (в виде строки), используя метод pushState()
				window.history.pushState(null, document.title, `${window.location.pathname}?sort_by=${this.sortBy}&filter=${this.filter}&page=${this.activePage}`)
			},

			activePage() { // отслеживаем изменения переменной activePage, чтоб добавить данные о текущем состоянии активной страницы и информации в фильтре (переменная filter) в объект window.history (в виде строки), используя метод pushState()
				if(this.filter.length == 0) {
					// если в фильтре ничего не введено, то его значение не добалвяется в window.history
					window.history.pushState(null, document.title, `${window.location.pathname}?sort_by=${this.sortBy}&page=${this.activePage}`)
				} else {
					window.history.pushState(null, document.title, `${window.location.pathname}?sort_by=${this.sortBy}filter=${this.filter}&page=${this.activePage}`)
				}
			}
		},

		mounted() {
			// Используя window.location, мы создаём новый объект URL, после чего «достаём» из него searchParams и применяем метод Object.fromEntries. В итоге мы получаем объект вида: windowData = {filter: 'какое-то значение', page: 'какое-то значение'...}
			const windowData = Object.fromEntries(
				new URL(window.location).searchParams.entries()
			);

			// Далее просто проверяем, есть ли значения в filter и page в windowData, и если да, то присваиваем их нашим переменных filter и activePage. Как только эти пемеренные изменятся, наша страница отрендерится.
			if (windowData.page) {
				// если пользователь введёт в строку "page=0", то му всё равно откроется первая страница
				if(windowData.page == '0' && !windowData.filter) {
					this.activePage = 1
					window.history.pushState(null, document.title, `${window.location.pathname}?page=${this.activePage}`)
				} else {
				// поскольку значение page хранится в виде строки, чтобы получить число, добавляем унарный +
					this.activePage = +windowData.page
				}
			}

			if (windowData.filter) {
				this.filter = windowData.filter
			}

			if(windowData.sort_by) {
				this.sortBy = windowData.sort_by
			}
		
			// проверка, что, если пользователь ввёл URL с указание страницы больше, чем есть в списке контактов, то бедут открыта последняя страница в списке
			setTimeout( () => {
				if(this.activePage > this.pages) {
					this.activePage = this.pages
				}
			}, 100)
		}
	}
</script>
  

<style scoped>

</style>