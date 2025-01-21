import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'

import { createWebHistory, createRouter } from 'vue-router'

import HomeView from './views/HomeView.vue'
import ProductDetailView from './views/ProductDetailView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/productdetail/:id', component: ProductDetailView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const pinia = createPinia()

createApp(App)
.use(router)
.use(pinia)
.mount('#app')
