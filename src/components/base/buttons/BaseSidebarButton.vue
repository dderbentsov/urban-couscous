<template lang="pug">
  a(:href="path")
    button.button.cursor-pointer.text-4xl.py-3.pr-4.pl-3(:id="id")
      slot
</template>

<script>
export default {
  name: "ButtonSidebar",
  props: {
    path: String,
    id: String,
    changeStyle: Function,
  },
  data() {
    return {
      selectedStyle: false,
    };
  },
};
</script>

<style lang="sass" scoped>
.button
  width: fit-content
  background-color: rgba(65, 105, 225, 0)
  border-radius: 0 4px 4px 0
  border-left-color: rgba(65, 105, 225, 0)
  border-left-width: 4px
  border-right: none
  border-top: none
  border-bottom: none
  border-left-style: solid
.button:focus
  background-color: rgba(65, 105, 225, 0.3)
  border-left-color: rgba(65, 105, 225, 1)
  color: var(--btn-blue-color)
.button:hover
  background-color: rgba(65, 105, 225, 0.3)
  border-left-color: rgba(65, 105, 225, 1)
  color: var(--btn-blue-color)
</style>
