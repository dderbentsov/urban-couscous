<template lang="pug">
  .base-select(@click="open = !open", :class="{'open': open }")
    .placeholder.text-base {{ itemsMap[value] || placeholder }}
    span.icon-down-arrow.open-icon(:class="{'open': open }")
    base-menu(v-if="open")
      .items-container(@click="open = false", @mouseleave="fasdfasd")
        .item(v-for="item in items", :key="item.id" @click="clickItem(item.id)") {{ item.label }}
</template>

<script>
import BaseMenu from "@/components/base/BaseMenu";
export default {
  name: "VSelect",
  components: { BaseMenu },
  props: {
    placeholder: String,
    modelValue: String,
    items: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["update:modelValue"],
  data() {
    return {
      open: false,
    };
  },
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
    itemsMap() {
      return this.items.reduce(
        (acc, item) => ({
          ...acc,
          [item.id]: item.label,
        }),
        {}
      );
    },
  },
  methods: {
    clickItem(id) {
      this.value = id;
    },
    fasdfasd() {
      this.open = false;
    },
  },
  mounted() {
    console.log(this.$.appContext.app._container);
  },
};
</script>

<style scoped lang="sass">
.base-select
  width: 100%
  border: 1.5px solid #D3D4DC
  border-radius: 4px
  padding: 9px 16px
  background-color: white
  user-select: none
  display: flex
  justify-content: space-between
  align-items: center
  gap: 16px
  cursor: pointer
  &.open
    border: 1.5px solid #4772F2
.items-container
  box-shadow: 1px 1px 8px rgba(37, 40, 80, 0.15)
  border-radius: 4px
  background-color: white
  margin-top: 4px
.placeholder
  color: #090A15
  opacity: 0.5
  text-overflow: ellipsis
  overflow: hidden
.item
  padding: 8px 16px
  border-bottom: 0.5px solid #D3D4DC
  color: #090A15
  cursor: pointer
  &:hover
   background-color: rgba(215, 217, 255, 0.25)
  &:last-child
    border-bottom: none
.open-icon
  font-size: 10px
  display: flex
  &.open
    transform: rotate(180deg)
</style>
