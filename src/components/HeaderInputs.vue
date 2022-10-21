<template lang="pug">
  .header-inputs-wrapper.flex.items-center.font-medium.text-base(:class="{ open: isOpen }")
    .select-container(@click="changeState")
      .select-wrapper.flex.items-center.cursor-pointer.mx-4.my-2
        .icon-wrapper.icon-search.flex.text-lg.justify-center.items-center
        span.custom-input.select-input.inline-block.box-border.align-middle.pl-2.pr-1 {{ selectedFilter }}
        .arrow.icon-down-arrow.text-xsm.mt-px.flex.justify-center.items-center
      .options-wrapper.flex.flex-col.box-border.p-4.mt-1(v-if="isOpen")
        .option-list.cursor-pointer.flex.flex-row.mb-4(v-for="filter in filters" :key="filter" @click="selectFilter(filter)")
          .icon-wrapper.mr-2.flex.justify-center
            .icon-ok.text-xs.flex.justify-center.items-center(v-if="filter === selectedFilter")
          .flex.items-center {{ filter }}
    input.custom-input.search-input.inline-block.box-border.align-middle.px-4(class="py-2.5" placeholder="Искать ...")
</template>

<script>
export default {
  name: "HeaderInputs",
  data() {
    return {
      selectedFilter: "Календарь",
      filters: ["Календарь", "Клиенты"],
      isOpen: false,
    };
  },
  methods: {
    changeState() {
      this.isOpen = !this.isOpen;
    },
    selectFilter(filter) {
      this.selectedFilter = filter;
    },
  },
};
</script>

<style lang="sass" scoped>
.open
  .arrow
    transform: rotate(180deg)

.header-inputs-wrapper
  height: 40px
  background-color: var(--default-white)
  border-radius: 4px
  border: 1px solid var(--border-light-grey-color)

.select-container
  border-right: 1px solid var(--border-light-grey-color)

.icon-wrapper
  width: 24px
  height: 24px

.custom-input
  border: none
  outline: none
  background-color: transparent
  color: var(--btn-blue-color)
  height: 100%

.select-wrapper
  position: relative
  z-index: 2

.select-input
  width: 100px

.options-wrapper
  width: 172px
  background-color: var(--default-white)
  color: var(--font-dark-blue-color)
  border-radius: 4px
  position: absolute
  box-shadow: var(--default-shadow)

.search-input
  &::placeholder
    color: var(--font-grey-color)

.icon-search
  color: var(--btn-blue-color)
  opacity: 0.5

.option-list
  &:last-child
    margin: 0
  &:hover
    color: var(--btn-blue-color)

.arrow
  color: var(--btn-blue-color)

.icon-down-arrow
  width: 16px
  height: 16px
</style>
