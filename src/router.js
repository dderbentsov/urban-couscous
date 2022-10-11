import {createRouter, createWebHashHistory} from "vue-router";
import TheHome from "@/pages/home/TheHome.vue";
import TheCalendar from "@/pages/calendar/TheCalendar";
import TheUser from "@/pages/user/TheUser";
import TheSettings from "@/pages/settings/TheSettings";

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", component: TheHome },
    { path: "/calendar", component: TheCalendar },
    { path: "/user", component: TheUser },
    { path: "/settings", component: TheSettings }
  ]
})
