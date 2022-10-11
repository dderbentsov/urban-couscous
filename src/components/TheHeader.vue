<template lang="pug">
  .header-wrapper
    .header-left-side
      img.logo-img(src="@/assets/images/logo.svg" alt="Logo")
    .header-right-side
      .header-inputs-wrapper
        img.search-icon(src="@/assets/icons/search.svg" alt="Search")
        select.header-inputs.select(v-model="selectedFilter")
          option(v-for="filter in filters" :key="filter" :value="filter") {{ filter }}
        span.header-inputs-separator
        input.header-inputs.search-input(placeholder="Искать ...")
      button.header-buttons.btn-notification
        img.bell-icon(src="@/assets/icons/bell.svg" alt="Notifications")
      .avatar-wrapper
        img.avatar-img(:src="avatarSrc")
        button.header-buttons.btn-down-arrow
          img.arrow-icon(src="@/assets/icons/down-arrow-2.svg" alt="Down Arrow")
</template>

<script>
  import img from '@/assets/images/avatar.svg'
  export default {
    name: 'HeaderComponent',
    data() {
      return {
        selectedFilter: 'Календарь',
        filters: ['Календарь', 'Вариант 2', 'Вариант 3'],
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

  .header-inputs-wrapper
    display: inline-block
    background-color: rgba(65, 105, 225, 0.1)
    padding: 8px 18px 8px 16px
    border-radius: 4px
    margin-right: 46px

  .search-icon
    position: absolute
    height: 24px
    width: 24px
    color: var(--btn-blue-color)
    opacity: 0.7

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

  .header-inputs
    cursor: pointer
    border: none
    outline: none
    background-color: transparent
    color: var(--btn-blue-color)
    height: 100%
    box-sizing: border-box
    font-family: Raleway
    font-style: normal
    font-weight: 500
    font-size: 16px
    line-height: 19px
    font-feature-settings: 'pnum' on, 'lnum' on
    display: inline-block
    vertical-align: middle
    &::placeholder
      color: var(--btn-blue-color)
      opacity: 0.5

  .select
    -webkit-appearance: none
    -moz-appearance: none
    -ms-appearance: none
    appearance: none
    background: url(@/assets/icons/down-arrow-1.svg) no-repeat right top 4px
    overflow: hidden
    margin-right: 16px
    padding: 2px 20px 2px 30px

  .search-input
    margin-left: 14px
    padding: 2px

  .header-inputs-separator
    display: inline-block
    vertical-align: middle
    border-left: 1px solid var(--btn-blue-color)
    opacity: 0.5
    border-radius: 4px
    height: 100%

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
