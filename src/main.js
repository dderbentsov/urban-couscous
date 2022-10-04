import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import './assets/sass/styles.sass'
import './assets/css/variables.css'

createApp(App).use(router).mount('#app')
