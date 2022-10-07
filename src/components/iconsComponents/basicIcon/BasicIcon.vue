<template>
  <svg xmlns="http://www.w3.org/2000/svg"
       :width="width"
       :height="height"
       :viewBox="viewBox"
       :aria-labelledby="iconName"
       role="presentation"
  >
    <title
        :id="iconName"
        lang="en"
    >{{iconName}} icon</title>
    <g :fill="iconColor">
      <slot />
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    iconName: {
      type: String,
      default: 'box'
    },
    width: {
      type: [Number, String],
      default: 40
    },
    height: {
      type: [Number, String],
      default: 40
    },
    iconColor: {
      type: String,
      default: 'currentColor'
    },
  },
  computed: {
    viewBox() {
      return `0 0 ${this.width} ${this.height}`
    }
  }
}
</script>

<style scoped>
svg {
  display: inline-block;
  vertical-align: baseline;
}
</style>
