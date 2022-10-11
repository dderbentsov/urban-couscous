<template lang="pug">
  .wrapper(:class="{ open: isOpen }")
    .select-wrapper(@click="changeState")
      .select
        img.icon-wrapper.loupe(src="@/assets/icons/search.svg" alt="Search") 
        span.inputs.select-input {{ selectedFilter }}
        .icon-wrapper.arrow.icon-down-arrow
      .filter-options(v-if="isOpen")
        .options(v-for="filter in filters" :key="filter" @click="selectFilter(filter)")
          .icon-wrapper
            .icon-ok.ok(v-if="filter === selectedFilter")
          .options-text {{ filter }}
    input.inputs.search-input(placeholder="Искать ...")
</template>

<script>
  export default {
    name: "HeaderInputs",
    props: {},
    data() {
      return {
        selectedFilter: 'Календарь',
        filters: ['Календарь', 'Клиенты'],
        isOpen: false
      }
    },
    computed: {
      
    },
    methods: {
      changeState() {
        this.isOpen = !this.isOpen
      },
      selectFilter(filter) {
        this.selectedFilter = filter
      }
    }
  }
</script>

<style lang="sass" scoped>
  .open
    .arrow
      transform: rotate(180deg)

  .wrapper
    background-color: var(--bg-white-color)
    display: flex
    align-items: center

  .inputs-wrapper
    display: flex
    align-items: center
    border-radius: 4px
    border: 1px solid var(--border-light-grey-color)

  .select-wrapper
    color: var(--btn-blue-color)

  .icon-wrapper
    width: 24px
    height: 24px
    display: flex
    justify-content: center
    align-items: center

  .loupe
    margin: 8px 0 8px 16px
    font-size: 21px
    color: var(--btn-blue-color)

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
    padding: 10px 16px
    &::placeholder
      color: var(--font-grey-color)

  .select
    display: flex
    align-items: center
    border-radius: 4px 0 0 4px
    border: 1px solid var(--border-light-grey-color)
    border-right: none
    position: relative
    z-index: 2

  .select-input
    width: 100px
    padding: 10px 4px 10px 8px

  .filter-options
    display: flex
    flex-direction: column
    width: 173px
    box-sizing: border-box
    padding: 16px
    background-color: var(--bg-white-color)
    color: var(--font-dark-blue-color)
    margin-top: 4px
    border-radius: 4px
    position: absolute
    box-shadow: 4px 4px 8px rgba(9, 10, 21, 0.1), -4px -4px 8px rgba(9, 10, 21, 0.1)

  .search-input
    border-radius: 0 4px 4px 0
    border: 1px solid var(--border-light-grey-color)

  .options
    display: flex
    flex-direction: row
    margin-bottom: 16px
    font-weight: 500
    font-size: 16px
    line-height: 19px
    color: var(--font-dark-blue-color)
    cursor: pointer
    &:last-child
      margin: 0
    &:hover
      color: var(--btn-blue-color)  

  .options-text
    display: flex
    align-items: center

  .arrow
    margin: 12px 16px 12px 0
    font-size: 8px

  .ok 
    margin-right: 8px
</style>