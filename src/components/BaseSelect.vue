<template lang="pug">
  .flex.gap-2.py-2.px-4.container(@click="selectOpen")
    .relative.flex.flex-col
      .not-italic.text-base.select {{optionData}}
        .absolute.options(v-if="isOpen" :id="id" @click="(event)=>chooseOption(event)")
          .not-italic.text-base.option(v-for="(responsible, index) in listData" :key="index" :id="index") {{responsible}}
    .select-form-separator
    .text-sm.icon-down-arrow.icon
</template>

<script>
  export default {
    name: "BaseSelect",
    props: {
      id: String,
      optionData: String,
      listData: Array,
      chooseOption: Function,
      isOpen: Boolean,
      selectOpen: Function
    }
  }
</script>

<style lang="sass" scoped>
  .container
    align-items: center
    cursor: pointer
    border-radius: 4px
    width: fit-content
    background-color: var(--bg-ligth-blue-color)
  .select
    appearance: none
    border: none
    outline: none
    cursor: pointer
    color: rgba(9, 10, 21, 0.5)
    background-color: rgba(9, 10, 21, 0)
    &::-webkit-calendar-picker-indicator
      display: none
      -webkit-appearance: none
  .options
    z-index: 3
    width: max-content
    background-color: var(--bg-ligth-blue-color)
  .option
    color: var(--font-black-color)
    &:hover
      background-color: var(--btn-blue-color)
  .select-form-separator
    background-color: rgba(65, 105, 225, 0.2)
    height: 24px
    width: 1px
    border-radius: 1px
  .icon
    text-align: center
    color: var(--font-dark-blue-color)
    &:hover
      color: var(--btn-blue-color)
</style>

