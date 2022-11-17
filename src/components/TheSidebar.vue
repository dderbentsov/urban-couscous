<template lang="pug">
  .sidebar.flex.flex-col.justify-between.flex-auto.py-6.box-border(
    :style="{borderTopRightRadius: this.currenPageBorder ? '0px' : '4px'}"
  )
    .flex.flex-col.gap-y-6
      the-button-sidebar(
        v-for="button in pageSettings.filter((el) => el.id !== 'settings')",
        :path="button.path",
        :id="button.id",
        :active="button.active",
        :change-style-page="changeStylePage"
      )
        .icon(:class="button.icon")
    .flex.text-4xl.flex-col.gap-y-6
      the-button-sidebar(
        :path="getSettings.path",
        :id="getSettings.id",
        :active="getSettings.active",
        :change-style-page="changeStylePage"
      )
        .icon(:class="getSettings.icon")
</template>

<script>
import TheButtonSidebar from "@/components/base/BaseSidebarButton";

export default {
  name: "TheSidebar",
  components: { TheButtonSidebar },
  data() {
    return {
      pageSettings: [
        {
          id: "calendar",
          path: "#/calendar",
          active: true,
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
      currenPageBorder: true,
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
    changePage() {
      console.log(this.$router.currentRoute._value.fullPath);
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
  watch: {
    "$route.path"() {
      if (this.$router.currentRoute._value.fullPath === "/calendar") {
        this.currenPageBorder = true;
      } else this.currenPageBorder = false;
    },
  },
};
</script>

<style lang="sass" scoped>
.sidebar
  max-width: 80px
  min-width: 80px
  background-color: var(--default-white)
.icon
  min-width: 44px
</style>
