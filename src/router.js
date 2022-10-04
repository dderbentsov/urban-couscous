import {createRouter, createWebHashHistory} from "vue-router";
import HomePages from "./components/pages/homePages/HomePages.vue";
import CalendarPages from "./components/pages/calendarPages/CalendarPages.vue";
import UserPages from "./components/pages/userPages/UserPages.vue";
import SettingsPages from "./components/pages/settingsPages/SettingsPages.vue";

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/", component: HomePages },
    { path: "/calendar", component: CalendarPages },
    { path: "/user", component: UserPages },
    { path: "/settings", component: SettingsPages }
  ]
})
