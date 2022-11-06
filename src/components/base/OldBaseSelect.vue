<template lang="pug">
  .flex.box-border.container.items-center.cursor-pointer.relative.py-10px.px-4.justify-between(
    @click="changeSelect"
    :class="{border: styleBorder }"
    )
    .flex.mr-2
      input.text-base.select.cursor-pointer(
          :size="sizeInput"
          v-model="optionData"
          :placeholder="placeholder"
          :disabled="disabled"
          @input="sendData"
        )
      .absolute.options.top-12.left-0(
        v-show="isSelectOpen"
        :id="id"
        )
        .option.px-4.py-1(
          v-for="data in filteredListData"
          @click="(e) => chooseOption(e)"
          :key="data.id || data"
          :id="data.id || data"
          ) {{data.label || data}}
    .select-form-separator.cursor-pointer.mr-6px(v-if="separator")
    .text-xsm.ml-2.pt-1.icon-down-arrow.icon.text-center(:class="{ open: isSelectOpen}")
</template>

<script>
export default {
  name: "OldBaseSelect",
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
  computed: {
    filteredListData() {
      if (!this.disabled && this.optionData) {
        let filteredList = [];
        filteredList = this.listData.filter((elem) => {
          let reg = new RegExp(`${this.optionData}`, "img");
          if (elem.label) {
            return elem.lebel.match(reg);
          }
          return elem.match(reg);
        });
        if (filteredList.length === 0) this.closeSelect();
        return filteredList;
      }
      return this.listData;
    },
  },
  methods: {
    changeSelect() {
      this.isSelectOpen = !this.isSelectOpen;
    },
    openSelect() {
      this.isSelectOpen = true;
    },
    closeSelect() {
      this.isSelectOpen = false;
    },
    sendData(e) {
      this.$emit("changeInput", e.target.value);
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
