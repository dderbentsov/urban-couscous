<template lang="pug">
  .sidebar-container
    .top-button-container
      the-button-sidebar(id="home" path="#/")
        .icon-home
      the-button-sidebar(id="calendar" path="#/calendar")
        .icon-calendar-2
      the-button-sidebar(id="user" path="#/user")
        .icon-person-2
    .bottom-button-container
      the-button-sidebar(id="settings" path="#/settings")
        .icon-settings
</template>

<script>
  import TheButtonSidebar from "@/components/TheButtonSidebar";

  export default {
    name: "SidebarComponent",
    components: {TheButtonSidebar},
  }
</script>

<style lang="sass" scoped>
  #person
    font-style: normal
  .sidebar-container
    display: flex
    flex-direction: column
    justify-content: space-between
    flex: auto
    padding: 24px 0 24px 0
    box-sizing: border-box
    max-width: 80px
    background-color: #F8F8FF

  .top-button-container
    display: flex
    font-size: 40px
    flex-direction: column
    row-gap: 24px
    color: #9C27B0
</style>
