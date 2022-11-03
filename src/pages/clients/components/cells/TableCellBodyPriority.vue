<template lang="pug">
  .flex.box-border.px-4.items-center.w-full.gap-x-2(:style="{ minWidth : width + 'px' }")
    .flex.gap-x-2.items-center(v-if="!isOpenChange")
      .dot.w-2.h-2(:style="{ backgroundColor : settings.settings.find((el) => el.text == value).color }")
      span.text-sm(:style="{ color : settings.settings.find((el) => el.text == value).color }") {{value}}
    .flex.gap-x-2.text-sm(class="w-[164px]")
      base-select(v-if="isOpenChange", :items="getPriorityList", v-model="value")
</template>

<script>
import { column } from "@/pages/clients/utils/tableConfig";
import BaseSelect from "@/components/base/BaseSelect";
export default {
  name: "TableCellBodyPriority",
  props: ["value", "width", "isOpenChange", "choosePriority"],
  components: { BaseSelect },
  data() {
    return {
      settings: column.find((el) => el.name === "priority"),
    };
  },
  computed: {
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
