import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import 'reset-css'
import './assets/styles/variables.scss'
import './assets/styles/styles.scss'

console.log(document.cookie)
axios.defaults.baseURL = 'http://localhost:7000'
createApp(App).use(store).use(router).mount('#app')
