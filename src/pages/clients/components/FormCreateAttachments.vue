<template lang="pug">
  .wrapper.flex.flex-col.flex-auto.h-full.gap-y-8.justify-between
    .place.flex.flex-col.justify-center.items-center.py-3
      .upload.text-center.text-sm.flex.w-fit
        input.hidden(@change="(e) => addAttachment(e)" type="file" id="file-upload")
        span Загрузите элемент
          label.label.cursor-pointer(for="file-upload")  с компьютера
          span  или перетащите их сюда
</template>

<script>
export default {
  name: "FormCreateAttachments",
  props: {
    addAttachment: Function,
  },
};
</script>

<style lang="sass" scoped>
.wrapper-attachment
  width: 485px
  height: fit-content
  background-color: var(--default-white)
  border-radius: 8px 0 8px 8px
  box-shadow: var(--default-shadow)
.corner
  width: 8px
  height: 8px
  border-top-left-radius: 100%
  background-color: var(--default-white)
  z-index: 2
  overflow: hidden
.place
  width: 100%
  border: 2px dashed var(--font-grey-color)
  border-radius: 4px
  color: var(--font-grey-color)
.upload
  width: 240px
.name-doc
  border-radius: 4px
  background-color: var(--border-light-grey-color-1)
  width: fit-content
.label
  color: var(--btn-blue-color)
</style>
