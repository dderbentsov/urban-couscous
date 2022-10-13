import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import moment from "moment";
import "./assets/sass/fonts.sass";
import "./assets/sass/tailwind.sass";
import "./assets/sass/variables.sass";
import "./assets/css/iconfonts.css";

moment.locale("ru");

createApp(App).use(router, moment).mount("#app");
