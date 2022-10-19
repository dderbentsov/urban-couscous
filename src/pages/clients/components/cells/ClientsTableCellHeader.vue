<template lang="pug">
  .flex.box-border.justify-between.px-4.items-center(:style="{ minWidth : width + 'px' }" :class="{width:generateWidth}")
    span.text-sm(v-if="title") {{title}}
    slot
</template>

<script>
export default {
  name: "ClientsTableCellHeader",
  props: {
    title: String,
    width: Number,
  },
  computed: {
    generateWidth() {
      if (!this.title || this.title === "Do") {
        return false;
      }
      return true;
    },
  },
};
</script>

<style lang="sass" scoped>
.width
  width: 100%
</style>
