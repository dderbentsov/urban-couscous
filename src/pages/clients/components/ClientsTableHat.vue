<template lang="pug">
  .flex.justify-between.w-full.h-fit
    .flex.gap-2.w-fit.h-fit
      .input
        base-input(:with-icon="true", icon-position="left", v-model:value="searchClient")
          .icon-search
      button.filter-button.flex.items-center.justify-center.box-border(
        class="px-2.5"
        @click="searchLastName"
      )
        .icon-filter.text-xl.leading-4
      button.filter-button.flex.items-center.justify-center.px-10px(@click="resetLastName") Очистить  
    clients-table-header-actions(v-if="!!isOpenActions" :is-selected-one="isOpenActions===1")
    .flex.w-fit.h-fit.gap-x-2
      base-button(left-icon="icon-download" :icon-left-size="16" :size="40" :outlined="true")
      base-button(left-icon="icon-plus" :icon-left-size="13" :size="40" @click="openForm")
        span.font-semibold Создать
</template>

<script>
import ClientsTableHeaderActions from "@/pages/clients/components/ClientsTableHeaderActions";
import BaseInput from "@/components/base/BaseInput";
import BaseButton from "@/components/base/BaseButton";
export default {
  name: "ClientsTableHat",
  components: {
    BaseInput,
    ClientsTableHeaderActions,
    BaseButton,
  },
  props: {
    openForm: Function,
    isOpenActions: Number,
  },
  data() {
    return {
      searchClient: "",
    };
  },
  methods: {
    searchLastName() {
      if (this.searchClient.length >= 3)
        this.$emit("search", this.searchClient);
    },
    resetLastName() {
      this.$emit("reset-search", this.searchClient);
      this.searchClient = "";
    },
  },
};
</script>

<style lang="sass" scoped>
.input
  width: 280px
  height: fit-content
.filter-button
  border-radius: 4px
  border: 2px solid var(--border-light-grey-color)
</style>
