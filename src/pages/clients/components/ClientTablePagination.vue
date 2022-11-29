<template lang="pug">
  .flex.items-center.gap-2.text-base.w-full.justify-center
    button.item.default-theme.flex.items-center.justify-center.pr-1(
      @click="previousHandler",
      :disabled="disabledPreviousButton"
    )
      .icon-down-arrow.arrow-left
    button.item.flex.items-center.justify-center(
      v-for="page, index in pageCount",
      :key="index",
      :id="page",
      :class="currentPageStyle(page)",
      :disabled="disabledMissingPages(page)"
      @click="changeCurrentPage"
    ) {{ page }}
    button.item.default-theme.flex.items-center.justify-center.pl-1(
      @click="nextHandler",
      :disabled="disabledNextButton"
    )
      .icon-down-arrow.arrow-right
</template>

<script>
export default {
  name: "ClientTablePagination",
  props: {
    length: Number,
    currentPage: Number,
    totalVisible: {
      type: Number,
      default: 7,
    },
    paginationInfo: Object,
  },
  computed: {
    pageCount() {
      let countArray = [];
      for (let i = 1; i <= this.paginationInfo.length; i++) {
        countArray.push(i);
      }
      if (this.paginationInfo.length <= this.totalVisible) return countArray;
      let incompleteCountArray = [];
      if (
        this.paginationInfo.currentPage <= 2 ||
        this.paginationInfo.currentPage >=
          countArray[this.paginationInfo.length - 2]
      ) {
        countArray.forEach((elem, index, arr) => {
          if (index <= 2 || index >= arr.length - 3)
            incompleteCountArray.push(elem);
          else if (!incompleteCountArray.includes("..."))
            incompleteCountArray.push("...");
        });
        return incompleteCountArray;
      }
      if (this.paginationInfo.currentPage <= 4) {
        countArray.forEach((elem, index, arr) => {
          if (index <= 4 || index === arr.length - 1)
            incompleteCountArray.push(elem);
          else if (!incompleteCountArray.includes("..."))
            incompleteCountArray.push("...");
        });
        return incompleteCountArray;
      }
      if (
        this.paginationInfo.currentPage >=
        countArray[this.paginationInfo.length - 4]
      ) {
        countArray.forEach((elem, index, arr) => {
          if (index === 0 || index >= arr.length - 5)
            incompleteCountArray.push(elem);
          else if (!incompleteCountArray.includes("..."))
            incompleteCountArray.push("...");
        });
        return incompleteCountArray;
      }
      countArray.forEach((elem, index, arr) => {
        if (index === 0) incompleteCountArray.push(elem, "...");
        if (
          index >= this.paginationInfo.currentPage - 2 &&
          index <= this.paginationInfo.currentPage
        )
          incompleteCountArray.push(elem);
        if (index === arr.length - 1) incompleteCountArray.push("...", elem);
      });
      return incompleteCountArray;
    },
    disabledNextButton() {
      return this.paginationInfo.currentPage === this.paginationInfo.length;
    },
    disabledPreviousButton() {
      return this.paginationInfo.currentPage === 1;
    },
  },
  methods: {
    currentPageStyle(number) {
      if (number === this.paginationInfo.currentPage)
        return {
          "active-theme": true,
        };
      return {
        "default-theme": true,
      };
    },
    previousHandler() {
      if (this.paginationInfo.currentPage !== 1) this.$emit("previous-page");
    },
    nextHandler() {
      if (this.paginationInfo.currentPage !== this.paginationInfo.length)
        this.$emit("next-page");
    },
    changeCurrentPage(e) {
      this.$emit("set-current-page", parseInt(e.target.id));
    },
    disabledMissingPages(page) {
      return isNaN(parseInt(page));
    },
  },
};
</script>

<style lang="sass" scoped>
.item
  width: 32px
  height: 32px
  border-radius: 4px
  &:disabled
    opacity: 0.5

.default-theme
  background-color: var(--default-white)
  color: var(--font-black-color)
  box-shadow: var(--pagination-item-shadow)

.active-theme
  background-color: var(--btn-blue-color)
  color: var(--default-white)
  box-shadow: var(--pagination-current-item-shadow)

.arrow-left
  transform: rotate(90deg)
  color: var(--font-grey-color)

.arrow-right
  transform: rotate(270deg)
  color: var(--font-grey-color)
</style>
