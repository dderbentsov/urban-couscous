<template lang="pug">
  .flex.box-border.justify-between.items-center(
    :style="{ minWidth : width + 'px', maxWidth: width + 'px', padding: generateWidth ? '0px 16px' : '0px 10px' }",
    :class="{width:generateWidth}"
  )
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
