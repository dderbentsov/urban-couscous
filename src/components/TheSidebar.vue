<template lang="pug">
  .sidebar.flex.flex-col.justify-between.flex-auto.py-6.box-border
    .flex.flex-col.gap-y-6
      the-button-sidebar(id="home" path="#/")
        .icon-home.icon
      the-button-sidebar(id="calendar" path="#/calendar")
        .icon-calendar-2.icon
      the-button-sidebar(id="user" path="#/clients")
        .icon-person-2.icon
    .flex.text-4xl.flex-col.gap-y-6
      the-button-sidebar(id="settings" path="#/settings")
        .icon-settings.icon
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
  min-width: 80px
  background-color: var(--default-white)
  border-top-right-radius: 4px
.icon
  min-width: 44px
</style>
