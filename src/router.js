import { createRouter, createWebHashHistory } from "vue-router";
import TheCalendar from "@/pages/calendar/TheCalendar";
import TheUser from "@/pages/clients/TheClients";
import TheSettings from "@/pages/settings/TheSettings";
import TheLogin from "@/pages/login/TheLogin";
import LoggedInLayout from "@/components/LoggedInLayout";
import TheMedicalCard from "@/pages/medicalCard/TheMedicalCard";

const ifNotAuthenticated = (to, from, next) => {
  if (!localStorage.getItem("tokenAccess")) {
    return next();
  }
  next("/");
};

const ifAuthenticated = (to, from, next) => {
  if (localStorage.getItem("tokenAccess")) {
    return next();
  }
  next("/login");
};

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/login",
      component: TheLogin,
      beforeEnter: ifNotAuthenticated,
    },
    {
      path: "/",
      component: LoggedInLayout,
      beforeEnter: ifAuthenticated,

      children: [
        { path: "", redirect: "calendar" },
        { path: "calendar", component: TheCalendar },
        { path: "clients", component: TheUser },
        { path: "settings", component: TheSettings },
        { path: "medicalCard", component: TheMedicalCard },
      ],
    },
  ],
});
