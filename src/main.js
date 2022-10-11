import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import './assets/sass/fonts.sass'
import './assets/sass/tailwind.sass'
import './assets/sass/variables.sass'
import './assets/css/iconfonts.css'

createApp(App).use(router).mount('#app')
