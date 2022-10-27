<template lang="pug">
  .sidebar.flex.flex-col.justify-between.flex-auto.py-6.box-border
    .flex.flex-col.gap-y-6
      the-button-sidebar( v-for="button in pageSettings.filter((el) => el.id !== 'settings')" :path="button.path" :id="button.id" :active="button.active" :change-style-page="changeStylePage")
        .icon(:class="button.icon")
    .flex.text-4xl.flex-col.gap-y-6
      the-button-sidebar(:path="getSettings.path" :id="getSettings.id" :active="getSettings.active" :change-style-page="changeStylePage")
        .icon(:class="getSettings.icon")
</template>

<script>
import TheButtonSidebar from "@/components/base/buttons/BaseSidebarButton";

export default {
  name: "TheSidebar",
  components: { TheButtonSidebar },
  data() {
    return {
      pageSettings: [
        {
          id: "home",
          path: "#/",
          active: true,
          icon: "icon-home",
        },
        {
          id: "calendar",
          path: "#/calendar",
          active: false,
          icon: "icon-calendar-2",
        },
        {
          id: "user",
          path: "#/clients",
          active: false,
          icon: "icon-person-2",
        },
        {
          id: "settings",
          path: "#/settings",
          icon: "icon-settings",
          active: false,
        },
      ],
    };
  },
  methods: {
    changeStylePage(e) {
      this.pageSettings.forEach((el, index) => {
        el.id === e.currentTarget.id
          ? (this.pageSettings[index].active = true)
          : (this.pageSettings[index].active = false);
      });
    },
  },
  computed: {
    getSettings() {
      return this.pageSettings.find((el) => el.id === "settings");
    },
  },
  mounted() {
    let href = window.location.href.slice(22);
    this.pageSettings.forEach((el, index) => {
      el.path === href
        ? (this.pageSettings[index].active = true)
        : (this.pageSettings[index].active = false);
    });
  },
};
</script>

<style lang="sass" scoped>
.sidebar
  max-width: 80px
  min-width: 80px
  background-color: var(--default-white)
  border-top-right-radius: 4px
.icon
  min-width: 44px
</style>
