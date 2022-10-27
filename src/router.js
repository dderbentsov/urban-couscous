import { createRouter, createWebHashHistory } from "vue-router";
import TheCalendar from "@/pages/calendar/TheCalendar";
import TheUser from "@/pages/clients/TheClients";
import TheSettings from "@/pages/settings/TheSettings";

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", component: TheCalendar },
    { path: "/clients", component: TheUser },
    { path: "/settings", component: TheSettings },
  ],
});
