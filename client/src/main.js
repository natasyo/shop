import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import auth from './store/auth'
import axios from 'axios'
import 'reset-css'
import './assets/styles/variables.scss'
import './assets/styles/styles.scss'

axios.defaults.baseURL = 'http://localhost:7000'
const app = createApp(App).use(store).use(router).mount('#app')
axios.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem('token') || null
  return config
})
axios.interceptors.response.use(
  (res) => {
    return res
  },
  (err) => {
    if (err.response.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      return router.push('login')
    }
    return err
  }
)

export { app }
