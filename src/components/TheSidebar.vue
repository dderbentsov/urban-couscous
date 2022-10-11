<template lang="pug">
  .sidebar.flex.flex-col.justify-between.flex-auto.py-6.box-border
    .flex.flex-col.gap-y-6
      the-button-sidebar(id="home" path="#/")
        .icon-home
      the-button-sidebar(id="calendar" path="#/calendar")
        .icon-calendar-2
      the-button-sidebar(id="user" path="#/user")
        .icon-person-2
    .flex.text-4xl.flex-col.gap-y-6
      the-button-sidebar(id="settings" path="#/settings")
        .icon-settings
</template>

<script>
import TheButtonSidebar from "@/components/base/buttons/BaseSidebarButton";

export default {
  name: "TheSidebar",
  components: { TheButtonSidebar },
};
</script>

<style lang="sass" scoped>
.sidebar
  max-width: 80px
  background-color: #F8F8FF
</style>
