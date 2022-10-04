<template lang="pug">
  div(class='sidebar-container')
    div(class='top-button-container')
      button-sidebar-component(id="home" path="#/")
        home-icon
      button-sidebar-component(id="calendar" path="#/calendar")
        calendar-icon
      button-sidebar-component(id="user" path="#/user")
        user-icon
    div(class="bottom-button-container")
      button-sidebar-component(id="settings" path="#/settings")
        settings-icon
</template>

<script>
  import HomeIcon from '../iconsComponents/HomeIcon';
  import CalendarIcon from '../iconsComponents/CalendarIcon';
  import UserIcon from '../iconsComponents/UserIcon';
  import SettingsIcon from '../iconsComponents/SettingsIcon';
  import ButtonSidebarComponent from "../ButtonSidebarComponent";

  export default {
    name: "SidebarComponent",
    components: {ButtonSidebarComponent, HomeIcon, CalendarIcon, UserIcon, SettingsIcon},
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
