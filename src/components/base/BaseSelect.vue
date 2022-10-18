<template lang="pug">
  .flex.justify-between.px-4.w-full.container.items-center.cursor-pointer(@click="openSelect" class="py-2.5" :class="{border: styleBorder}" :style="{ minWidth : widthSelect + 'px'}")
    .relative.flex.flex-col
      .not-italic.text-base.select.cursor-pointer.w-full {{optionData}}
        .absolute.options(v-show="isSelectOpen" :id="id")
          .not-italic.text-base.option(v-for="(responsible, index) in listData" @click="(e) => chooseOption(e)" :key="index" :id="index") {{responsible}}
    .select-form-separator.cursor-pointer(v-if="withSeparator" )
    .text-sm.ml-2.pt-1.icon-down-arrow.icon.text-center(:class="{ open: isSelectOpen}")
</template>

<script>
export default {
  name: "BaseSelect",
  props: {
    id: String,
    styleBorder: {
      default: false,
    },
    widthSelect: Number,
    withSeparator: {
      default: false,
    },
    optionData: String,
    listData: Array,
    chooseOption: Function,
  },
  data() {
    return {
      isSelectOpen: false,
    };
  },
  methods: {
    openSelect() {
      this.isSelectOpen = !this.isSelectOpen;
    },
    closeSelect() {
      this.isSelectOpen = false;
    },
  },
};
</script>

<style lang="sass" scoped>
.container
  border-radius: 4px
  width: fit-content
  background-color: var(--bg-ligth-blue-color)
  &.border
    background-color: rgba(255, 255, 255, 0)
    border: 2px solid var(--border-light-grey-color)
.select
  appearance: none
  border: none
  outline: none
  color: var(--font-black-color-1)
  background-color: var(--font-black-color-0)
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
  background-color: var(--btn-blue-color-3)
  height: 24px
  width: 1px
  border-radius: 1px
.icon
  color: var(--font-dark-blue-color)
  &:hover
    color: var(--btn-blue-color)
  &.open
    transform: rotate(180deg)
</style>
