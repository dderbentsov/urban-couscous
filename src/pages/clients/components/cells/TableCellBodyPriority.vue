<template lang="pug">
  .flex.box-border.px-4.items-center.w-full.gap-x-2(:style="{ minWidth : width + 'px' }")
    .flex.gap-x-2.items-center(v-if="!isOpenChange")
      .dot.w-2.h-2(:style="{ backgroundColor : settings.settings.find((el) => el.priority == value).color }")
      span.text-sm(:style="{ color : settings.settings.find((el) => el.priority == value).color }") {{settings.settings.find((el) => el.priority == value).text}}
    .flex.gap-x-2.text-sm
      old-base-select(v-if="isOpenChange" :size-input="10" :option-data="getOption" :list-data="selectData" :style-border="true" :choose-option="choosePriority" disabled)
      base-select(v-if="isOpenChange" :items="getPriorityList" v-model="getOption")
</template>

<script>
import { column } from "@/pages/clients/utils/tableConfig";
import OldBaseSelect from "@/components/base/OldBaseSelect";
import BaseSelect from "@/components/base/BaseSelect";
export default {
  name: "TableCellBodyPriority",
  props: ["value", "width", "isOpenChange", "choosePriority"],
  components: { OldBaseSelect, BaseSelect },
  data() {
    return {
      settings: column.find((el) => el.name === "priority"),
    };
  },
  computed: {
    getOption() {
      return this.settings.settings.find((el) => el.priority == this.value)
        .text;
    },
    getPriorityList() {
      return this.settings.settings.map((el) => {
        return { label: el.text, id: el.id };
      });
    },
  },
};
</script>

<style lang="sass" scoped>
.dot
  background-color: var(--font-grey-color)
  border-radius: 50%
</style>
