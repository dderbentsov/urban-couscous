<template lang="pug">
  .flex.box-border.w-full.container.items-center.cursor-pointer(
    @click="openSelect"
    :class="{border: styleBorder, 'py-2.5 px-4':!forNetworks, 'justify-center':forNetworks, 'justify-between':!forNetworks}"
    :style="{ minWidth : widthSelect + 'px'}"
    )
    .relative.flex.flex-col
      .not-italic.select.cursor-pointer.w-full(v-if="!forNetworks") {{optionData}}
        .absolute.options(
          v-show="isSelectOpen"
          :id="id"
          class="left-[-18px]"
          :style="{ minWidth : widthSelect + 'px'}"
          )
          .not-italic.option.pl-4.py-1(
            v-for="responsible in listData"
            @click="(e) => chooseOption(e)"
            :key="responsible"
            :id="responsible"
            ) {{responsible}}
      .flex.not-italic.select.cursor-pointer.w-full.text-xl.items-center.networks(v-if="forNetworks" :class="optionData")
        .absolute.options.top-5(
          v-show="isSelectOpen"
          class="left-[-11px]"
          :id="id"
          :style="{ minWidth : widthSelect + 'px'}")
          .flex.not-italic.option.justify-center.py-1.text-xl(
            v-for="responsible in listData"
            @click="(e) => chooseOption(e)"
            :key="responsible.network"
            :id="responsible.network"
            :class="responsible.icon"
            )
    .select-form-separator.cursor-pointer(v-if="withSeparator")
    .text-sm.ml-2.pt-1.icon-down-arrow.icon.text-center(v-if="!forNetworks" :class="{ open: isSelectOpen}")
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
    forNetworks: Boolean,
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
  },
};
</script>

<style lang="sass" scoped>
.container
  border-radius: 4px
  width: fit-content
  background-color: var(--bg-ligth-blue-color)
  &.border
    background-color: var(--default-white)
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
  &.networks
    color: var(--font-dark-blue-color)
.options
  z-index: 3
  width: max-content
  background-color: var(--default-white)
  border: 2px solid var(--border-light-grey-color)
  border-top: none
  border-radius: 0 0 4px 4px
.option
  color: var(--font-black-color)
  border-bottom: 1px solid var(--border-light-grey-color)
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
