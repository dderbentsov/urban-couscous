<template lang="pug">
  div.icon-wrap.flex.items-center.justify-center.cursor-pointer.py-1.px-2(
    :class="{disable: !isChecked}",
    @click="changeState"
  )
    .icon-doc-ok.text-xxl
</template>

<script>
export default {
  name: "CalendarColumnHeaderCheckbox",
  data() {
    return {
      isChecked: false,
    };
  },
  methods: {
    changeState() {
      this.isChecked = !this.isChecked;
      this.$emit("isChecked", this.isChecked);
    },
  },
};
</script>

<style lang="sass" scoped>
.disable
  opacity: 0.5
.icon-wrap
  height: 32px
  background-color: var(--btn-blue-color-1)
  color: var(--btn-blue-color)
  border-radius: 4px
  &:hover
    background-color: var(--btn-blue-color-2)
  &:active
    background-color: var(--font-dark-blue-color)
    color: var(--default-white)
.icon-doc-ok
  width: 24px
  height: 24px
</style>
