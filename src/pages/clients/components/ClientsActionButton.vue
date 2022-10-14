<template lang="pug">
  .button.relative.w-8.h-8.flex.justify-center.items-center.cursor-pointer
    .prompt.absolute.w-fit.left-1.px-2.py-3.bottom-10.bg-amber-600
      span.text-sm {{prompt}}
    img(:src="img" :alt="prompt")
</template>

<script>
export default {
  name: "ClientsActionButton.vue",
  props: {
    img: String,
    prompt: String,
  },
};
</script>

<style lang="sass" scoped>
.button
  border-radius: 50%
  &:hover
    background-color: rgba(71, 114, 242, 0.15)
    .prompt
      visibility: visible
.prompt
  color: var(--font-dark-blue-color)
  backdrop-filter: blur(4px)
  background: rgba(37, 40, 80, 0.1)
  visibility: hidden
  z-index: 2
  border-radius: 4px
</style>
