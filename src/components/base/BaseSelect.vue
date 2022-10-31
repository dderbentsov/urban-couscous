<template lang="pug">
  .flex.box-border.container.items-center.cursor-pointer.relative(
    @click="openSelect"
    :class="{border: styleBorder, 'py-2.5 px-4':!forNetworks, 'justify-center':forNetworks, 'justify-between':!forNetworks}"
    )
    .flex.mr-2
      input.text-base.select.cursor-pointer(
          :size="sizeInput"
          v-if="!forNetworks"
          v-model="optionData"
          :placeholder="placeholder"
          disabled
        ) 
    .absolute.options.top-12.left-0(
      v-show="isSelectOpen"
      :id="id"
      )
      .option.px-4.py-1(
        v-for="responsible in listData"
        @click="(e) => chooseOption(e)"
        :key="responsible"
        :id="responsible"
        ) {{responsible}}
      .flex.select.cursor-pointer.w-full.text-xl.items-center.networks(v-if="forNetworks" :class="optionData")
        .absolute.options.top-5(
          v-show="isSelectOpen"
          class="left-[-11px]"
          :id="id")
          .flex.option.justify-center.py-1.text-xl(
            v-for="responsible in listData"
            @click="chooseOption"
            :key="responsible.network"
            :id="responsible.network"
            :class="responsible.icon"
            )
    .select-form-separator.cursor-pointer.mr-6px(v-if="separator")
    .text-xsm.ml-2.pt-1.icon-down-arrow.icon.text-center(v-if="!forNetworks" :class="{ open: isSelectOpen}")
</template>

<script>
export default {
  name: "BaseSelect",
  props: {
    id: String,
    styleBorder: {
      default: false,
    },
    separator: Boolean,
    optionData: String,
    listData: Array,
    chooseOption: Function,
    forNetworks: Boolean,
    placeholder: {
      type: String,
      default: "",
    },
    sizeInput: Number,
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
  color: var(--font-dark-blue-color)
  background-color: var(--bg-ligth-blue-color)
  &.border
    background-color: var(--default-white)
    border: 2px solid var(--border-light-grey-color)
.select
  appearance: none
  border: none
  outline: none
  background-color: var(--font-black-color-0)
  &::-webkit-calendar-picker-indicator
    display: none
    -webkit-appearance: none
  &.networks
    color: var(--font-dark-blue-color)
  &::placeholder
    color: var(--font-black-color-1)
.options
  z-index: 3
  background-color: var(--default-white)
  border-radius: 4px
  box-shadow: var(--default-shadow)
  width: 100%
.option
  color: var(--font-black-color)
  &:hover
    background-color: var(--btn-blue-color)
    color: var(--default-white)
.select-form-separator
  background-color: var(--btn-blue-color-3)
  height: 24px
  width: 1px
  border-radius: 1px
.icon
  color: var(--font-dark-blue-color)
  &.open
    transform: rotate(180deg)
</style>
