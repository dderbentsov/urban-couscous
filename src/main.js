import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import './assets/sass/tailwind.sass'
import './assets/css/iconfonts.css'
import './assets/css/variables.css'

createApp(App).use(router).mount('#app')
