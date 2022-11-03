import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import moment from "moment";
import vClickOutside from "v-click-outside";
import "./assets/sass/fonts.sass";
import "./assets/sass/tailwind.sass";
import "./assets/sass/variables.sass";
import "./assets/css/iconfonts.css";
import { clientsServer } from "../server.js";

if (process.env.NODE_ENV === "development") {
  clientsServer({ environment: "development" });
}

moment.locale("ru");

createApp(App).use(router, vClickOutside, moment).mount("#app");
