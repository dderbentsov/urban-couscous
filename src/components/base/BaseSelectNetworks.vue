<template lang="pug">
  .flex.box-border.container.items-center.cursor-pointer.justify-center.relative(
    @click="changeSelect",
    v-click-outside="closeSelect",
    :class="{border: styleBorder}"
  )
    .flex.select.cursor-pointer.w-full.text-xl.items-center.networks(:class="optionData, 'px-2.5'")
      .absolute.options.top-11.left-0(
        v-show="isSelectOpen",
        :id="id"
      )
        .flex.option.justify-center.py-1.text-xl(
          v-for="data in listData",
          @click="(e) => chooseOption(e)",
          :key="data.network",
          :id="data.network",
          :class="data.icon"
        )
    .select-form-separator.cursor-pointer.mr-6px(v-if="separator")
</template>

<script>
export default {
  name: "BaseSelectNetworks",
  props: {
    id: String,
    styleBorder: {
      default: false,
    },
    separator: Boolean,
    optionData: String,
    listData: Array,
    chooseOption: Function,
    placeholder: {
      type: String,
      default: "",
    },
    sizeInput: Number,
    disabled: Boolean,
  },
  data() {
    return {
      isSelectOpen: false,
    };
  },
  methods: {
    changeSelect() {
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
  color: var(--font-dark-blue-color)
  background-color: var(--default-white)
  &.border
    background-color: var(--default-white)
    border: 2px solid var(--border-light-grey-color)
.select
  appearance: none
  border: none
  outline: none
  color: var(--font-dark-blue-color)
  background-color: var(--font-black-color-0)
  &.default
    color: var(--font-black-color-1)
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
