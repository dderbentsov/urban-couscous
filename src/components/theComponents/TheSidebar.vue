<template lang="pug">
  .sidebar-container
    .top-button-container
      the-button-sidebar(id="home" path="#/")
        home-icon
      the-button-sidebar(id="calendar" path="#/calendar")
        calendar-icon
      the-button-sidebar(id="user" path="#/user")
        user-icon
    .bottom-button-container
      the-button-sidebar(id="settings" path="#/settings")
        settings-icon
</template>

<script>
  import HomeIcon from '@/components/iconsComponents/HomeIcon';
  import CalendarIcon from '@/components/iconsComponents/CalendarIcon';
  import UserIcon from '@/components/iconsComponents/UserIcon';
  import SettingsIcon from '@/components/iconsComponents/SettingsIcon';
  import TheButtonSidebar from "@/components/theComponents/TheButtonSidebar";

  export default {
    name: "SidebarComponent",
    components: {TheButtonSidebar, HomeIcon, CalendarIcon, UserIcon, SettingsIcon},
  }
</script>

<style lang="sass">
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
    flex-direction: column
    row-gap: 24px
</style>
