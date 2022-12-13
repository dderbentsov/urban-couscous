<template lang="pug">
  .base-select.flex.justify-between.items-center.py-9px.px-4.gap-4.cursor-pointer.relative(
    @click="open = !open",
    :class="{'open': open, 'border-none': borderNone}",
  )
    .placeholder.text-base.flex.items-center(
      :class="{'value-color': value.label || placeholderOpacity}"
    ) {{ value.label || placeholder }}
    .flex.items-center
      .select-form-separator.cursor-pointer.mr-4(v-if="separator")
      span.icon-down-arrow.open-icon.flex.text-xsm(:class="{'open': open }")
    base-options(
      v-if="open",
    )
      .items-container.mt-1(
        @click="closeOptions",
        v-click-outside="leaveSelect"
      )
        .item.py-2.px-4.cursor-pointer(
          v-for="item in items",
          :key="item.id"
          @click="clickItem(item.id, item.label)"
        ) {{ item.label }}
</template>

<script>
import BaseOptions from "@/components/base/BaseOptions.vue";
export default {
  name: "BaseCustomSelect",
  components: { BaseOptions },
  props: {
    placeholder: String,
    modelValue: Object,
    items: {
      type: Array,
      default: () => [],
    },
    borderNone: Boolean,
    separator: Boolean,
    placeholderOpacity: Boolean,
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
  },
  methods: {
    clickItem(id, label) {
      this.value = {
        id: id,
        label: label,
      };
    },
    leaveSelect() {
      this.open = false;
    },
    closeOptions(e) {
      e.stopPropagation();
      this.open = false;
    },
  },
};
</script>

<style scoped lang="sass">
.base-select
  width: 100%
  border: 1.5px solid #D3D4DC
  border-radius: 4px
  background-color: white
  user-select: none
  &.open
    border: 1.5px solid #4772F2
.items-container
  box-shadow: 1px 1px 8px rgba(37, 40, 80, 0.15)
  border-radius: 4px
  background-color: white
  max-height: 140px
  overflow-y: auto
.placeholder
  color: #090A15
  opacity: 0.5
  text-overflow: ellipsis
  overflow: hidden
.item
  border-bottom: 0.5px solid #D3D4DC
  color: #090A15
  &:hover
   background-color: rgba(215, 217, 255, 0.25)
  &:last-child
    border-bottom: none
.open-icon
  &.open
    transform: rotate(180deg)
.separator
  background-color: var(--btn-blue-color-3)
  height: 24px
  width: 1px
  border-radius: 1px
.border-none
  border: none
.value-color
  opacity: 1
.select-form-separator
  background-color: var(--btn-blue-color-3)
  height: 24px
  width: 1px
  border-radius: 1px
</style>
