<template lang="pug">
  input.checkbox.cursor-pointer(type="checkbox" :id="id" :checked="isCheck" @click.stop @change="(e) => check(e)")
</template>

<script>
export default {
  name: "ClientsTableCheckBox",
  props: {
    id: String,
    check: Function,
    isCheck: Boolean,
  },
};
</script>

<style lang="sass" scoped>
.checkbox
  border-color: var(--font-grey-color)
</style>
