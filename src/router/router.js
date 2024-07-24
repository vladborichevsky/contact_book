
import { createRouter, createWebHashHistory } from "vue-router"

import mainPage from '@/pages/mainPage.vue' // главная страница, которая будет отображаться на стартовой странице
import aboutPage from "@/pages/aboutPage.vue"

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: mainPage, alias: '/main' }, // главная страница, которая будет отображаться на стартовой странице
    { path: '/about/', component: aboutPage }, 
  ]
})

