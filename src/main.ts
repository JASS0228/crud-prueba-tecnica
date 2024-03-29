import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routes'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(VueQueryPlugin)
app.use(VueSweetalert2)
app.use(router)
app.mount('#app')
