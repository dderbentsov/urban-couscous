<template lang="pug">
  div.header-wrapper.flex.flex-row.center.space-between
    div.logo-wrapper
      img.logo-img(src="../../assets/images/logo.svg" alt="Logo")
    div.flex.flex-row
      div.inputs-wrapper
        img.search-icon(src="../../assets/icons/search.svg" alt="Search")
        select.inputs.select(v-model="selectedFilter")
          option(v-for="filter in filters" :key="filter" :value="filter") {{ filter }}
        span.separator  
        input.inputs.search-input(placeholder="Искать ...")
      button.flex.center.btn-notification
        img.bell-icon(src="../../assets/icons/bell.svg" alt="Notifications")
      div.flex.flex-row.center
        img.avatar-img(:src="avatarSrc")
        button.flex.flex-center
          img.arrow-icon(src="../../assets/icons/down-arrow-2.svg" alt="Down Arrow")
</template>

<script>
import img from '../../assets/images/avatar.svg'
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

<style lang='sass'>

input
  padding: 0 

button
  outline: none
  border: none
  background-color: transparent
  cursor: pointer
  padding: 0
  color: var(--font-dark-blue-color)

.header-wrapper
  width: 100%
  padding: 8px 24px
  background-color: var(--bg-white-color)
  box-sizing: border-box

.flex
  display: flex

.flex-row    
  flex-direction: row

.center
  justify-content: center
  align-items: center  

.space-between    
  justify-content: space-between

.logo-wrapper
  box-sizing: border-box
  margin: 4px 0
  height: 32px 
  cursor: pointer

.logo-img
  height: 32px
  width: 70px 

.inputs-wrapper
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
  margin-right: 32px

.arrow-icon
  width: 24px
  height: 24px

.bell-icon
  width: 24px
  height: 24px

.inputs
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
  background: url(../../assets/icons/down-arrow-1.svg) no-repeat right top 4px
  overflow: hidden
  margin-right: 16px
  padding: 2px 20px 2px 30px

.search-input
  margin-left: 14px
  padding: 2px

.separator
  display: inline-block
  vertical-align: middle
  height: 254px
  border-left: 1px solid var(--btn-blue-color)
  opacity: 0.5
  border-radius: 4px
  height: 100%

.avatar-img
  width: 32px
  height: 32px
  margin-right: 8px

</style>
