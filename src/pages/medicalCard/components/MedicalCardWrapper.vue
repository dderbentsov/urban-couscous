<template lang="pug">
  .wrapper.flex.w-full.relative.mx-2
    .wrapper-medical.relative.flex.flex-col.px-6.py-6.h-full.w-full
</template>

<script>
export default { name: "MedicalCardWrapper" };
</script>

<style lang="sass" scoped>
.wrapper
  overflow: auto
  border-top-left-radius: 4px
.wrapper-medical
  background-color: var(--default-white)
  height: calc(100vh - 64px)
</style>
