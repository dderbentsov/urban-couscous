import { createRouter, createWebHashHistory } from "vue-router";
import TheCalendar from "@/pages/calendar/TheCalendar";
import TheUser from "@/pages/clients/TheClients";
import TheSettings from "@/pages/settings/TheSettings";
import TheLogin from "@/pages/login/TheLogin";
import LoggedInLayout from "@/components/LoggedInLayout/LoggedInLayout";

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/login",
      component: TheLogin,
    },
    {
      path: "/",
      component: LoggedInLayout,
      children: [
        { path: "calendar", component: TheCalendar },
        { path: "clients", component: TheUser },
        { path: "settings", component: TheSettings },
      ],
    },
  ],
});
