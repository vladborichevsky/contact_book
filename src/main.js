import './assets/styles/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import UIcomponents from '@/components/UI/componentsLib.js' // импортировали все UI-компоненты
import router from '@/router/router' // импортировали Vue Router
import directives from '@/directives/directivesLib.js' // пожключили файл с директивами
import store from '@/store/store.js' 

const app = createApp(App)

app.use(store) 

UIcomponents.forEach(compoment => { // подключили все UI-компоненты
  app.component(compoment.name, compoment) 
})

directives.forEach(directive => { // вызвали функцию directive для каждой директивы из файла directivesLib.js
  app.directive(directive.name, directive)
})


app.use(router) // подключили Vue Router
app.mount('#app')

