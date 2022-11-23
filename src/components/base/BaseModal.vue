<template lang="pug">
  teleport(:to="appContainer", v-if="value")
    .base-overlay(:class="{'base-overlay-bg': !hideOverlay}", :style="styleOverlay")
      .base-content(v-click-outside="clickOutside", :style="styleContent")
        .base-header
          .header-title.text {{ title }}
          .icon-cancel.text-sm(@click="value = false", v-if="!showIcon")
        slot

</template>

<script>
export default {
  name: "BaseModal",
  props: {
    hideOverlay: Boolean,
    styleOverlay: Object,
    styleContent: Object,
    title: String,
    modelValue: Boolean,
    showIcon: Boolean,
  },
  emits: ["update:modelValue"],
  methods: {
    clickOutside() {
      this.value = false;
    },
  },
  computed: {
    appContainer() {
      return this.$.appContext.app._container;
    },
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
};
</script>

<style scoped lang="sass">
.base-overlay
  z-index: 10000
  position: absolute
  left: 0
  top: 0
  display: flex
  justify-content: center
  align-items: center

.base-overlay-bg
  background: rgba(37, 40, 80, 0.2)
  backdrop-filter: blur(4px)
  width: 100vw
  height: 100vh
.base-content
  padding: 32px 40px
  background-color: var(--default-white)
  box-shadow: 4px 4px 8px rgba(9, 10, 21, 0.1), -4px -4px 8px rgba(9, 10, 21, 0.1)
  border-radius: 4px

.header-title
  font-weight: 700
  font-size: 20px
  line-height: 23px
  color: var(--font-dark-blue-color)
.base-header
  display: flex
  justify-content: space-between
  gap: 16px
.icon-cancel
  margin-top: -11px
  margin-right: -11px
  cursor: pointer
  color: var(--font-grey-color)
</style>
