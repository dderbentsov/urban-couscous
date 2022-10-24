<template lang="pug">
  .flex.absolute.flex-col.items-end.right-3.top-5
    .corner
    .wrap.flex.flex-col.p-4.gap-y-4
      .flex.flex-col.gap-y-2
        .place.flex.flex-col.justify-center.items-center.py-3
          .upload.text-center.text-sm.flex.w-fit
            input.hidden(@change="(e) => addNewDoc(e)" type="file" id="file-upload" multiple)
            span Загрузите элемент
              label.label.cursor-pointer(for="file-upload")  с компьютера
              span  или перетащите их сюда
        .flex.flex-col
          span.name-doc.py-2.px-3(v-for="doc in newDocs") {{doc.name}}
      base-create-button(text="Добавить" @click="saveDocs")
</template>

<script>
import BaseCreateButton from "@/components/base/buttons/BaseCreateButton";
export default {
  name: "TableAddingNewDoc",
  components: { BaseCreateButton },
  props: {
    addNewDoc: Function,
    saveDocs: Function,
    newDocs: Array,
  },
};
</script>

<style lang="sass" scoped>
.wrap
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
