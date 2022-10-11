<template lang="pug">
  div.header-wrapper
    div.header-left-side
      img.logo-img(src="@/assets/images/logo.svg" alt="Logo")
    div.header-right-side
      header-inputs
      button.header-buttons.btn-notification
        img.bell-icon(src="@/assets/icons/bell.svg" alt="Notifications")
      div.avatar-wrapper
        img.avatar-img(:src="avatarSrc")
        button.header-buttons.btn-down-arrow
          img.arrow-icon(src="@/assets/icons/down-arrow-2.svg" alt="Down Arrow")
</template>

<script>
  import img from '@/assets/images/avatar.svg'
  import HeaderInputs from './HeaderInputs.vue'
  export default {
    name: 'TheHeader',
    components: {HeaderInputs},
    data() {
      return {
        avatarSrc: img
      }
    }
  }
</script>

<style lang='sass' scoped>
  input
    padding: 0 

  .header-buttons
    outline: none
    border: none
    background-color: transparent
    cursor: pointer
    padding: 0
    color: var(--font-dark-blue-color)

  .header-wrapper
    display: flex
    flex-direction: row
    justify-content: space-between
    width: 100%
    padding: 8px 24px
    background-color: var(--bg-white-color)
    box-sizing: border-box
    position: relative
    z-index: 2

  .header-right-side
    display: flex
    flex-direction: row

  .header-left-side
    box-sizing: border-box
    margin: 4px 0
    height: 32px 
    cursor: pointer

  .logo-img
    height: 32px
    width: 70px 

  .btn-notification
    display: flex
    justify-content: center
    align-items: center  
    margin-right: 32px

  .arrow-icon
    width: 24px
    height: 24px

  .bell-icon
    width: 24px
    height: 24px

  .avatar-wrapper
    display: flex
    flex-direction: row
    justify-content: center
    align-items: center

  .btn-down-arrow
    display: flex
    justify-content: center
    align-items: center

  .avatar-img
    width: 32px
    height: 32px
    margin-right: 8px
</style>